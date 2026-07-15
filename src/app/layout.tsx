import type { Metadata } from "next";
import "./globals.css";

const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || "Lippu Go";

export const metadata: Metadata = {
  title: brandName,
  description: "Shortlinks oficiales de Lippu para eventos y boletos.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://go.lippu.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
