import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Entropy Soluciones",
  // TODO(owner): confirm tagline / SEO description with client.
  description: "Entropy Soluciones — desarrollo de software, marca, IA y CRM.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={sora.variable}>
      <body className="bg-bg text-fg font-sans antialiased">{children}</body>
    </html>
  );
}
