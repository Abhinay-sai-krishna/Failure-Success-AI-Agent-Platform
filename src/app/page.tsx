"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code, Zap, Database } from "lucide-react";
import { Background } from "@/components/three/Background";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    // We send them to the dashboard/chat page with the initial prompt
    router.push(`/dashboard?idea=${encodeURIComponent(prompt)}`);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Background />

      {/* Hero Section */}
      <div className="z-10 flex flex-col items-center text-center px-6 w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-medium text-neutral-300">Failure → Success AI is Live</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Turn Failed Ideas Into <br className="hidden md:block" /> Successful Products
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          An AI-powered platform that converts your goals into actionable plans, software architectures, and automated development guidance. Build without limits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <form onSubmit={handleCreatePlan} className="relative flex items-center w-full">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your app idea or failure point..."
              className="w-full pl-6 pr-32 py-5 rounded-2xl glass text-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-all text-white placeholder:text-neutral-500"
              suppressHydrationWarning
            />
            <button
              type="submit"
              className="absolute right-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-2"
              suppressHydrationWarning
            >
              Generate
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </motion.div>

        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <FeatureCard
            icon={<Zap className="w-5 h-5 text-yellow-500" />}
            title="Instant Execution Plans"
            description="Our AI breaks down your broad ideas into precise, step-by-step actionable plans."
          />
          <FeatureCard
            icon={<Code className="w-5 h-5 text-blue-500" />}
            title="Architecture Generation"
            description="Automatically generate optimal tech stacks and modular system architectures."
          />
          <FeatureCard
            icon={<Database className="w-5 h-5 text-emerald-500" />}
            title="Production Ready"
            description="Integrated with PostgreSQL, Auth, and Payments to go from zero to live instantly."
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0 pointer-events-none" />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass p-6 text-left rounded-2xl border border-white/5 hover:border-white/10 transition-colors group">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-neutral-400">{description}</p>
    </div>
  );
}
