"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

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

    return (
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Page Title */}
            <div className="hidden md:block">
                <h2 className="text-base font-semibold text-slate-900">{page.title}</h2>
                {page.subtitle && <p className="text-xs text-slate-400">{page.subtitle}</p>}
            </div>

            {/* Search */}
            <div className="flex-1 max-w-sm mx-4 md:mx-8 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input
                    type="text"
                    placeholder="Search patients, reports..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-50 rounded-lg outline-none text-sm text-slate-700 placeholder-slate-400"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
                <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                <div className="w-px h-6 bg-slate-200 mx-1" />

                <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                        DR
                    </div>
                    <span className="text-sm font-medium text-slate-700 hidden sm:block">Dr. Rajesh</span>
                    <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                </button>
            </div>
        </header>
    );
}
