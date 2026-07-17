import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { CursorFollower } from "@/components/cursor-follower";
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
  title: "Abhinav | AI & Backend Engineer",
  description:
    "AI & Backend engineer specializing in Python, FastAPI, LLM orchestration, production RAG pipelines, and distributed systems.",
  keywords: [
    "AI Engineer",
    "Backend Engineer",
    "Python",
    "FastAPI",
    "LangChain",
    "LangGraph",
    "LLM Orchestration",
    "RAG Systems",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Abhinav" }],
  openGraph: {
    title: "Abhinav | AI & Backend Engineer",
    description:
      "AI & Backend engineer specializing in Python, FastAPI, distributed systems, and production RAG pipelines.",
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
        <ChatWidget />
        <CursorFollower />
      </body>
    </html>
  );
}
