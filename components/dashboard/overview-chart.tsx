"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart2 } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

type ChartPoint = {
    name: string;
    Cancerous: number;
    Benign: number;
};

interface OverviewChartProps {
    data?: ChartPoint[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="rounded-xl shadow-lg p-3 text-sm"
                style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                }}
            >
                <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{label}</p>
                {payload.map((p: { name: string; value: number; color: string }) => (
                    <div key={p.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        <span style={{ color: "var(--text-muted)" }}>{p.name}:</span>
                        <span className="font-semibold" style={{ color: "var(--text-primary)" }}>{p.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function OverviewChart({ data = [] }: OverviewChartProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const gridColor = isDark ? "#2d3148" : "#f1f5f9";
    const tickColor = isDark ? "#4b5579" : "#94a3b8";

    return (
        <div
            className="p-6 rounded-xl h-[360px] flex flex-col"
            style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        Weekly Detection Trends
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Cancerous vs. Benign this week
                    </p>
                </div>
                {data.length > 0 && (
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Cancerous
                        </span>
                        <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-muted)" }}>
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Benign
                        </span>
                    </div>
                )}
            </div>

            {data.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                        style={{ background: "var(--bg-subtle)" }}
                    >
                        <BarChart2 size={22} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>No data yet</p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        Scan results will appear here as they come in.
                    </p>
                </div>
            ) : (
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: tickColor, fontSize: 11 }}
                                dy={8}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: tickColor, fontSize: 11 }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="Cancerous"
                                stroke="#ef4444"
                                strokeWidth={2.5}
                                dot={{ r: 3.5, fill: '#ef4444', strokeWidth: 0 }}
                                activeDot={{ r: 5, strokeWidth: 0 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Benign"
                                stroke="#3b82f6"
                                strokeWidth={2.5}
                                dot={{ r: 3.5, fill: '#3b82f6', strokeWidth: 0 }}
                                activeDot={{ r: 5, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
