"use client";

import { Search, ChevronDown, Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useTheme } from "@/components/theme-provider";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
    "/": { title: "Dashboard", subtitle: "Overview of today's activity" },
    "/ai-pathologist": { title: "AI Pathologist", subtitle: "Upload and analyze biopsy slides" },
    "/patients": { title: "Patient Records", subtitle: "Manage and view patient histories" },
    "/mitra-bot": { title: "Mitra AI Assistant", subtitle: "Clinical documentation and support" },
    "/settings": { title: "Settings", subtitle: "Configure your workspace" },
};

export function Header() {
    const pathname = usePathname();
    const page = pageTitles[pathname] ?? { title: "Oncoscan", subtitle: "" };
    const { user, initials } = useUser();
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <header
            className="h-16 flex items-center justify-between px-6 sticky top-0 z-30"
            style={{
                background: "var(--bg-elevated)",
                borderBottom: "1px solid var(--border)",
                transition: "background 0.2s ease, border-color 0.2s ease",
            }}
        >
            {/* Page Title */}
            <div className="hidden md:block">
                <h2 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                    {page.title}
                </h2>
                {page.subtitle && (
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {page.subtitle}
                    </p>
                )}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-sm mx-4 md:mx-8 relative">
                <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    size={15}
                    style={{ color: "var(--text-muted)" }}
                />
                <input
                    type="text"
                    placeholder="Search patients, reports..."
                    className="w-full pl-9 pr-4 py-2 rounded-lg outline-none text-sm"
                    style={{
                        background: "var(--bg-subtle)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => {
                        const el = e.target as HTMLInputElement;
                        el.style.background = "var(--bg-elevated)";
                        el.style.borderColor = "var(--primary)";
                        el.style.boxShadow = "0 0 0 3px var(--primary-light)";
                    }}
                    onBlur={(e) => {
                        const el = e.target as HTMLInputElement;
                        el.style.background = "var(--bg-subtle)";
                        el.style.borderColor = "var(--border)";
                        el.style.boxShadow = "none";
                    }}
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">

                {/* ── Theme Toggle ── */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="relative flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
                    style={{
                        color: "var(--text-secondary)",
                        transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                >
                    {/* Icon with flip animation */}
                    <span
                        style={{
                            display: "inline-flex",
                            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease",
                            transform: isDark ? "rotate(0deg)" : "rotate(-30deg)",
                        }}
                    >
                        {isDark
                            ? <Sun size={17} style={{ color: "var(--warning)" }} />
                            : <Moon size={17} style={{ color: "var(--text-secondary)" }} />
                        }
                    </span>

                    {/* Pill track */}
                    <div
                        style={{
                            position: "relative",
                            width: 36,
                            height: 20,
                            borderRadius: 999,
                            background: isDark ? "var(--primary)" : "var(--bg-subtle)",
                            border: "1.5px solid var(--border)",
                            transition: "background 0.3s ease, border-color 0.3s ease",
                        }}
                    >
                        {/* Thumb */}
                        <div
                            style={{
                                position: "absolute",
                                top: 2,
                                left: 2,
                                width: 14,
                                height: 14,
                                borderRadius: "50%",
                                background: isDark ? "#ffffff" : "var(--text-muted)",
                                boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                                transform: isDark ? "translateX(16px)" : "translateX(0px)",
                                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease",
                            }}
                        />
                    </div>
                </button>

                <div className="w-px h-6 mx-1" style={{ background: "var(--border)" }} />

                {/* User */}
                <button
                    className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg"
                    style={{ transition: "background 0.2s" }}
                    onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)")
                    }
                    onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background = "transparent")
                    }
                >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                        {initials}
                    </div>
                    <span className="text-sm font-medium hidden sm:block" style={{ color: "var(--text-primary)" }}>
                        {user?.name ?? "Loading..."}
                    </span>
                    <ChevronDown size={14} className="hidden sm:block" style={{ color: "var(--text-muted)" }} />
                </button>
            </div>
        </header>
    );
}
