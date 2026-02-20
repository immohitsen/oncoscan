import { BadgeCheck, AlertCircle, HelpCircle, Microscope } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
    mal: { icon: AlertCircle, label: "OSCC Detected", className: "bg-red-50 text-red-700 border-red-100" },
    ben: { icon: BadgeCheck, label: "Normal", className: "bg-green-50 text-green-700 border-green-100" },
    inc: { icon: HelpCircle, label: "Inconclusive", className: "bg-amber-50 text-amber-700 border-amber-100" },
};

type ScanResult = {
    id: number;
    patient: string;
    idNo: string;
    time: string;
    type: keyof typeof statusConfig;
};

interface ActivityTableProps {
    scans?: ScanResult[];
}

export function ActivityTable({ scans = [] }: ActivityTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">Recent Scans</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Latest biopsy analysis results</p>
                </div>
            </div>

            {scans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                        <Microscope size={22} className="text-slate-400" />
                    </div>
                    <p className="text-sm font-medium text-slate-600">No scans yet</p>
                    <p className="text-xs text-slate-400 mt-1">Upload a biopsy slide to see results here.</p>
                </div>
            ) : (
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
                            {scans.map((item, i) => {
                                const config = statusConfig[item.type];
                                const Icon = config.icon;
                                return (
                                    <tr
                                        key={item.id}
                                        className={cn(
                                            "hover:bg-slate-50/70 transition-colors",
                                            i < scans.length - 1 && "border-b border-slate-50"
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
            )}
        </div>
    );
}
