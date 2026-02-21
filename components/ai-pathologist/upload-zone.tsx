"use client";

import { UploadCloud, FileImage, X, Loader2 } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnalysisState } from "@/types/prediction";

interface UploadZoneProps {
    onAnalysisStart: () => void;
    onResult: (data: unknown) => void;
    onError: (msg: string) => void;
    onClear: () => void;
    state: AnalysisState;
}

export function UploadZone({ onAnalysisStart, onResult, onError, onClear, state }: UploadZoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const processFile = useCallback(async (file: File) => {
        // Show preview
        const url = URL.createObjectURL(file);
        setPreview(url);
        setFileName(file.name);

        // Call API
        onAnalysisStart();
        try {
            const form = new FormData();
            form.append("file", file);

            const res = await fetch("/api/predict", {
                method: "POST",
                body: form,
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Prediction failed");
            }

            const data = await res.json();
            onResult(data);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Unknown error";
            onError(message);
        }
    }, [onAnalysisStart, onResult, onError]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    }, [processFile]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    }, [processFile]);

    const handleClear = () => {
        setPreview(null);
        setFileName(null);
        if (inputRef.current) inputRef.current.value = "";
        onClear();
    };

    const isLoading = state === "uploading" || state === "analyzing";

    return (
        <div className="flex flex-col gap-3 h-full min-h-0">
            {/* Drop Zone — flex-1 + min-h-0 locks it to available height */}
            <div
                style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-sm)",
                }}
                className={cn(
                    "relative flex-1 min-h-0 rounded-xl overflow-hidden cursor-pointer",
                    !preview && "border-2 border-dashed flex flex-col items-center justify-center text-center",
                    !preview && (isDragOver ? "border-blue-500" : "border-gray-200 hover:border-blue-400"),
                )}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
                onDrop={handleDrop}
                onClick={() => !preview && inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/tiff,image/bmp"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {preview ? (
                    <>
                        {/* Image fills box absolutely — never pushes layout */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Uploaded slide"
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                padding: "12px",
                            }}
                        />

                        {/* Loading overlay */}
                        {isLoading && (
                            <div
                                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                                style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
                            >
                                <Loader2 className="text-white animate-spin" size={40} />
                                <p className="text-sm font-medium text-white">Analyzing slide...</p>
                                <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Running AI inference</p>
                            </div>
                        )}

                        {/* Clear button */}
                        {!isLoading && (
                            <button
                                onClick={(e) => { e.stopPropagation(); handleClear(); }}
                                className="absolute top-3 right-3 p-1.5 rounded-full shadow-md"
                                style={{
                                    background: "var(--bg-elevated)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <X size={15} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="p-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <UploadCloud size={32} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                            Upload Biopsy Slide
                        </h3>
                        <p className="mb-6 max-w-sm text-sm" style={{ color: "var(--text-muted)" }}>
                            Drag and drop your microscopic slide (100x/400x) here, or click to browse.
                        </p>
                        <button
                            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                        >
                            Select File
                        </button>
                        <div className="mt-8 flex items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
                            <span className="flex items-center gap-1"><FileImage size={14} /> JPG</span>
                            <span className="flex items-center gap-1"><FileImage size={14} /> PNG</span>
                            <span className="flex items-center gap-1"><FileImage size={14} /> TIFF</span>
                        </div>
                    </div>
                )}
            </div>

            {/* File info bar */}
            {fileName && (
                <div
                    className="rounded-lg px-4 py-2.5 flex items-center gap-3 shrink-0"
                    style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border)",
                        boxShadow: "var(--shadow-sm)",
                    }}
                >
                    <FileImage size={16} className="text-blue-500 shrink-0" />
                    <span className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
                        {fileName}
                    </span>
                    {isLoading && <Loader2 size={15} className="text-blue-500 animate-spin ml-auto shrink-0" />}
                    {state === "done" && <span className="ml-auto text-xs font-medium shrink-0" style={{ color: "var(--success)" }}>✓ Analysis complete</span>}
                    {state === "error" && <span className="ml-auto text-xs font-medium shrink-0" style={{ color: "var(--danger)" }}>✗ Error</span>}
                </div>
            )}
        </div>
    );
}
