"use client";

import { Search, Filter, Plus, UserCheck, Users } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Patient = {
    id: string;
    name: string;
    age: number;
    gender: string;
    date: string;
    status: string;
};

const statusConfig: Record<string, { className: string; dot: string }> = {
    "High Risk": { className: "bg-red-50 text-red-700 border-red-100", dot: "bg-red-500" },
    "Normal": { className: "bg-green-50 text-green-700 border-green-100", dot: "bg-green-500" },
    "Inconclusive": { className: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500" },
    "Pending": { className: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" },
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
                    <h1 className="text-xl font-bold text-slate-900">Patient Records</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Manage and view patient histories</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
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
                    { label: "Total Patients", value: patients.length.toString(), icon: UserCheck, color: "text-blue-600 bg-blue-50 border-blue-100" },
                    { label: "High Risk", value: patients.filter(p => p.status === "High Risk").length.toString(), icon: null, color: "text-red-600 bg-red-50 border-red-100" },
                    { label: "Normal", value: patients.filter(p => p.status === "Normal").length.toString(), icon: null, color: "text-green-600 bg-green-50 border-green-100" },
                    { label: "Pending", value: patients.filter(p => p.status === "Pending").length.toString(), icon: null, color: "text-amber-600 bg-amber-50 border-amber-100" },
                ].map((s) => (
                    <div key={s.label} className={cn("flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium", s.color)}>
                        <span className="font-bold">{s.value}</span>
                        <span className="opacity-70">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                {/* Search Bar */}
                <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or ID..."
                            className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50 transition-all"
                        />
                    </div>
                    <span className="text-xs text-slate-400 ml-auto">{filtered.length} results</span>
                </div>

                {patients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                            <Users size={22} className="text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-600">No patients yet</p>
                        <p className="text-xs text-slate-400 mt-1">Add a patient or run a scan to see records here.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Patient</th>
                                    <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                                    <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Demographics</th>
                                    <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Last Scan</th>
                                    <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-12 text-center text-sm text-slate-400">
                                            No patients found matching &quot;{search}&quot;
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((patient, i) => {
                                        const sc = statusConfig[patient.status] ?? statusConfig["Pending"];
                                        return (
                                            <tr
                                                key={patient.id}
                                                className={cn(
                                                    "hover:bg-slate-50/70 transition-colors",
                                                    i < filtered.length - 1 && "border-b border-slate-50"
                                                )}
                                            >
                                                <td className="px-5 py-3.5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 uppercase shrink-0">
                                                            {patient.name.slice(0, 2)}
                                                        </div>
                                                        <span className="text-sm font-medium text-slate-800">{patient.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-3.5 text-xs font-mono text-slate-500">{patient.id}</td>
                                                <td className="px-5 py-3.5 text-sm text-slate-500">{patient.age}y / {patient.gender}</td>
                                                <td className="px-5 py-3.5 text-sm text-slate-500">{patient.date}</td>
                                                <td className="px-5 py-3.5">
                                                    <span className={cn(
                                                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                                        sc.className
                                                    )}>
                                                        <span className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />
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
