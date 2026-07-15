import { File } from "@google-cloud/storage";

import { ReportImageReference } from "../ai/dto/ReportImageReference";
import { adminStorage } from "../config/firebaseAdmin";
import { ImageContent } from "./ImageContent";

/**
 * Responsabile del recupero delle immagini
 * archiviate su Firebase Storage.
 *
 * Restituisce esclusivamente il contenuto
 * binario dell'immagine senza effettuare
 * alcuna trasformazione.
 */
export class StorageImageDownloader {

  /**
   * Recupera tutte le immagini della segnalazione.
   */
  async download(
    images: readonly ReportImageReference[]
  ): Promise<ImageContent[]> {

    const bucket = adminStorage.bucket();

    return Promise.all(
      images.map(async (image) => {

        const file: File =
          bucket.file(image.storagePath);

        const [buffer] =
          await file.download();

        const [metadata] =
          await file.getMetadata();

        return {
          mimeType:
            metadata.contentType ??
            "application/octet-stream",

          bytes: buffer,
        };

      })
    );

  }

}