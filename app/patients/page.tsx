"use client";

import { Search, Filter, MoreHorizontal, Eye, FileText, Plus, UserCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const patients = [
    { id: "PID-001", name: "Ramesh Gupta", age: 45, gender: "Male", date: "Oct 24, 2024", status: "High Risk" },
    { id: "PID-002", name: "Anita Desai", age: 32, gender: "Female", date: "Oct 23, 2024", status: "Normal" },
    { id: "PID-003", name: "Suresh Kumar", age: 58, gender: "Male", date: "Oct 22, 2024", status: "Inconclusive" },
    { id: "PID-004", name: "Meena Patel", age: 29, gender: "Female", date: "Oct 21, 2024", status: "Normal" },
    { id: "PID-005", name: "John Doe", age: 50, gender: "Male", date: "Oct 20, 2024", status: "High Risk" },
    { id: "PID-006", name: "Sarah Williams", age: 41, gender: "Female", date: "Oct 19, 2024", status: "Pending" },
];

const statusConfig: Record<string, { className: string; dot: string }> = {
    "High Risk": { className: "bg-red-50 text-red-700 border-red-100", dot: "bg-red-500" },
    "Normal": { className: "bg-green-50 text-green-700 border-green-100", dot: "bg-green-500" },
    "Inconclusive": { className: "bg-amber-50 text-amber-700 border-amber-100", dot: "bg-amber-500" },
    "Pending": { className: "bg-slate-100 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

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
                    { label: "Total Patients", value: "24", icon: UserCheck, color: "text-blue-600 bg-blue-50 border-blue-100" },
                    { label: "High Risk", value: "2", icon: null, color: "text-red-600 bg-red-50 border-red-100" },
                    { label: "Normal", value: "18", icon: null, color: "text-green-600 bg-green-50 border-green-100" },
                    { label: "Pending", value: "4", icon: null, color: "text-amber-600 bg-amber-50 border-amber-100" },
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

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Patient</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">ID</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Demographics</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Last Scan</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
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
                                                "hover:bg-slate-50/70 transition-colors group",
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
                                            <td className="px-5 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                                                        <Eye size={15} />
                                                    </button>
                                                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Report">
                                                        <FileText size={15} />
                                                    </button>
                                                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                                        <MoreHorizontal size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Showing {filtered.length} of 24 patients</span>
                    <div className="flex gap-1.5">
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40" disabled>
                            Previous
                        </button>
                        <button className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
