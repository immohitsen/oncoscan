"use client";

import { AlertTriangle, CheckCircle, FileText, Share2, Loader2, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { PredictionResult, AnalysisState } from "@/types/prediction";

interface ResultsPanelProps {
    result: PredictionResult | null;
    state: AnalysisState;
    errorMsg?: string;
}

export function ResultsPanel({ result, state, errorMsg }: ResultsPanelProps) {
    const isOSCC = result?.class?.toLowerCase().includes("oscc") || result?.class?.toLowerCase().includes("malignant");
    const confidencePct = result ? Math.round(result.confidence * 100) : null;

    return (
        <div
            style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
            }}
            className="rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
            <div
                style={{
                    borderBottom: "1px solid var(--border)",
                }}
                className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h3
                    style={{
                        color: "var(--text-primary)",
                    }}
                    className="text-lg font-semibold text-gray-900">Analysis Results</h3>
                {state === "done" && result && (
                    <span className={cn(
                        "text-xs font-semibold px-2.5 py-1 rounded-full",
                        isOSCC ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    )}>
                        {isOSCC ? "⚠ OSCC Detected" : "✓ Normal"}
                    </span>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col overflow-y-auto">
                {/* Idle State */}
                {state === "idle" && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 text-gray-400">
                        <p className="text-sm">Upload a slide to see analysis results here.</p>
                    </div>
                )}

                {/* Loading State */}
                {(state === "uploading" || state === "analyzing") && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="text-blue-500 animate-spin" size={40} />
                        <div className="text-center">
                            <p className="font-medium text-gray-800">Running AI Inference...</p>
                            <p className="text-sm text-gray-400 mt-1">This usually takes 1–3 seconds</p>
                        </div>
                        {/* Animated progress bar */}
                        <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full animate-pulse w-2/3"></div>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {state === "error" && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center">
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                            <AlertTriangle className="text-red-500" size={24} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">Analysis Failed</p>
                            <p className="text-sm text-gray-500 mt-1 max-w-xs">{errorMsg || "Could not connect to the model server. Make sure FastAPI is running on port 8000."}</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-xs text-gray-500 font-mono">
                            http://localhost:8000/predict
                        </div>
                    </div>
                )}

                {/* Results State */}
                {state === "done" && result && (
                    <>
                        {/* Primary Result */}
                        <div className={cn(
                            "rounded-xl p-5 mb-5 border",
                            isOSCC ? "bg-red-50 border-red-100" : "bg-green-50 border-green-100"
                        )}>
                            <p className={cn("text-xs font-semibold uppercase tracking-wider mb-1", isOSCC ? "text-red-500" : "text-green-600")}>
                                Diagnosis
                            </p>
                            <div className="flex items-end justify-between">
                                <h2 className={cn("text-2xl font-bold", isOSCC ? "text-red-700" : "text-green-700")}>
                                    {result.class}
                                </h2>
                                {isOSCC
                                    ? <AlertTriangle className="text-red-500" size={24} />
                                    : <CheckCircle className="text-green-500" size={24} />
                                }
                            </div>
                        </div>

                        {/* Confidence */}
                        <div className="mb-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">Confidence</span>
                                <span className="text-sm font-bold text-gray-900">{confidencePct}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-700", isOSCC ? "bg-red-500" : "bg-green-500")}
                                    style={{ width: `${confidencePct}%` }}
                                />
                            </div>
                        </div>

                        {/* Probabilities Breakdown */}
                        {result.probabilities && Object.keys(result.probabilities).length > 0 && (
                            <div className="mb-5">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Class Probabilities</p>
                                <div className="space-y-3">
                                    {Object.entries(result.probabilities).map(([label, prob]) => {
                                        const pct = Math.round(prob * 100);
                                        const isMal = label.toLowerCase().includes("oscc") || label.toLowerCase().includes("malignant");
                                        return (
                                            <div key={label}>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-700 font-medium">{label}</span>
                                                    <span className="text-gray-500">{pct}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={cn("h-full rounded-full", isMal ? "bg-red-400" : "bg-blue-400")}
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}



                        {/* Actions */}
                        <div className="mt-auto space-y-3">
                            <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                                <FileText size={18} />
                                Generate Detailed Report
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
