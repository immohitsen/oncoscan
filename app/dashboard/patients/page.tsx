"use client";

import { Search, Filter, Plus, UserCheck, Users } from "lucide-react";
import { useState } from "react";

type Patient = {
    id: string;
    name: string;
    age: number;
    gender: string;
    date: string;
    status: string;
};

const statusStyles: Record<string, { bg: string; color: string; dot: string }> = {
    "High Risk": { bg: "var(--danger-light)", color: "var(--danger)", dot: "var(--danger)" },
    "Normal": { bg: "var(--success-light)", color: "var(--success)", dot: "var(--success)" },
    "Inconclusive": { bg: "var(--warning-light)", color: "var(--warning)", dot: "var(--warning)" },
    "Pending": { bg: "var(--bg-subtle)", color: "var(--text-muted)", dot: "var(--text-muted)" },
};

const patients: Patient[] = [];

export default function PatientsPage() {
    const [search, setSearch] = useState("");

    const filtered = patients.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-5 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                        Patient Records
                    </h1>
                    <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
                        Manage and view patient histories
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                        style={{
                            background: "var(--bg-elevated)",
                            border: "1px solid var(--border)",
                            color: "var(--text-secondary)",
                        }}
                    >
                        <Filter size={15} />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">
                        <Plus size={15} />
                        Add Patient
                    </button>
                </div>
            </div>

            {/* Summary Badges */}
            <div className="flex gap-3 flex-wrap">
                {[
                    { label: "Total Patients", value: patients.length.toString(), color: "blue" },
                    { label: "High Risk", value: patients.filter(p => p.status === "High Risk").length.toString(), color: "red" },
                    { label: "Normal", value: patients.filter(p => p.status === "Normal").length.toString(), color: "green" },
                    { label: "Pending", value: patients.filter(p => p.status === "Pending").length.toString(), color: "amber" },
                ].map((s) => {
                    const colors = {
                        blue: { bg: "var(--primary-light)", text: "var(--primary-text)", border: "var(--primary)" },
                        red: { bg: "var(--danger-light)", text: "var(--danger)", border: "var(--danger)" },
                        green: { bg: "var(--success-light)", text: "var(--success)", border: "var(--success)" },
                        amber: { bg: "var(--warning-light)", text: "var(--warning)", border: "var(--warning)" },
                    }[s.color as "blue" | "red" | "green" | "amber"];
                    return (
                        <div
                            key={s.label}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium"
                            style={{ background: colors.bg, color: colors.text, borderColor: colors.border, borderStyle: "solid", borderWidth: "1px" }}
                        >
                            <span className="font-bold">{s.value}</span>
                            <span className="opacity-70">{s.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Table Card */}
            <div
                className="rounded-xl overflow-hidden"
                style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)",
                }}
            >
                {/* Search Bar */}
                <div
                    className="px-5 py-3.5 flex items-center gap-3"
                    style={{ borderBottom: "1px solid var(--border)" }}
                >
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            size={14}
                            style={{ color: "var(--text-muted)" }}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or ID..."
                            className="w-full pl-8 pr-4 py-2 rounded-lg text-sm outline-none transition-all"
                            style={{
                                background: "var(--bg-subtle)",
                                border: "1px solid var(--border)",
                                color: "var(--text-primary)",
                            }}
                        />
                    </div>
                    <span className="text-xs ml-auto" style={{ color: "var(--text-muted)" }}>
                        {filtered.length} results
                    </span>
                </div>

                {patients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                            style={{ background: "var(--bg-subtle)" }}
                        >
                            <Users size={22} style={{ color: "var(--text-muted)" }} />
                        </div>
                        <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                            No patients yet
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                            Add a patient or run a scan to see records here.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                    {["Patient", "ID", "Demographics", "Last Scan", "Status"].map((h) => (
                                        <th
                                            key={h}
                                            className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-12 text-center text-sm"
                                            style={{ color: "var(--text-muted)" }}
                                        >
                                            No patients found matching &quot;{search}&quot;
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((patient, i) => {
                                        const sc = statusStyles[patient.status] ?? statusStyles["Pending"];
                                        return (
                                            <tr
                                                key={patient.id}
                                                className="transition-colors"
                                                style={i < filtered.length - 1 ? { borderBottom: "1px solid var(--border-muted)" } : {}}
                                                onMouseEnter={(e) =>
                                                    ((e.currentTarget as HTMLElement).style.background = "var(--bg-subtle)")
                                                }
                                                onMouseLeave={(e) =>
                                                    ((e.currentTarget as HTMLElement).style.background = "transparent")
                                                }
                                            >
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold uppercase shrink-0"
                                                            style={{ background: "var(--bg-subtle)", color: "var(--text-secondary)" }}
                                                        >
                                                            {patient.name.slice(0, 2)}
                                                        </div>
                                                        <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                                                            {patient.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                                                    {patient.id}
                                                </td>
                                                <td className="px-5 py-3.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                                                    {patient.age}y / {patient.gender}
                                                </td>
                                                <td className="px-5 py-3.5 text-sm" style={{ color: "var(--text-secondary)" }}>
                                                    {patient.date}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <span
                                                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border"
                                                        style={{
                                                            background: sc.bg,
                                                            color: sc.color,
                                                            borderColor: sc.dot,
                                                            borderWidth: "1px",
                                                        }}
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full"
                                                            style={{ background: sc.dot }}
                                                        />
                                                        {patient.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
