import { Home, Lightbulb, Settings, History } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-neutral-950/50 backdrop-blur-xl flex flex-col">
                <div className="p-6">
                    <Link href="/">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                            Failure → Success
                        </h1>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <NavItem href="/dashboard" icon={<Home className="w-5 h-5" />} label="New Project" active />
                    <NavItem href="/dashboard/history" icon={<History className="w-5 h-5" />} label="Past Ideas" />
                    <NavItem href="/dashboard/architecture" icon={<Lightbulb className="w-5 h-5" />} label="Saved Architectures" />
                </nav>

                <div className="p-4 border-t border-white/5">
                    <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-auto">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${active ? "bg-white/10 text-white" : "text-neutral-400 hover:text-white hover:bg-white/5"}`}
        >
            {icon}
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}
