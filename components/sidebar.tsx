"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "AI Pathologist", href: "/ai-pathologist", icon: Microscope },
    { name: "Patient Records", href: "/patients", icon: Users },
    { name: "Mitra Bot", href: "/mitra-bot", icon: Bot },
];

const bottomNavItems = [
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-slate-600 border border-slate-200"
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-100 flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
            )}>
                {/* Logo */}
                <div className="h-16 flex items-center px-5 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                            <Stethoscope size={16} className="text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-900 tracking-tight">
                            Onco<span className="text-blue-600">Scan</span>
                        </span>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">Main Menu</p>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium group relative",
                                    isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-600 rounded-r-full" />
                                )}
                                <Icon
                                    size={18}
                                    className={cn(
                                        "shrink-0",
                                        isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                                    )}
                                />
                                {item.name}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 mb-3">System</p>
                        {bottomNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                                        isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* User Profile */}
                <div className="p-3 border-t border-slate-100 shrink-0">
                    <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 cursor-pointer group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                            DR
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">Dr. Rajesh</p>
                            <p className="text-xs text-slate-500 truncate">Senior Pathologist</p>
                        </div>
                        <LogOut size={15} className="text-slate-300 group-hover:text-slate-500 shrink-0" />
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
