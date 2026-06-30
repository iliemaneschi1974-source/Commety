import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { MapProvider } from "@/contexts/MapContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Commety",
  description: "Community Map",
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
            {children}
          </MapProvider>
        </AuthProvider>
      </body>
    </html>
  );
}