import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const roboto = Roboto({
  variable: "--font-sans-app",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "MANOSH - Mongolia Occupational Safety & Health Association",
  description: "Mongolia's national authority for occupational safety and health, featuring ISO 45001 standards, expert training, and AI-powered safety guidance.",
  icons: {
    icon: "/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
