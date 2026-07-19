"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Play } from "lucide-react";

interface VideoRecorderProps {
  onChange: (video: File | null, moderationFrames: File[]) => void;
}

const MAX_SECONDS = 5;
const MODERATION_FRAME_TIMES = [0.5, 2.5, 4.5];

export default function VideoRecorder({ onChange }: VideoRecorderProps) {
  const previewRef = useRef<HTMLVideoElement>(null);
  const playbackRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(MAX_SECONDS);
  const [error, setError] = useState<string | null>(null);
  const [preparing, setPreparing] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => () => {
    if (posterUrl) URL.revokeObjectURL(posterUrl);
  }, [posterUrl]);

  async function startRecording() {
    setError(null);
    onChange(null, []);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (previewRef.current) previewRef.current.srcObject = stream;

      const chunks: BlobPart[] = [];
      const mimeType = getSupportedVideoMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      let recordedMimeType = recorder.mimeType || mimeType || "video/webm";
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          if (event.data.type) recordedMimeType = event.data.type;
        }
      };
      recorder.onstop = async () => {
        const livePoster = await captureLivePoster(previewRef.current);
        if (previewRef.current) previewRef.current.srcObject = null;
        stream.getTracks().forEach((track) => track.stop());
        setRecording(false);
        setSecondsLeft(MAX_SECONDS);
        try {
          const extension = recordedMimeType.includes("mp4") ? "mp4" : "webm";
          const video = new File(
            [new Blob(chunks, { type: recordedMimeType })],
            `commety-${Date.now()}.${extension}`,
            { type: recordedMimeType }
          );
          setPreviewUrl(URL.createObjectURL(video));
          if (livePoster) setPosterUrl(livePoster);
          setPreparing(true);
          const frames = await createModerationFrames(video);
          onChange(video, frames);
        } catch {
          setError("Non e' stato possibile preparare il video per il controllo di sicurezza.");
          onChange(null, []);
        } finally {
          setPreparing(false);
        }
      };
      // Blocchi periodici: alcuni browser finalizzano male il file se il
      // primo dato viene richiesto soltanto al termine della registrazione.
      recorder.start(250);
      setRecording(true);
      setSecondsLeft(MAX_SECONDS);
      const timer = window.setInterval(() => {
        setSecondsLeft((value) => {
          if (value <= 1) {
            window.clearInterval(timer);
            recorder.stop();
            return 0;
          }
          return value - 1;
        });
      }, 1000);
    } catch {
      setError("Impossibile aprire la fotocamera. Verifica i permessi del browser.");
    }
  }

  function removeVideo() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (posterUrl) URL.revokeObjectURL(posterUrl);
    setPreviewUrl(null);
    setPosterUrl(null);
    setPreparing(false);
    setPlaying(false);
    onChange(null, []);
  }

  async function playPreview() {
    const player = playbackRef.current;
    if (!player) return;
    try {
      player.currentTime = 0;
      await player.play();
    } catch {
      setError("Impossibile riprodurre il video su questo dispositivo.");
    }
  }

  return (
    <div className="mb-6">
      <label className="mb-3 block text-sm font-medium text-white/90">Video live &middot; massimo 5 secondi</label>
      {previewUrl ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/25 bg-black">
          <video key="recorded-preview" ref={playbackRef} controls muted playsInline preload="metadata" poster={posterUrl ?? undefined} src={previewUrl} onPlay={() => setPlaying(true)} onEnded={() => setPlaying(false)} onPause={() => setPlaying(false)} className="max-h-64 w-full" />
          <Watermark />
          {preparing ? <div className="absolute inset-0 flex items-center justify-center bg-[#061735]/60 p-5 text-center text-sm font-bold text-white">Preparazione dell&apos;anteprima e controllo di sicurezza...</div> : null}
          {!preparing && !playing ? <button type="button" onClick={playPreview} aria-label="Riproduci anteprima video" className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/60 bg-[#0F2D5F]/90 text-white shadow-[0_8px_22px_rgba(0,0,0,0.45)] transition hover:scale-105 hover:bg-[#17467f]"><Play className="ml-1 size-7 fill-current" /></button> : null}
          <button type="button" onClick={removeVideo} className="absolute right-3 top-3 rounded-full bg-red-600 px-3 py-1.5 text-sm font-bold text-white">Rimuovi</button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-dashed border-white/40 bg-black/25">
          <video key="live-camera" ref={previewRef} autoPlay muted playsInline className="max-h-64 w-full" />
          <div className="p-3 text-center">
            <button type="button" onClick={startRecording} disabled={recording} className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white disabled:opacity-60">
              {recording ? `Registrazione: ${secondsLeft}s` : "Registra dalla fotocamera"}
            </button>
            <p className="mt-2 text-xs text-white/65">Nessun audio, nessuna galleria. Il video viene controllato in pi&ugrave; momenti prima della pubblicazione.</p>
          </div>
        </div>
      )}
      {error ? <p className="mt-3 text-center text-sm text-red-200">{error}</p> : null}
    </div>
  );
}

function Watermark() {
  return <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-lg border border-white/30 bg-[#061735]/80 px-2 py-1 text-xs font-black text-white"><span className="relative inline-flex size-4 items-center justify-center"><MapPin className="size-4 fill-white text-white" /><span className="absolute -mt-px text-[8px] font-black text-[#0F2D5F]">C</span></span>Commety</span>;
}

function getSupportedVideoMimeType(): string | undefined {
  return [
    "video/webm;codecs=vp8",
    "video/webm",
    "video/mp4;codecs=avc1.42E01E",
    "video/mp4",
  ].find((candidate) =>
    MediaRecorder.isTypeSupported(candidate) &&
    document.createElement("video").canPlayType(candidate) !== ""
  );
}

async function captureLivePoster(video: HTMLVideoElement | null): Promise<string | null> {
  if (!video || video.videoWidth === 0 || video.videoHeight === 0) return null;
  const scale = Math.min(1, 960 / Math.max(video.videoWidth, video.videoHeight));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  return blob ? URL.createObjectURL(blob) : null;
}

async function createModerationFrames(videoFile: File): Promise<File[]> {
  const url = URL.createObjectURL(videoFile);
  const video = document.createElement("video");
  video.src = url;
  video.muted = true;
  video.playsInline = true;
  try {
    await waitFor(video, "loadedmetadata");
    const duration = Number.isFinite(video.duration) ? video.duration : MAX_SECONDS;
    const frameTimes = MODERATION_FRAME_TIMES.map((time) => Math.min(time, Math.max(0, duration - 0.1)));
    const frames: File[] = [];
    for (const [index, time] of frameTimes.entries()) frames.push(await createFrame(video, time, index));
    return frames;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function createFrame(video: HTMLVideoElement, time: number, index: number): Promise<File> {
  video.currentTime = time;
  await waitFor(video, "seeked");
  const scale = Math.min(1, 960 / Math.max(video.videoWidth, video.videoHeight, 1));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(video.videoWidth * scale));
  canvas.height = Math.max(1, Math.round(video.videoHeight * scale));
  canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
  if (!blob) throw new Error("Frame non disponibile");
  return new File([blob], `video-moderation-${index + 1}.jpg`, { type: "image/jpeg" });
}

function waitFor(target: HTMLVideoElement, eventName: "loadedmetadata" | "seeked"): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Timeout video")), 5000);
    target.addEventListener(eventName, () => { window.clearTimeout(timeout); resolve(); }, { once: true });
    target.addEventListener("error", () => { window.clearTimeout(timeout); reject(new Error("Errore video")); }, { once: true });
  });
}
