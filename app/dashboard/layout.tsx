
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />
            <div className="md:ml-64 flex flex-col min-h-screen">
                <Header />
                <main
                    style={{
                        background: "var(--bg-elevated)",
                    }}
                    className="flex-1 p-5 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
