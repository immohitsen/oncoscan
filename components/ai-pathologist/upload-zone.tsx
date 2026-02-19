"use client";

import { UploadCloud, FileImage, X, Loader2 } from "lucide-react";
import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { AnalysisState } from "@/types/prediction";

interface UploadZoneProps {
    onAnalysisStart: () => void;
    onResult: (data: unknown) => void;
    onError: (msg: string) => void;
    state: AnalysisState;
}

export function UploadZone({ onAnalysisStart, onResult, onError, state }: UploadZoneProps) {
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
    };

    const isLoading = state === "uploading" || state === "analyzing";

    return (
        <div className="h-full flex flex-col gap-4">
            {/* Drop Zone */}
            <div
                className={cn(
                    "flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer relative overflow-hidden",
                    isDragOver ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-400 hover:bg-gray-50 bg-white",
                    preview && "border-solid border-gray-200"
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
                        {/* Image Preview */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Uploaded slide"
                            className="w-full h-full object-contain p-4"
                        />
                        {/* Loading overlay */}
                        {isLoading && (
                            <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-3">
                                <Loader2 className="text-blue-600 animate-spin" size={40} />
                                <p className="text-sm font-medium text-gray-700">Analyzing slide...</p>
                                <p className="text-xs text-gray-400">Running AI inference</p>
                            </div>
                        )}
                        {/* Clear button */}
                        {!isLoading && (
                            <button
                                onClick={(e) => { e.stopPropagation(); handleClear(); }}
                                className="absolute top-3 right-3 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-gray-500 hover:text-red-500 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </>
                ) : (
                    <div className="p-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <UploadCloud size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Biopsy Slide</h3>
                        <p className="text-gray-500 mb-6 max-w-sm text-sm">
                            Drag and drop your microscopic slide (100x/400x) here, or click to browse.
                        </p>
                        <button
                            onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Select File
                        </button>
                        <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1"><FileImage size={14} /> JPG</span>
                            <span className="flex items-center gap-1"><FileImage size={14} /> PNG</span>
                            <span className="flex items-center gap-1"><FileImage size={14} /> TIFF</span>
                        </div>
                    </div>
                )}
            </div>

            {/* File info bar */}
            {fileName && (
                <div className="bg-white border border-gray-100 rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
                    <FileImage size={18} className="text-blue-500 shrink-0" />
                    <span className="text-sm text-gray-700 font-medium truncate">{fileName}</span>
                    {isLoading && <Loader2 size={16} className="text-blue-500 animate-spin ml-auto shrink-0" />}
                    {state === "done" && <span className="ml-auto text-xs text-green-600 font-medium shrink-0">✓ Analysis complete</span>}
                    {state === "error" && <span className="ml-auto text-xs text-red-600 font-medium shrink-0">✗ Error</span>}
                </div>
            )}
        </div>
    );
}
