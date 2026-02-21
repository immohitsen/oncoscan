import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Scan,
  Brain,
  ShieldCheck,
  FileSearch,
  Zap,
  ChevronRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div
      style={{ backgroundColor: "#080c14", color: "#f1f5f9" }}
      className="min-h-screen flex flex-col overflow-x-hidden"
    >
      {/* ── NAV ── */}
      <header className="nav-glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-white font-bold text-lg tracking-tight">
              Onco<span className="shimmer-text">Scan</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="hidden sm:flex items-center gap-7 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#stats" className="hover:text-white transition-colors">Results</a>
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="btn-primary-glow px-4 py-2 rounded-lg text-white text-sm font-semibold"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 pt-28 pb-24 overflow-hidden">
        {/* Glow blobs */}
        <div
          className="animate-glow-pulse absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-glow-pulse absolute top-40 -left-32 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(14,165,233,0.13) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-glow-pulse absolute bottom-10 -right-24 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Badge */}
        <div className="animate-fade-in-up badge-glow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold text-cyan-300 mb-6"
          style={{
            background: "rgba(14,165,233,0.1)",
            border: "1px solid rgba(14,165,233,0.3)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          AI-Powered Oral Cancer Detection
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up-1 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08] max-w-4xl mx-auto"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span style={{ color: "#f1f5f9" }}>Clinical-grade</span>
          <br />
          <span className="shimmer-text">AI diagnostics</span>
          <br />
          <span style={{ color: "#f1f5f9" }}>for pathologists.</span>
        </h1>

        {/* Subhead */}
        <p className="animate-fade-in-up-2 mt-7 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          OncoScan fuses deep-learning vision models with your patient data to
          surface early-stage oral cancer with{" "}
          <span className="text-slate-200 font-medium">98%+ accuracy</span> —
          streamlining every step of your diagnostic workflow.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up-3 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="btn-primary-glow flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm"
          >
            Get Started Free
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/login"
            className="btn-outline-glass flex items-center gap-2 px-7 py-3.5 rounded-xl text-slate-200 font-semibold text-sm"
          >
            View Demo
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Trust line */}
        <p className="animate-fade-in-up-4 mt-7 text-xs text-slate-500 tracking-wide">
          Trusted by oncology labs · No credit card required · HIPAA-aware design
        </p>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="py-14 px-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-0 text-center">
          {[
            { value: "98%", label: "Detection Accuracy" },
            { value: "5K+", label: "Scans Processed" },
            { value: "<2s", label: "Analysis Time" },
          ].map((s, i) => (
            <div
              key={i}
              className={`py-4 px-4 ${i !== 0 ? "stat-divider" : ""}`}
            >
              <p
                className="text-3xl sm:text-4xl font-extrabold shimmer-text"
                style={{ letterSpacing: "-0.02em" }}
              >
                {s.value}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
              Everything your lab needs,{" "}
              <span className="shimmer-text">out of the box.</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
              A complete diagnostic toolkit — from DICOM scan ingestion to
              AI-generated reports and multi-patient management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: <Scan className="w-5 h-5 text-cyan-400" />,
                title: "DICOM-ready Viewer",
                desc:
                  "Load and inspect DICOM scans inline — multi-frame, zoom, window-level controls built in.",
                color: "rgba(14,165,233,0.12)",
              },
              {
                icon: <Brain className="w-5 h-5 text-violet-400" />,
                title: "Deep-Learning Analysis",
                desc:
                  "ResNet50-based vision model fine-tuned on oral histopathology classifies lesions with clinical precision.",
                color: "rgba(139,92,246,0.12)",
              },
              {
                icon: <FileSearch className="w-5 h-5 text-blue-400" />,
                title: "Instant PDF Reports",
                desc:
                  "Generate structured PDF pathology reports in one click — ready for records or referrals.",
                color: "rgba(59,130,246,0.12)",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
                title: "Secure Patient Records",
                desc:
                  "Full patient management with encrypted records, audit trails, and role-based access.",
                color: "rgba(16,185,129,0.12)",
              },
              {
                icon: <Zap className="w-5 h-5 text-amber-400" />,
                title: "Sub-2s Inference",
                desc:
                  "FastAPI-powered backend delivers model results in under two seconds — even on CPU.",
                color: "rgba(251,191,36,0.12)",
              },
              {
                icon: <Activity className="w-5 h-5 text-pink-400" />,
                title: "Live Dashboard",
                desc:
                  "Track scans, recent activity, and patient stats from a unified real-time overview.",
                color: "rgba(244,63,94,0.12)",
              },
            ].map((f, i) => (
              <div key={i} className="card-glass rounded-2xl p-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{f.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-20 px-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>
              From scan to result in{" "}
              <span className="shimmer-text">three steps.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Scan",
                desc: "Drag-drop a DICOM or image file directly into the secure viewer.",
              },
              {
                step: "02",
                title: "AI Analyses",
                desc: "Our pathology model processes the scan and surfaces probability scores per lesion class.",
              },
              {
                step: "03",
                title: "Get Report",
                desc: "Download a structured PDF report or save findings directly to the patient record.",
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div
                  className="text-4xl font-extrabold mb-4"
                  style={{
                    background: "linear-gradient(135deg,#0ea5e9,#6366f1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {step.step}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-5">
        <div
          className="max-w-3xl mx-auto rounded-3xl p-10 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(14,165,233,0.1) 0%, rgba(99,102,241,0.15) 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
          }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 65%)",
            }}
          />
          <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">
            Start today
          </p>
          <h2
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            Detect what others miss.
          </h2>
          <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
            Join pathologists already using OncoScan to reduce diagnostic
            turnaround and catch oral cancer at its earliest, most treatable stage.
          </p>
          <Link
            href="/signup"
            className="btn-primary-glow inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold text-sm"
          >
            Create Free Account
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-8 px-5 text-center text-xs text-slate-600"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}
          >
            <Activity className="w-3 h-3 text-white" />
          </div>
          <span className="text-slate-400 font-semibold text-sm">OncoScan</span>
        </div>
        <p>© {new Date().getFullYear()} OncoScan. All rights reserved.</p>
        <p className="mt-1 text-slate-700">
          Built for clinical research · Not an FDA-approved diagnostic device
        </p>
      </footer>
    </div>
  );
}
