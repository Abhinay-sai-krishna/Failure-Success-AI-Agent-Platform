"use client";

import { Send, Bot, User, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function ChatAgent({ initialPrompt }: { initialPrompt?: string }) {
    const [inputLocal, setInputLocal] = useState("");
    const [messages, setMessages] = useState<{ id: string, role: string, content: string }[]>(
        initialPrompt ? [{ id: "1", role: "user", content: initialPrompt }] : []
    );
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        setInputLocal("");
        setIsLoading(true);

        const newMessages = [...messages, { id: Date.now().toString(), role: "user", content }];
        setMessages(newMessages);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!res.ok) throw new Error("API error");

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let assistantMessage = "";
            const botMessageId = (Date.now() + 1).toString();

            setMessages(m => [...m, { id: botMessageId, role: "assistant", content: "" }]);

            while (reader && !done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                if (chunkValue) {
                    // Parse Vercel AI streams (which return format: 0:"text")
                    // If the AI API returns a clean text stream, we append it directly.
                    // Since we use toTextStreamResponse(), it returns raw text chunks.
                    // We will strip the Vercel AI prefix "0:\"" if it exists.

                    let parsedChunk = "";
                    const lines = chunkValue.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('0:')) {
                            try { parsedChunk += JSON.parse(line.substring(2)); } catch (e) { parsedChunk += line }
                        } else {
                            parsedChunk += line;
                        }
                    }

                    assistantMessage += parsedChunk;
                    setMessages(m => m.map(msg => msg.id === botMessageId ? { ...msg, content: assistantMessage } : msg));
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (initialPrompt && messages.length === 1 && messages[0].content === initialPrompt) {
            sendMessage(initialPrompt);
        }
    }, []);

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(inputLocal);
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col pt-12 pb-32">
                {messages.length === 0 && !initialPrompt && (
                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center">
                            <Zap className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">What idea would you like to build?</h2>
                        <p className="text-neutral-400 max-w-md">Let's turn your failure points into actionable roadmaps and solid architecture.</p>
                    </div>
                )}

                {messages.map((m) => {
                    return (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"}`}>
                                {m.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className={`p-4 rounded-2xl max-w-[85%] ${m.role === "user" ? "bg-emerald-500/10 text-emerald-100 rounded-tr-none border border-emerald-500/20" : "bg-white/5 text-neutral-200 rounded-tl-none border border-white/10 prose prose-invert prose-emerald max-w-none"}`}>
                                <div className="whitespace-pre-wrap">{m.content}</div>
                            </div>
                        </motion.div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black to-transparent backdrop-blur-sm shadow-xl">
                <form onSubmit={handleManualSubmit} className="relative max-w-4xl mx-auto flex items-center">
                    <input
                        className="w-full glass rounded-xl py-4 pl-6 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-2xl transition-all"
                        value={inputLocal}
                        onChange={(e) => setInputLocal(e.target.value)}
                        placeholder={isLoading ? "AI is typing..." : "Explain your idea, tech stack, or roadmap..."}
                        disabled={isLoading}
                        suppressHydrationWarning
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !inputLocal.trim()}
                        className="absolute right-3 p-2 bg-emerald-500 text-black rounded-lg disabled:opacity-50 hover:bg-emerald-400 transition-colors"
                        suppressHydrationWarning
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}
