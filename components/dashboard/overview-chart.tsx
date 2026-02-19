"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', Cancerous: 4, Benign: 12 },
    { name: 'Tue', Cancerous: 7, Benign: 18 },
    { name: 'Wed', Cancerous: 5, Benign: 15 },
    { name: 'Thu', Cancerous: 8, Benign: 22 },
    { name: 'Fri', Cancerous: 6, Benign: 20 },
    { name: 'Sat', Cancerous: 9, Benign: 28 },
    { name: 'Sun', Cancerous: 4, Benign: 10 },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-slate-100 rounded-xl shadow-lg p-3 text-sm">
                <p className="font-semibold text-slate-700 mb-2">{label}</p>
                {payload.map((p: { name: string; value: number; color: string }) => (
                    <div key={p.name} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                        <span className="text-slate-500">{p.name}:</span>
                        <span className="font-semibold text-slate-800">{p.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function OverviewChart() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-[360px] flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">Weekly Detection Trends</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Cancerous vs. Benign this week</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> Cancerous
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Benign
                    </span>
                </div>
            </div>

            <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
                            dy={8}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 11 }}
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
        </div>
    );
}
