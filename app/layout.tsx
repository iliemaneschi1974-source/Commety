import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import ProcessingOverlay from "@/components/ProcessingOverlay/ProcessingOverlay";

import { AuthProvider } from "@/contexts/AuthContext";
import { MapProvider } from "@/contexts/MapContext";
import { ProcessingOverlayProvider } from "@/contexts/ProcessingOverlayContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(
  process.env.NEXT_PUBLIC_APP_URL ??
    "https://commety.vercel.app"
),

  title: "Commety",

  description: "Scopri cosa sta succedendo vicino a te.",

  openGraph: {
    title: "Commety",
    description: "Scopri cosa sta succedendo vicino a te.",
    url: "https://commety.it",
    siteName: "Commety",
    locale: "it_IT",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Commety",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Commety",
    description: "Scopri cosa sta succedendo vicino a te.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} h-full`}
    >
      <body className="min-h-full font-sans antialiased">
        <AuthProvider>
          <MapProvider>
            <ProcessingOverlayProvider>

              {children}

              <ProcessingOverlay />

            </ProcessingOverlayProvider>
          </MapProvider>
        </AuthProvider>
      </body>
    </html>
  );
}