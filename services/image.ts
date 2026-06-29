/**
 * Ridimensiona e comprime un'immagine.
 *
 * - lato massimo: 1600px
 * - qualità JPEG: 80%
 */
export function compressImage(
  file: File,
  maxSize = 1600,
  quality = 0.8
): Promise<File> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        }
      } else {
        if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }

      const canvas = document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Canvas non disponibile."));
        return;
      }

      context.drawImage(
        image,
        0,
        0,
        width,
        height
      );

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              new Error("Compressione fallita.")
            );
            return;
          }

          resolve(
            new File(
              [blob],
              file.name.replace(
                /\.[^.]+$/,
                ".jpg"
              ),
              {
                type: "image/jpeg",
              }
            )
          );
        },
        "image/jpeg",
        quality
      );
    };

    image.onerror = () =>
      reject(new Error("Immagine non valida."));

    image.src = URL.createObjectURL(file);
  });
}