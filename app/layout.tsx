import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import ProcessingOverlay from "@/components/ProcessingOverlay/ProcessingOverlay";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import LegalConsentGate from "@/components/Auth/LegalConsentGate";
import PreferencesOnboarding from "@/components/Auth/PreferencesOnboarding";

import { AuthProvider } from "@/contexts/AuthContext";
import BottomAppNav from "@/components/Navigation/BottomAppNav";
import { MapProvider } from "@/contexts/MapContext";
import { ProcessingOverlayProvider } from "@/contexts/ProcessingOverlayContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  "https://www.commety.it";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  verification: {
    google: "NW93TABpolzyjT84jxThajBWxlbv-YdSgKAFBOzIXkw",
  },

  title: {
    default: "Commety | La mappa del mondo reale",
    template: "%s | Commety",
  },

  description:
    "Scopri cosa sta succedendo vicino a te con le segnalazioni in tempo reale della community Commety.",

  openGraph: {
    title: "Commety | La mappa del mondo reale",
    description:
      "Scopri cosa sta succedendo vicino a te con le segnalazioni in tempo reale della community Commety.",
    url: appUrl,
    siteName: "Commety",
    locale: "it_IT",
    type: "website",

    images: [
      {
        url: `${appUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Commety",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Commety | La mappa del mondo reale",
    description:
      "Scopri cosa sta succedendo vicino a te con le segnalazioni in tempo reale della community Commety.",
    images: [`${appUrl}/opengraph-image`],
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

              <BottomAppNav />

              <GoogleAnalytics />

              <ProcessingOverlay />
              <LegalConsentGate />
              <PreferencesOnboarding />
            </ProcessingOverlayProvider>
          </MapProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
