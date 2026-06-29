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
  const extension =
    file.name.split(".").pop() || "jpg";

  const filename =
    `${Date.now()}.${extension}`;

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
) {
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
  const uploads = files.map((file) =>
    uploadImage(file, reportId)
  );

  return Promise.all(uploads);
}