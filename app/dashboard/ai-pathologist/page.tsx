"use client";

import { useState, useCallback } from "react";
import { UploadZone } from "@/components/ai-pathologist/upload-zone";
import { ResultsPanel } from "@/components/ai-pathologist/results-panel";
import { PredictionResult, AnalysisState } from "@/types/prediction";

export default function AIPathologistPage() {
    const [state, setState] = useState<AnalysisState>("idle");
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const handleAnalysisStart = useCallback(() => {
        setState("analyzing");
        setResult(null);
        setErrorMsg("");
    }, []);

    const handleResult = useCallback((data: unknown) => {
        setResult(data as PredictionResult);
        setState("done");
    }, []);

    const handleError = useCallback((msg: string) => {
        setErrorMsg(msg);
        setState("error");
    }, []);

    return (
        <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">AI Pathologist</h1>
                    <p className="text-sm text-gray-500">Upload a biopsy slide for instant OSCC detection</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm">
                    <span className={`w-2 h-2 rounded-full ${state === "done" ? "bg-green-500" : state === "error" ? "bg-red-500" : state === "analyzing" ? "bg-yellow-400 animate-pulse" : "bg-gray-300"}`}></span>
                    Model: <span className="font-medium text-gray-600">localhost:8000</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 min-h-0">
                <div className="lg:col-span-7 h-full">
                    <UploadZone
                        state={state}
                        onAnalysisStart={handleAnalysisStart}
                        onResult={handleResult}
                        onError={handleError}
                    />
                </div>
                <div className="lg:col-span-5 h-full">
                    <ResultsPanel
                        result={result}
                        state={state}
                        errorMsg={errorMsg}
                    />
                </div>
            </div>
        </div>
    );
}
