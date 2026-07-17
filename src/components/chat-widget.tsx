"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User, Loader2, MessageSquare, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function formatMessage(content: string) {
  // Normalize inline numbered items and bullets to newlines to process them as lists
  let formatted = content.replace(/\s+(\d+\.\s+)/g, "\n$1");
  formatted = formatted.replace(/\s+([•\-\*]\s+)/g, "\n$1");

  const lines = formatted.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: { type: "ol" | "ul"; items: React.ReactNode[] } | null = null;

  const flushList = (key: number) => {
    if (currentList) {
      if (currentList.type === "ol") {
        elements.push(
          <ol key={`list-${key}`} className="list-decimal pl-5 my-1.5 space-y-1">
            {currentList.items}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-5 my-1.5 space-y-1">
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

    // Numbered list item (e.g. "1. Item")
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

    // Bullet list item (e.g. "- Item" or "* Item" or "• Item")
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

    // Standard text line
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
    { role: "assistant", content: "Hi! I'm Abhinav's AI assistant. Ask me anything about his experience or projects." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wake up the backend on load
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const chatHistory = messages.slice(-5);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/chat/";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: input,
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

      // Handle any remaining content in the buffer
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
        { role: "assistant", content: "Sorry, I'm having trouble connecting to the backend right now." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button (Exported to be used in Hero if needed, or floating) */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-2xl shadow-primary/20"
        >
          <MessageSquare size={24} />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-6 z-50 overflow-hidden rounded-2xl border border-border/50 bg-background/95 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
              isExpanded 
                ? "w-[95vw] max-w-[800px] sm:w-[800px]" 
                : "w-[90vw] max-w-[400px] sm:w-[400px]"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 bg-primary/5 px-4 py-4 sm:px-6">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="rounded-lg p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors mr-1"
                  title={isExpanded ? "Shrink chat" : "Expand chat"}
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">Ask AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-medium text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className={`overflow-y-auto px-6 py-6 scroll-smooth transition-all duration-300 ${
                isExpanded ? "h-[600px] sm:h-[60vh]" : "h-[400px]"
              }`}
            >
              <div className="flex flex-col gap-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[85%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                        }`}
                    >
                      <div className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}>
                        {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                      </div>
                      <div
                        className={`select-text rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10 rounded-tr-none"
                            : "bg-muted/50 text-foreground rounded-tl-none border border-border/20"
                          }`}
                      >
                        {formatMessage(msg.content)}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && messages[messages.length - 1].role === "user" && (
                  <div className="flex justify-start">
                    <div className="flex gap-3">
                      <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-md bg-muted text-foreground">
                        <Bot size={14} />
                      </div>
                      <div className="flex items-center gap-1 rounded-2xl bg-muted/50 px-4 py-2.5">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:0.2s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-border/50 p-4 bg-background/50">
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
                  placeholder="Ask me anything..."
                  className="w-full rounded-xl border border-border/50 bg-background/50 py-3 pl-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-1.5 text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </form>
              <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
                Powered by Abhinav's Portfolio AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
