export interface PredictionResult {
    class: string;
    confidence: number;
    probabilities: Record<string, number>;
}

export type AnalysisState = "idle" | "uploading" | "analyzing" | "done" | "error";
