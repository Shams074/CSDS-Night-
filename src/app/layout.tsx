import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const serifFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const posterFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-poster",
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CSDS Welcome Party & Farewell Night 2026 | Peshawar",
  description:
    "Official Welcome Party for Batch 2026 & Farewell Night for the Graduating Batch of Computer Science & Data Science Department, Peshawar.",
  keywords: [
    "CSDS",
    "Peshawar",
    "Welcome Party",
    "Farewell Night",
    "Computer Science",
    "Data Science",
    "UOP",
    "Registration",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${posterFont.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#F1F0DC] text-[#111111] font-sans antialiased selection:bg-[#D94A3F] selection:text-white">
        {children}
      </body>
    </html>
  );
}
