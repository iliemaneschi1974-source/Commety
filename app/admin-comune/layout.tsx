import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commety per i Comuni",
  description:
    "Ambiente amministrativo dimostrativo di Commety per i Comuni.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminComuneLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
