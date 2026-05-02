import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhinav | Backend Engineer",
  description:
    "Backend engineer specializing in Python, FastAPI, and distributed systems. Building robust, scalable backend systems that power real products.",
  keywords: [
    "Backend Engineer",
    "Python",
    "FastAPI",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Abhinav" }],
  openGraph: {
    title: "Abhinav | Backend Engineer",
    description:
      "Backend engineer specializing in Python, FastAPI, and distributed systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
