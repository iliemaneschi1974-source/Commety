import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { storage } from "@/lib/firebase";

/**
 * Carica una singola immagine nello Storage.
 */
export async function uploadImage(
  file: File,
  reportId: string
): Promise<string> {
  const filename =
    `${crypto.randomUUID()}.jpg`;

  const storageRef = ref(
    storage,
    `reports/${reportId}/${filename}`
  );

  await uploadBytes(storageRef, file);

  return getDownloadURL(storageRef);
}

/**
 * Elimina una foto dallo Storage.
 */
export async function deleteImage(
  imageUrl: string
): Promise<void> {
  const imageRef = ref(storage, imageUrl);

  await deleteObject(imageRef);
}

/**
 * Carica più immagini.
 */
export async function uploadImages(
  files: File[],
  reportId: string
): Promise<string[]> {
  return Promise.all(
    files.map((file) =>
      uploadImage(file, reportId)
    )
  );
}

/**
 * Elimina più immagini dallo Storage.
 *
 * Se l'elenco è vuoto termina immediatamente.
 */
export async function deleteImages(
  imageUrls: string[]
): Promise<void> {
  if (imageUrls.length === 0) {
    return;
  }

  await Promise.all(
    imageUrls.map((imageUrl) =>
      deleteImage(imageUrl)
    )
  );
}