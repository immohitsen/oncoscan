"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Microscope,
    Users,
    Bot,
    Settings,
    Menu,
    X,
    LogOut,
    Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Pathologist", href: "/dashboard/ai-pathologist", icon: Microscope },
    { name: "Patient Records", href: "/dashboard/patients", icon: Users },
    { name: "Mitra Bot", href: "/dashboard/mitra-bot", icon: Bot },
];

const bottomNavItems = [
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { user, initials } = useUser();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    };

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md border"
                style={{
                    background: "var(--bg-elevated)",
                    color: "var(--text-secondary)",
                    borderColor: "var(--border)",
                }}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0",
                    isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
                )}
                style={{
                    background: "var(--bg-elevated)",
                    borderRight: "1px solid var(--border)",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="h-16 flex items-center px-5 shrink-0"
                    style={{ borderBottom: "1px solid var(--border)" }}
                >
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <Stethoscope size={16} className="text-white" />
                        </div>
                        <span
                            className="text-lg font-bold tracking-tight"
                            style={{ color: "var(--text-primary)" }}
                        >
                            Onco<span className="text-blue-500">Scan</span>
                        </span>
                    </div>
                </Link>

                {/* Nav */}
                <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
                    <p
                        className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-3"
                        style={{ color: "var(--text-muted)" }}
                    >
                        Main Menu
                    </p>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium group relative transition-colors"
                                )}
                                style={
                                    isActive
                                        ? {
                                            background: "var(--primary-light)",
                                            color: "var(--primary-text)",
                                        }
                                        : {
                                            color: "var(--text-secondary)",
                                        }
                                }
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
                                        (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                        (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                                    }
                                }}
                            >
                                {isActive && (
                                    <span
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                                        style={{ background: "var(--primary)" }}
                                    />
                                )}
                                <Icon
                                    size={18}
                                    className="shrink-0"
                                    style={{
                                        color: isActive ? "var(--primary)" : "var(--text-muted)",
                                    }}
                                />
                                {item.name}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4" style={{ borderTop: "1px solid var(--border)" }}>
                        <p
                            className="text-[10px] font-semibold uppercase tracking-widest px-3 mb-3"
                            style={{ color: "var(--text-muted)" }}
                        >
                            System
                        </p>
                        {bottomNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                    style={
                                        isActive
                                            ? { background: "var(--primary-light)", color: "var(--primary-text)" }
                                            : { color: "var(--text-secondary)" }
                                    }
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            (e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)";
                                            (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            (e.currentTarget as HTMLElement).style.background = "transparent";
                                            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
                                        }
                                    }}
                                >
                                    <Icon
                                        size={18}
                                        style={{ color: isActive ? "var(--primary)" : "var(--text-muted)" }}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}


                    </div>
                </nav>

                {/* User Profile */}
                <div className="p-3 shrink-0" style={{ borderTop: "1px solid var(--border)" }}>
                    <div
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer group transition-colors"
                        onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)")
                        }
                        onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLElement).style.background = "transparent")
                        }
                    >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                            {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p
                                className="text-sm font-semibold truncate"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {user?.name ?? "Loading..."}
                            </p>
                            <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                                {user?.email ?? ""}
                            </p>
                        </div>
                        <LogOut size={15} className="shrink-0 transition-colors group-hover:text-red-400" style={{ color: "var(--text-muted)" }} />
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 backdrop-blur-sm md:hidden"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
