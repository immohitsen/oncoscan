import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen transition-colors" style={{ background: "var(--bg)" }}>
            <Sidebar />
            <div className="md:ml-64 flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 p-5 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
