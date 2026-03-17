import { ChatAgent } from "@/components/chat/ChatAgent";

export default function DashboardPage({ searchParams }: { searchParams: { idea?: string } }) {
    const initialIdea = searchParams.idea;

    return (
        <div className="flex h-full flex-col relative">
            <header className="p-6 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-white">Project architect</h1>
                    <p className="text-sm text-neutral-400">Generate your roadmap and stack</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/20 transition-colors border border-emerald-500/20">
                        Export Plan
                    </button>
                </div>
            </header>

            {/* Main Chat Interface */}
            <ChatAgent initialPrompt={initialIdea} />
        </div>
    );
}
