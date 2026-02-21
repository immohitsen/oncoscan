"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, FileText, Search, Activity, Sparkles, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: 'bot' | 'user';
    content: string;
}

const quickActions = [
    { label: "Draft Pathology Report", icon: FileText, prompt: "Draft a pathology report for patient PID-005 with findings of severe dysplasia." },
    { label: "Search NCCN Guidelines", icon: Search, prompt: "What are the latest NCCN guidelines for oral leukoplakia management?" },
    { label: "Summarize Patient Case", icon: Activity, prompt: "Summarize the clinical history for Patient Ramesh Gupta (PID-001)." },
];

const botResponses: Record<string, string> = {
    report: "**DRAFT PATHOLOGY REPORT**\n\n**Patient ID:** PID-005\n**Specimen:** Left Buccal Mucosa Biopsy\n**Microscopic Description:** Sections show stratified squamous epithelium with severe dysplasia extending into the upper third of the epithelium. No invasion of the basement membrane is noted.\n**Diagnosis:** Severe Epithelial Dysplasia.\n**Recommendation:** Complete excision recommended. Follow-up in 6 weeks.",
    guidelines: "According to **NCCN Guidelines for Head and Neck Cancers (v2.2024)**:\n\nFor **Oral Leukoplakia**:\n1. Biopsy is mandatory to rule out malignancy.\n2. If no dysplasia: Eliminate risk factors (tobacco/alcohol) and follow up every 3–6 months.\n3. If mild/moderate dysplasia: Surgical excision or laser ablation preferred.\n4. If severe dysplasia: Treat as carcinoma in situ.\n\n*Would you like me to pull up the full PDF reference?*",
    summarize: "**Patient Summary: Ramesh Gupta (PID-001)**\n- **Age:** 45M | Chronic smoker (20 years)\n- **Jan 2023:** White patch noted on right tongue lateral border.\n- **June 2023:** Biopsy confirmed Hyperkeratosis (Benign).\n- **Current:** New lesion detected on left cheek. Urgent biopsy scheduled.\n\n**Risk Level:** High — recommend expedited review.",
    default: "I can help with that. Could you provide more specific details about the patient or the clinical context you need assistance with?",
};

function getResponse(text: string): string {
    const t = text.toLowerCase();
    if (t.includes("report") || t.includes("findings") || t.includes("draft")) return botResponses.report;
    if (t.includes("guideline") || t.includes("nccn") || t.includes("leukoplakia")) return botResponses.guidelines;
    if (t.includes("summarize") || t.includes("summary") || t.includes("ramesh") || t.includes("pid-001")) return botResponses.summarize;
    return botResponses.default;
}

export default function MitraBotPage() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'bot',
            content: "Hello Dr. Rajesh. I'm ready to assist with case documentation, guideline retrieval, and diagnostic support. How can I help today?"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = (text: string = input) => {
        if (!text.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'bot',
                content: getResponse(text),
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1200);
    };

    const handleClear = () => {
        setMessages([{
            id: Date.now().toString(),
            role: 'bot',
            content: "Chat cleared. How can I assist you, Dr. Rajesh?"
        }]);
    };

    return (
        <div
            style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
            }}
            className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Header */}
            <div
                style={{
                    borderBottom: "1px solid var(--border)",
                }}
                className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-sm">
                        <Sparkles size={17} />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">Mitra AI Assistant</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                            <p className="text-xs text-slate-400">Clinical Pathology Support · v2.4</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleClear}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                        <Trash2 size={13} /> Clear
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-100">
                        <Download size={13} /> Export
                    </button>
                </div>
            </div>

            {/* Chat Area */}
            <div
                style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                }}
                className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={cn(
                            "flex gap-3 max-w-[88%]",
                            msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div
                            style={{
                                background: "var(--bg-elevated)",
                                border: "1px solid var(--border)",
                                color: "var(--text-primary)",
                            }}
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                                msg.role === 'bot'
                                    ? "bg-white text-indigo-600 border border-slate-200 shadow-sm"
                                    : "bg-indigo-600 text-white shadow-sm"
                            )}>
                            {msg.role === 'bot' ? <Bot size={15} /> : <User size={15} />}
                        </div>
                        <div
                            style={{
                                background: "var(--bg-elevated)",
                                border: "1px solid var(--border)",
                                color: "var(--text-primary)",
                            }} className={cn(
                                "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap",
                                msg.role === 'bot'
                                    ? "bg-white text-slate-700 border border-slate-100 rounded-tl-none"
                                    : "bg-indigo-600 text-white rounded-tr-none"
                            )}>
                            {msg.content}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div
                        style={{
                            background: "var(--bg-elevated)",
                            border: "1px solid var(--border)",
                            color: "var(--text-primary)",
                        }} className="flex gap-3 max-w-[88%]">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white text-indigo-600 border border-slate-200 shadow-sm">
                            <Bot size={15} />
                        </div>
                        <div
                            style={{
                                background: "var(--bg-secondary)",
                                border: "1px solid var(--border)",
                                color: "var(--text-primary)",
                            }} className="bg-white border border-slate-100 px-4 py-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div
                style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                }} className="px-5 py-4 border-t border-slate-100 bg-white space-y-3 shrink-0">
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2">
                    {quickActions.map((action) => (
                        <button
                            key={action.label}
                            onClick={() => handleSend(action.prompt)}
                            disabled={isTyping}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg text-xs font-medium text-slate-600 hover:text-indigo-700 transition-all disabled:opacity-50"
                        >
                            <action.icon size={13} className="text-indigo-500" />
                            {action.label}
                        </button>
                    ))}
                </div>

                {/* Text Input */}
                <div className="flex items-end gap-2">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder="Ask Mitra to draft reports, search guidelines, or summarize cases..."
                        className="flex-1 pl-4 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-50 rounded-xl outline-none text-sm text-slate-700 placeholder-slate-400 resize-none min-h-[44px] max-h-[120px]"
                        rows={1}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shrink-0"
                    >
                        <Send size={18} />
                    </button>
                </div>

                <p className="text-center text-[10px] text-slate-400">
                    Mitra AI generates responses based on available clinical data. Verify all outputs before finalizing reports.
                </p>
            </div>
        </div>
    );
}
