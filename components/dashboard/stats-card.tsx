import { LucideIcon } from "lucide-react";

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

type ColorKey = "blue" | "red" | "amber" | "green";

const iconColors: Record<ColorKey, { bg: string; color: string }> = {
    blue: { bg: "rgba(37,99,235,0.1)", color: "#2563eb" },
    red: { bg: "rgba(220,38,38,0.1)", color: "#dc2626" },
    amber: { bg: "rgba(217,119,6,0.1)", color: "#d97706" },
    green: { bg: "rgba(22,163,74,0.1)", color: "#16a34a" },
};

const valueColors: Record<ColorKey, string> = {
    blue: "var(--text-primary)",
    red: "var(--danger)",
    amber: "var(--text-primary)",
    green: "var(--text-primary)",
};

export function StatsCard({
    title, value, icon: Icon, trend, trendUp, highlight, description, color = "blue",
}: StatsCardProps) {
    const key: ColorKey = highlight ? "red" : color;
    const ic = iconColors[key];

    return (
        <div
            className="p-5 rounded-xl flex flex-col gap-4 transition-shadow hover:shadow-md"
            style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            <div className="flex items-start justify-between">
                <div
                    className="p-2.5 rounded-xl"
                    style={{ background: ic.bg, color: ic.color }}
                >
                    <Icon size={20} />
                </div>
                {trend && (
                    <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{
                            background: trendUp ? "var(--success-light)" : "var(--danger-light)",
                            color: trendUp ? "var(--success)" : "var(--danger)",
                        }}
                    >
                        {trendUp ? "↑" : "↓"} {trend}
                    </span>
                )}
            </div>

            <div>
                <p className="text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>
                    {title}
                </p>
                <h3
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: valueColors[key] }}
                >
                    {value}
                </h3>
                {description && (
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
