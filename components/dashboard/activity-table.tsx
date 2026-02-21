import { BadgeCheck, AlertCircle, HelpCircle, Microscope } from "lucide-react";

const statusConfig = {
    mal: {
        icon: AlertCircle,
        label: "OSCC Detected",
        bg: "var(--danger-light)",
        color: "var(--danger)",
        border: "var(--danger)",
    },
    ben: {
        icon: BadgeCheck,
        label: "Normal",
        bg: "var(--success-light)",
        color: "var(--success)",
        border: "var(--success)",
    },
    inc: {
        icon: HelpCircle,
        label: "Inconclusive",
        bg: "var(--warning-light)",
        color: "var(--warning)",
        border: "var(--warning)",
    },
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
        <div
            className="rounded-xl overflow-hidden"
            style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            <div
                className="px-6 py-4 flex items-center justify-between"
                style={{ borderBottom: "1px solid var(--border)" }}
            >
                <div>
                    <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        Recent Scans
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Latest biopsy analysis results
                    </p>
                </div>
            </div>

            {scans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                    <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                        style={{ background: "var(--bg-subtle)" }}
                    >
                        <Microscope size={22} style={{ color: "var(--text-muted)" }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        No scans yet
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                        Upload a biopsy slide to see results here.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                {["Patient", "Time", "Result", "Action"].map((h, i) => (
                                    <th
                                        key={h}
                                        className={`px-6 py-3 text-[11px] font-semibold uppercase tracking-wider${i === 3 ? " text-right" : ""}`}
                                        style={{ color: "var(--text-muted)" }}
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {scans.map((item, i) => {
                                const cfg = statusConfig[item.type];
                                const Icon = cfg.icon;
                                return (
                                    <tr
                                        key={item.id}
                                        className="transition-colors"
                                        style={i < scans.length - 1 ? { borderBottom: "1px solid var(--border-muted)" } : {}}
                                        onMouseEnter={(e) =>
                                            ((e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)")
                                        }
                                        onMouseLeave={(e) =>
                                            ((e.currentTarget as HTMLElement).style.background = "transparent")
                                        }
                                    >
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase shrink-0"
                                                    style={{
                                                        background: "var(--bg-subtle)",
                                                        color: "var(--text-secondary)",
                                                    }}
                                                >
                                                    {item.patient.slice(0, 2)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                                        {item.patient}
                                                    </p>
                                                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                                                        {item.idNo}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 text-xs" style={{ color: "var(--text-muted)" }}>
                                            {item.time}
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                                                style={{
                                                    background: cfg.bg,
                                                    color: cfg.color,
                                                    borderColor: cfg.border,
                                                    borderWidth: "1px",
                                                    borderStyle: "solid",
                                                    opacity: 0.9,
                                                }}
                                            >
                                                <Icon size={11} />
                                                {cfg.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-right">
                                            <button
                                                className="text-xs font-medium transition-colors hover:text-blue-500"
                                                style={{ color: "var(--text-muted)" }}
                                            >
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
