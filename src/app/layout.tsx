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
  title: "CSDS Welcome & Farewell Night 2026 | Computer Cell UET Peshawar",
  description:
    "Official Welcome Party & Farewell Night organized by Computer Cell (CC), U.E.T. Peshawar for Computer Science & Data Science Department.",
  keywords: [
    "CSDS",
    "Computer Cell",
    "UET Peshawar",
    "Welcome Party",
    "Farewell Night",
    "Computer Science",
    "Data Science",
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
      className={`${poppins.variable} ${mulish.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8FAFC] text-[#0B253A] font-body antialiased selection:bg-[#D4A03D] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
