import type { Metadata } from "next";
import { Poppins, Mulish } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CSDS Welcome & Farewell Night 2026 | Peshawar",
  description:
    "Official Welcome Party for Batch 2026 & Farewell Night for the Graduating Batch of Computer Science & Data Science Department, Peshawar.",
  keywords: [
    "CSDS",
    "Peshawar",
    "Welcome Party",
    "Farewell Night",
    "Computer Science",
    "Data Science",
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
      suppressHydrationWarning
      className={`${poppins.variable} ${mulish.variable} scroll-smooth dark`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#070707] text-[#EDEDED] font-body antialiased selection:bg-[#B4F23D] selection:text-black"
      >
        {children}
      </body>
    </html>
  );
}
