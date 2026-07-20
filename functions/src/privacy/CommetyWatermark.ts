import { join } from "path";

import sharp from "sharp";

const WATERMARK_PATH = join(__dirname, "../assets/commety-watermark.png");

/** Applica il logo ufficiale soltanto alla copia destinata alla pubblicazione. */
export class CommetyWatermark {
  async apply(source: Buffer): Promise<Buffer> {
    const metadata = await sharp(source).metadata();
    const width = metadata.width;

    if (!width) {
      throw new Error("Impossibile determinare la dimensione del media per il watermark.");
    }

    const resizedLogo = await sharp(WATERMARK_PATH)
      .resize({
        width: Math.min(Math.max(128, Math.round(width * 0.24)), 360),
        withoutEnlargement: true,
      })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    for (let index = 3; index < resizedLogo.data.length; index += 4) {
      resizedLogo.data[index] = Math.round(resizedLogo.data[index] * 0.82);
    }

    const watermark = await sharp(resizedLogo.data, {
      raw: {
        width: resizedLogo.info.width,
        height: resizedLogo.info.height,
        channels: 4,
      },
    }).png().toBuffer();

    return sharp(source)
      .composite([{
        input: watermark,
        gravity: "southeast",
      }])
      .jpeg({ quality: 92, mozjpeg: true })
      .toBuffer();
  }
}
