"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Loader2, MessageSquare, Maximize2, Minimize2, Terminal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechCorners } from "@/components/tech-corners";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function formatMessage(content: string) {
  let formatted = content.replace(/\s+(\d+\.\s+)/g, "\n$1");
  formatted = formatted.replace(/\s+([•\-\*]\s+)/g, "\n$1");

  const lines = formatted.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: { type: "ol" | "ul"; items: React.ReactNode[] } | null = null;

  const flushList = (key: number) => {
    if (currentList) {
      if (currentList.type === "ol") {
        elements.push(
          <ol key={`list-${key}`} className="list-decimal pl-5 my-1.5 space-y-1 text-zinc-300">
            {currentList.items}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-5 my-1.5 space-y-1 text-zinc-300">
            {currentList.items}
          </ul>
        );
      }
      currentList = null;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (numMatch) {
      if (currentList && currentList.type !== "ol") {
        flushList(index);
      }
      if (!currentList) {
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push(
        <li key={`item-${index}`} className="leading-relaxed">
          {numMatch[2]}
        </li>
      );
      return;
    }

    const bulletMatch = trimmed.match(/^([\-\*•])\s+(.*)$/);
    if (bulletMatch) {
      if (currentList && currentList.type !== "ul") {
        flushList(index);
      }
      if (!currentList) {
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(
        <li key={`item-${index}`} className="leading-relaxed">
          {bulletMatch[2]}
        </li>
      );
      return;
    }

    flushList(index);
    elements.push(
      <p key={`p-${index}`} className="my-1.5 first:mt-0 last:mb-0 leading-relaxed">
        {trimmed}
      </p>
    );
  });

  flushList(lines.length);
  return elements;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "ONLINE. I am Abhinav's RAG AI Assistant. Ask me about his Python microservices, LLM orchestration, production RAG pipelines, or engineering experience." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/chat/";
    const baseUrl = apiUrl.split("/api")[0];
    fetch(`${baseUrl}/health`).catch((err) => console.log("Backend health check failed:", err));

    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleOpen = () => setIsOpen(true);

    window.addEventListener("toggle-chat", handleToggle);
    window.addEventListener("open-chat", handleOpen);

    // Auto-open chatbot with a 1.5s delay
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    return () => {
      clearTimeout(openTimer);
      window.removeEventListener("toggle-chat", handleToggle);
      window.removeEventListener("open-chat", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput("");
    setIsLoading(true);

    const chatHistory = messages.slice(-5);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/chat/";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: textToSend,
          history: chatHistory,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body to read stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      
      const assistantMessage: Message = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMessage]);

      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          try {
            const jsonStr = trimmed.slice(6);
            const event = JSON.parse(jsonStr);

            if (event.type === "content" && event.delta) {
              accumulatedContent += event.delta;
              setMessages((prev) => {
                const newMessages = [...prev];
                if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === "assistant") {
                  newMessages[newMessages.length - 1] = {
                    ...newMessages[newMessages.length - 1],
                    content: accumulatedContent,
                  };
                }
                return newMessages;
              });
            }
          } catch (e) {
            console.error("Error parsing stream chunk:", e, trimmed);
          }
        }
      }

      if (buffer.trim().startsWith("data: ")) {
        try {
          const jsonStr = buffer.trim().slice(6);
          const event = JSON.parse(jsonStr);
          if (event.type === "content" && event.delta) {
            accumulatedContent += event.delta;
            setMessages((prev) => {
              const newMessages = [...prev];
              if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === "assistant") {
                newMessages[newMessages.length - 1] = {
                  ...newMessages[newMessages.length - 1],
                  content: accumulatedContent,
                };
              }
              return newMessages;
            });
          }
        } catch (e) {
          console.error("Error parsing final stream chunk:", e, buffer);
        }
      }

    } catch (error) {
      console.error("Error during stream chat:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "ERR_CONNECTION_FAILED: Offline mode active. Connect backend to enable real-time inference." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full border border-white/20 bg-zinc-950 text-white shadow-2xl hover:bg-white hover:text-black hover:scale-105 transition-all group"
          title="Open AI Assistant Terminal"
        >
          <Terminal size={22} className="group-hover:rotate-12 transition-transform" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-6 z-50 overflow-hidden rounded-2xl border border-white/20 bg-zinc-950/95 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
              isExpanded 
                ? "w-[95vw] max-w-[800px] sm:w-[800px]" 
                : "w-[92vw] max-w-[420px] sm:w-[420px]"
            }`}
          >
            <TechCorners />

            {/* Header Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-zinc-900/80 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="rounded-lg p-1.5 border border-white/15 bg-zinc-800 text-zinc-300 hover:bg-white hover:text-black transition-colors"
                  title={isExpanded ? "Shrink chat" : "Expand chat"}
                >
                  {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black font-bold text-xs">
                  <Terminal size={14} />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold text-white">AI_AGENT_RAG_V1.0</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-zinc-400">ONLINE // 200ms</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className={`overflow-y-auto px-5 py-5 scroll-smooth transition-all duration-300 font-mono text-xs ${
                isExpanded ? "h-[580px] sm:h-[60vh]" : "h-[380px]"
              }`}
            >
              <div className="flex flex-col gap-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[88%] gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border font-bold text-[10px] ${
                        msg.role === "user" 
                          ? "border-white bg-white text-black" 
                          : "border-white/20 bg-zinc-900 text-white"
                      }`}>
                        {msg.role === "user" ? "YOU" : <Bot size={13} />}
                      </div>
                      <div
                        className={`select-text rounded-xl px-4 py-3 text-xs leading-relaxed ${
                          msg.role === "user"
                            ? "bg-white text-black font-semibold shadow-lg"
                            : "bg-zinc-900/90 text-zinc-200 border border-white/15 backdrop-blur-md"
                        }`}
                      >
                        {formatMessage(msg.content)}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1].role === "user" && (
                  <div className="flex justify-start">
                    <div className="flex gap-2.5">
                      <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border border-white/20 bg-zinc-900 text-white">
                        <Bot size={13} />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-xl border border-white/15 bg-zinc-900 px-4 py-3">
                        <span className="h-1.5 w-1.5 animate-ping rounded-full bg-white" />
                        <span className="text-[11px] text-zinc-400 font-mono">INFERRING_RESPONSE...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Prompt Pills */}
            <div className="px-4 py-2 border-t border-white/10 bg-zinc-900/40 flex gap-2 overflow-x-auto scrollbar-none font-mono text-[10px]">
              <button
                onClick={() => handleSend("What's Abhinav's FastAPI & Python experience?")}
                className="shrink-0 rounded-md border border-white/15 bg-zinc-950 px-2.5 py-1 text-zinc-300 hover:border-white hover:text-white transition-colors"
              >
                &gt; FastAPI Experience
              </button>
              <button
                onClick={() => handleSend("Tell me about DocuMind RAG project.")}
                className="shrink-0 rounded-md border border-white/15 bg-zinc-950 px-2.5 py-1 text-zinc-300 hover:border-white hover:text-white transition-colors"
              >
                &gt; DocuMind RAG
              </button>
            </div>

            {/* Input Bar */}
            <div className="border-t border-white/10 p-4 bg-zinc-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type query or command..."
                  className="w-full rounded-xl border border-white/20 bg-zinc-900 py-3 pl-4 pr-12 font-mono text-xs text-white placeholder:text-zinc-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-white p-2 text-black hover:bg-zinc-200 disabled:opacity-40 transition-all font-bold"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                </button>
              </form>
              <p className="mt-2 text-center font-mono text-[10px] text-zinc-500">
                POWERED BY RAG // RETRIEVAL AUGMENTED INFERENCE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



