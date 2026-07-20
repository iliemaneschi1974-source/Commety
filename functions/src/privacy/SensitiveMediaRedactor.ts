import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { spawn } from "child_process";

import { ImageAnnotatorClient } from "@google-cloud/vision";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";

export interface RedactionBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface RedactedImage {
  bytes: Buffer;
  boxes: RedactionBox[];
}

interface TimedBox extends RedactionBox {
  from: number;
  to: number;
}

const PADDING_RATIO = 0.22;
const MAX_BOXES_PER_IMAGE = 36;

/**
 * Rileva visi e testo leggibile (incluse le targhe) e restituisce una copia
 * già sfocata. Il testo viene oscurato in modo prudenziale: è preferibile
 * nascondere una scritta non necessaria piuttosto che pubblicare una targa.
 */
export class SensitiveMediaRedactor {
  private readonly vision = new ImageAnnotatorClient();

  async redactImage(source: Buffer): Promise<RedactedImage> {
    const normalized = await sharp(source)
      .rotate()
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer();

    const metadata = await sharp(normalized).metadata();
    const width = metadata.width;
    const height = metadata.height;

    if (!width || !height) {
      throw new Error("Impossibile leggere le dimensioni dell'immagine.");
    }

    const boxes = await this.detectSensitiveRegions(normalized, width, height);

    if (boxes.length === 0) {
      return { bytes: normalized, boxes };
    }

    const overlays = await Promise.all(
      boxes.map(async (box) => ({
        input: await sharp(normalized)
          .extract({
            left: box.left,
            top: box.top,
            width: box.width,
            height: box.height,
          })
          .blur(28)
          .jpeg({ quality: 92, mozjpeg: true })
          .toBuffer(),
        left: box.left,
        top: box.top,
      }))
    );

    return {
      bytes: await sharp(normalized)
        .composite(overlays)
        .jpeg({ quality: 92, mozjpeg: true })
        .toBuffer(),
      boxes,
    };
  }

  async redactVideo(
    videoBytes: Buffer,
    moderationFrames: readonly Buffer[]
  ): Promise<{ bytes: Buffer; frameBoxes: RedactionBox[][]; redactedFrames: RedactedImage[] }> {
    if (moderationFrames.length !== 3) {
      throw new Error("Il video non contiene tutti i fotogrammi di sicurezza.");
    }

    const redactedFrames = await Promise.all(
      moderationFrames.map((frame) => this.redactImage(frame))
    );

    const timedBoxes: TimedBox[] = redactedFrames.flatMap((frame, index) => {
      const windows = [
        { from: 0, to: 1.5 },
        { from: 1.5, to: 3.5 },
        { from: 3.5, to: 5 },
      ];

      return frame.boxes.map((box) => ({ ...box, ...windows[index] }));
    });

    if (timedBoxes.length === 0) {
      return {
        bytes: videoBytes,
        frameBoxes: redactedFrames.map((frame) => frame.boxes),
        redactedFrames,
      };
    }

    if (!ffmpegPath) {
      throw new Error("Il motore di elaborazione video non è disponibile.");
    }

    const directory = await fs.mkdtemp(join(tmpdir(), "commety-redaction-"));
    const inputPath = join(directory, "source.webm");
    const outputPath = join(directory, "redacted.mp4");

    try {
      await fs.writeFile(inputPath, videoBytes);
      await runFfmpeg(inputPath, outputPath, timedBoxes);

      return {
        bytes: await fs.readFile(outputPath),
        frameBoxes: redactedFrames.map((frame) => frame.boxes),
        redactedFrames,
      };
    } finally {
      await fs.rm(directory, { recursive: true, force: true });
    }
  }

  private async detectSensitiveRegions(
    bytes: Buffer,
    imageWidth: number,
    imageHeight: number
  ): Promise<RedactionBox[]> {
    const [result] = await this.vision.annotateImage({
      image: { content: bytes },
      features: [
        { type: "FACE_DETECTION" },
        { type: "TEXT_DETECTION" },
      ],
    });

    const faceBoxes = (result.faceAnnotations ?? [])
      .map((face) => toBox(face.boundingPoly?.vertices, imageWidth, imageHeight));

    // Il primo elemento contiene l'intero testo rilevato: usiamo le singole
    // parole, così la sfocatura rimane localizzata anche sulle targhe.
    const textBoxes = (result.textAnnotations ?? [])
      .slice(1)
      .map((text) => toBox(text.boundingPoly?.vertices, imageWidth, imageHeight));

    return mergeBoxes(
      [...faceBoxes, ...textBoxes].filter((box): box is RedactionBox => Boolean(box))
    ).slice(0, MAX_BOXES_PER_IMAGE);
  }
}

function toBox(
  vertices: Array<{ x?: number | null; y?: number | null }> | null | undefined,
  imageWidth: number,
  imageHeight: number
): RedactionBox | null {
  if (!vertices || vertices.length === 0) return null;

  const xs = vertices.map((vertex) => vertex.x ?? 0);
  const ys = vertices.map((vertex) => vertex.y ?? 0);
  const rawLeft = Math.min(...xs);
  const rawTop = Math.min(...ys);
  const rawRight = Math.max(...xs);
  const rawBottom = Math.max(...ys);

  if (rawRight <= rawLeft || rawBottom <= rawTop) return null;

  const padding = Math.max(10, Math.round(Math.max(rawRight - rawLeft, rawBottom - rawTop) * PADDING_RATIO));
  const left = Math.max(0, rawLeft - padding);
  const top = Math.max(0, rawTop - padding);
  const right = Math.min(imageWidth, rawRight + padding);
  const bottom = Math.min(imageHeight, rawBottom + padding);

  return {
    left: Math.round(left),
    top: Math.round(top),
    width: Math.max(1, Math.round(right - left)),
    height: Math.max(1, Math.round(bottom - top)),
  };
}

function mergeBoxes(boxes: RedactionBox[]): RedactionBox[] {
  return boxes.reduce<RedactionBox[]>((merged, candidate) => {
    const overlaps = merged.findIndex((box) => intersects(box, candidate));
    if (overlaps === -1) {
      merged.push(candidate);
      return merged;
    }

    const current = merged[overlaps];
    const left = Math.min(current.left, candidate.left);
    const top = Math.min(current.top, candidate.top);
    const right = Math.max(current.left + current.width, candidate.left + candidate.width);
    const bottom = Math.max(current.top + current.height, candidate.top + candidate.height);
    merged[overlaps] = { left, top, width: right - left, height: bottom - top };
    return merged;
  }, []);
}

function intersects(first: RedactionBox, second: RedactionBox): boolean {
  return first.left < second.left + second.width &&
    first.left + first.width > second.left &&
    first.top < second.top + second.height &&
    first.top + first.height > second.top;
}

function runFfmpeg(inputPath: string, outputPath: string, boxes: TimedBox[]): Promise<void> {
  const filters = boxes.map((box) => {
    const from = box.from.toFixed(2);
    const to = box.to.toFixed(2);
    return `delogo=x=${box.left}:y=${box.top}:w=${box.width}:h=${box.height}:band=12:show=0:enable='between(t\\,${from}\\,${to})'`;
  }).join(",");

  return new Promise((resolve, reject) => {
    const process = spawn(ffmpegPath as string, [
      "-y",
      "-i", inputPath,
      "-vf", filters,
      "-map", "0:v:0",
      "-map", "0:a?",
      "-c:v", "libx264",
      "-pix_fmt", "yuv420p",
      "-movflags", "+faststart",
      "-c:a", "aac",
      outputPath,
    ]);
    let errorOutput = "";

    process.stderr.on("data", (chunk: Buffer) => {
      errorOutput += chunk.toString();
    });
    process.on("error", reject);
    process.on("close", (code) => {
      if (code === 0) return resolve();
      reject(new Error(`Elaborazione video non riuscita: ${errorOutput.slice(-800)}`));
    });
  });
}

export function createDownloadToken(): string {
  return randomUUID();
}
