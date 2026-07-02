import Image from "next/image";

import { SectionHeader } from "@/components/ui/section-header";
import { Surface } from "@/components/ui/Surface";
import { ProfileGalleryItem } from "@/types/profile";

interface ProfileGalleryProps {
  images: ProfileGalleryItem[];
}

export function ProfileGallery({
  images,
}: ProfileGalleryProps) {
  const preview = images.slice(0, 6);
  const remaining = Math.max(images.length - 6, 0);

  return (
    <section className="space-y-4">
      <SectionHeader
        title="Foto"
        actionLabel="Vedi tutte"
      />

      <Surface className="p-6">
        {images.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Nessuna foto disponibile.
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {preview.map((image, index) => {
              const isLast =
                index === preview.length - 1 &&
                remaining > 0;

              return (
                <button
                  key={image.id}
                  type="button"
                  className="group relative aspect-square overflow-hidden rounded-lg"
                >
                  <Image
                    src={image.imageUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {isLast && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xl font-bold text-white">
                      +{remaining}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </Surface>
    </section>
  );
}