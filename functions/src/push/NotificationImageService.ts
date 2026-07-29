import { randomUUID } from "node:crypto";

import sharp from "sharp";

import { adminStorage } from "../config/firebaseAdmin";

type ReportImage = {
  storagePath?: unknown;
};

const PREVIEW_WIDTH = 1200;
const PREVIEW_HEIGHT = 600;

function downloadUrl(bucketName: string, path: string, token: string): string {
  return (
    `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/` +
    `${encodeURIComponent(path)}?alt=media&token=${token}`
  );
}

export async function notificationImageFor(
  reportId: string,
  image: ReportImage
): Promise<{ url: string; bytes: number } | undefined> {
  const sourcePath = image.storagePath;
  if (
    typeof sourcePath !== "string" ||
    !sourcePath.startsWith(`reports/${reportId}/`)
  ) {
    return undefined;
  }

  const bucket = adminStorage.bucket();
  const previewPath = `reports/${reportId}/notification-preview.jpg`;
  const previewFile = bucket.file(previewPath);
  const [previewExists] = await previewFile.exists();
  if (previewExists) {
    const [metadata] = await previewFile.getMetadata();
    const storedToken = metadata.metadata?.firebaseStorageDownloadTokens;
    const token = typeof storedToken === "string"
      ? storedToken.split(",")[0]
      : undefined;
    if (token) {
      return {
        url: downloadUrl(bucket.name, previewPath, token),
        bytes: Number(metadata.size ?? 0),
      };
    }
  }

  const [source] = await bucket.file(sourcePath).download();
  const preview = await sharp(source)
    .rotate()
    .resize(PREVIEW_WIDTH, PREVIEW_HEIGHT, {
      fit: "cover",
      position: "centre",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 76,
      progressive: true,
      mozjpeg: true,
    })
    .toBuffer();

  const token = randomUUID();
  await previewFile.save(preview, {
    resumable: false,
    metadata: {
      contentType: "image/jpeg",
      cacheControl: "public, max-age=86400",
      metadata: {
        firebaseStorageDownloadTokens: token,
      },
    },
  });

  return {
    url: downloadUrl(bucket.name, previewPath, token),
    bytes: preview.byteLength,
  };
}
