import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "@/lib/firebase";
import { ReportImageReference } from "@/types/report";

/**
 * Carica una singola immagine nello Storage.
 */
export async function uploadImage(
  file: File,
  reportId: string
): Promise<ReportImageReference> {

  const filename =
    `${crypto.randomUUID()}.jpg`;

  const storagePath =
    `reports/${reportId}/${filename}`;

  const storageRef = ref(
    storage,
    storagePath
  );

  await uploadBytes(storageRef, file);

  const url =
    await getDownloadURL(storageRef);

  return {
    storagePath,
    url,
  };

}

/**
 * Elimina una foto dallo Storage.
 */
export async function deleteImage(
  image: ReportImageReference
): Promise<void> {

  const imageRef = ref(
    storage,
    image.storagePath
  );

  await deleteObject(imageRef);

}

/**
 * Carica più immagini.
 */
export async function uploadImages(
  files: File[],
  reportId: string
): Promise<ReportImageReference[]> {

  return Promise.all(
    files.map((file) =>
      uploadImage(file, reportId)
    )
  );

}

/**
 * Elimina più immagini.
 *
 * Se l'elenco è vuoto termina immediatamente.
 */
export async function deleteImages(
  images: ReportImageReference[]
): Promise<void> {

  if (images.length === 0) {
    return;
  }

  await Promise.all(
    images.map((image) =>
      deleteImage(image)
    )
  );

}

export async function uploadVideo(
  file: File,
  reportId: string
) {
  const storagePath = `reports/${reportId}/${crypto.randomUUID()}.webm`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file, {
    contentType: file.type || "video/webm",
  });

  return {
    storagePath,
    url: await getDownloadURL(storageRef),
  };
}
