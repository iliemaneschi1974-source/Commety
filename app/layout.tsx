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

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://commety.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),

  title: "Commety",

  description: "Scopri cosa sta succedendo vicino a te.",

  openGraph: {
    title: "Commety",
    description: "Scopri cosa sta succedendo vicino a te.",
    url: appUrl,
    siteName: "Commety",
    locale: "it_IT",
    type: "website",

    images: [
   {
    url: `${appUrl}/og-image-square.png`,
    width: 400,
    height: 400,
    alt: "Commety",
  },
],
  },

  twitter: {
    card: "summary_large_image",
    title: "Commety",
    description: "Scopri cosa sta succedendo vicino a te.",
    images: [`${appUrl}/og-image-square.png`],
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