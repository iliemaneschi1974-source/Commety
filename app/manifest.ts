import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Commety",
    short_name: "Commety",
    description:
      "La mappa delle segnalazioni in tempo reale della community.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0F2D5F",
    icons: [
      {
        src: "/og-image-square.png",
        sizes: "400x400",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
