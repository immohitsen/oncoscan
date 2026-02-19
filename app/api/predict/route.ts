import { NextRequest, NextResponse } from "next/server";

const FASTAPI_URL = process.env.FASTAPI_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Forward the file to the FastAPI backend
        const upstreamForm = new FormData();
        upstreamForm.append("file", file);

        const response = await fetch(`${FASTAPI_URL}/predict`, {
            method: "POST",
            body: upstreamForm,
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: `FastAPI error: ${errorText}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json(
            { error: `Failed to reach model server: ${message}` },
            { status: 503 }
        );
    }
}
