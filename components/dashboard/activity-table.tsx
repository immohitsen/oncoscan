import { BadgeCheck, AlertCircle, HelpCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const recentActivity = [
    { id: 1, patient: "Ramesh Gupta", idNo: "PID-2024-001", time: "10 mins ago", status: "OSCC Detected", type: "mal" },
    { id: 2, patient: "Anita Desai", idNo: "PID-2024-002", time: "25 mins ago", status: "Normal", type: "ben" },
    { id: 3, patient: "Suresh Kumar", idNo: "PID-2024-003", time: "1 hour ago", status: "Inconclusive", type: "inc" },
    { id: 4, patient: "Meena Patel", idNo: "PID-2024-004", time: "2 hours ago", status: "Normal", type: "ben" },
    { id: 5, patient: "John Doe", idNo: "PID-2024-005", time: "3 hours ago", status: "OSCC Detected", type: "mal" },
];

const statusConfig = {
    mal: { icon: AlertCircle, label: "OSCC Detected", className: "bg-red-50 text-red-700 border-red-100" },
    ben: { icon: BadgeCheck, label: "Normal", className: "bg-green-50 text-green-700 border-green-100" },
    inc: { icon: HelpCircle, label: "Inconclusive", className: "bg-amber-50 text-amber-700 border-amber-100" },
};

export function ActivityTable() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">Recent Scans</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Latest biopsy analysis results</p>
                </div>
                <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                    View All <ArrowRight size={12} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-100">
                            <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Patient</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Result</th>
                            <th className="px-6 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentActivity.map((item, i) => {
                            const config = statusConfig[item.type as keyof typeof statusConfig];
                            const Icon = config.icon;
                            return (
                                <tr
                                    key={item.id}
                                    className={cn(
                                        "hover:bg-slate-50/70 transition-colors",
                                        i < recentActivity.length - 1 && "border-b border-slate-50"
                                    )}
                                >
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase shrink-0">
                                                {item.patient.slice(0, 2)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{item.patient}</p>
                                                <p className="text-xs text-slate-400">{item.idNo}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-xs text-slate-400">{item.time}</td>
                                    <td className="px-6 py-3.5">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                                            config.className
                                        )}>
                                            <Icon size={11} />
                                            {config.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                        <button className="text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors">
                                            View →
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
