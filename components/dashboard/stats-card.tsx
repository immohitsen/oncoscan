import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
    trendUp?: boolean;
    highlight?: boolean;
    description?: string;
    color?: "blue" | "red" | "amber" | "green";
}

const colorMap = {
    blue: {
        icon: "bg-blue-50 text-blue-600",
        badge: "bg-blue-50 text-blue-700",
        value: "text-slate-900",
    },
    red: {
        icon: "bg-red-50 text-red-600",
        badge: "bg-red-50 text-red-700",
        value: "text-red-700",
    },
    amber: {
        icon: "bg-amber-50 text-amber-600",
        badge: "bg-amber-50 text-amber-700",
        value: "text-slate-900",
    },
    green: {
        icon: "bg-green-50 text-green-600",
        badge: "bg-green-50 text-green-700",
        value: "text-slate-900",
    },
};

export function StatsCard({ title, value, icon: Icon, trend, trendUp, highlight, description, color = "blue" }: StatsCardProps) {
    const colors = colorMap[highlight ? "red" : color];

    return (
        <div className={cn(
            "bg-white p-5 rounded-xl border flex flex-col gap-4 transition-shadow hover:shadow-md",
            highlight ? "border-red-100 shadow-sm" : "border-slate-100 shadow-sm"
        )}>
            <div className="flex items-start justify-between">
                <div className={cn("p-2.5 rounded-xl", colors.icon)}>
                    <Icon size={20} />
                </div>
                {trend && (
                    <span className={cn(
                        "text-xs font-semibold px-2 py-0.5 rounded-full",
                        trendUp ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    )}>
                        {trendUp ? "↑" : "↓"} {trend}
                    </span>
                )}
            </div>

            <div>
                <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
                <h3 className={cn("text-2xl font-bold tracking-tight", colors.value)}>{value}</h3>
                {description && <p className="text-xs text-slate-400 mt-1">{description}</p>}
            </div>
        </div>
    );
}
