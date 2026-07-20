import { randomUUID } from "crypto";

import { ReportImageReference } from "../ai/dto/ReportImageReference";
import { adminStorage } from "../config/firebaseAdmin";

export class SanitizedMediaStorage {
  async saveImage(reportId: string, bytes: Buffer): Promise<ReportImageReference> {
    return this.save(reportId, `${randomUUID()}.jpg`, bytes, "image/jpeg");
  }

  async saveVideo(reportId: string, bytes: Buffer): Promise<ReportImageReference> {
    return this.save(reportId, `${randomUUID()}.mp4`, bytes, "video/mp4");
  }

  async delete(storagePath: string): Promise<void> {
    await adminStorage.bucket().file(storagePath).delete({ ignoreNotFound: true });
  }

  private async save(
    reportId: string,
    filename: string,
    bytes: Buffer,
    contentType: string
  ): Promise<ReportImageReference> {
    const storagePath = `reports/${reportId}/sanitized/${filename}`;
    const token = randomUUID();
    const bucket = adminStorage.bucket();
    const file = bucket.file(storagePath);

    await file.save(bytes, {
      resumable: false,
      metadata: {
        contentType,
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });

    return {
      storagePath,
      url: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(storagePath)}?alt=media&token=${token}`,
    };
  }
}
