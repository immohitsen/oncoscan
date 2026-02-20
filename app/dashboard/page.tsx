"use client";

import { Activity, Users, AlertTriangle, Clock, ArrowRight, Bot } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { ActivityTable } from "@/components/dashboard/activity-table";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

export default function Dashboard() {
    const { user } = useUser();
    const firstName = user?.name?.split(" ").find(w => !w.toLowerCase().startsWith("dr")) ?? user?.name ?? "Doctor";

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">{getGreeting()}, {firstName} 👋</h1>
                    <p className="text-sm text-slate-500 mt-0.5">Here&apos;s what&apos;s happening in your lab today.</p>
                </div>
                <Link
                    href="/dashboard/ai-pathologist"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm"
                >
                    Upload New Scan
                    <ArrowRight size={15} />
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Slides Analyzed Today"
                    value="—"
                    icon={Activity}
                    description="No scans yet today"
                    color="blue"
                />
                <StatsCard
                    title="High Risk Detected"
                    value="0"
                    icon={AlertTriangle}
                    description="No high-risk cases"
                    color="red"
                />
                <StatsCard
                    title="Pending Reviews"
                    value="0"
                    icon={Users}
                    description="All clear"
                    color="amber"
                />
                <StatsCard
                    title="Avg. Turnaround"
                    value="—"
                    icon={Clock}
                    description="Run a scan to see metrics"
                    color="green"
                />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                    <OverviewChart />
                </div>

                <div className="space-y-4">
                    {/* Quick Actions */}
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-900 mb-3">Quick Actions</h3>
                        <div className="space-y-2">
                            <Link
                                href="/dashboard/ai-pathologist"
                                className="flex items-center justify-between w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                            >
                                Upload New Scan
                                <ArrowRight size={15} />
                            </Link>
                            <Link
                                href="/dashboard/patients"
                                className="flex items-center justify-between w-full px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-sm font-medium"
                            >
                                View Patient Records
                                <ArrowRight size={15} className="text-slate-400" />
                            </Link>
                        </div>
                    </div>

                    {/* Mitra AI Card */}
                    <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-5 rounded-xl shadow-md text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
                        <div className="relative">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Bot size={15} className="text-white" />
                                </div>
                                <span className="text-sm font-semibold">Mitra AI</span>
                            </div>
                            <p className="text-blue-100 text-xs leading-relaxed mb-4">
                                Ask me to draft reports, summarize patient cases, or search clinical guidelines.
                            </p>
                            <Link
                                href="/dashboard/mitra-bot"
                                className="inline-flex items-center gap-1.5 text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg border border-white/20 font-medium"
                            >
                                Chat with Mitra <ArrowRight size={11} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <ActivityTable />
        </div>
    );
}
