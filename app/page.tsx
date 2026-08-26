import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-green-200 text-white selection:bg-emerald-500/30 font-sans overflow-hidden">
      {/* Background glowing orb */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-emerald-600/30 blur-[140px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Activity className="w-8 h-8 text-emerald-400" />
          <span className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-outfit)" }}>
            ThisOne QC
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-medium text-green-900 hover:text-purple-500 hover:underline transition-colors">
            Login
          </Link>
          <Link href="/register" className="text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-black px-5 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-32 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-sm font-medium mb-8 backdrop-blur-md">
          <Zap color="purple" className="w-4 h-4" />
          <span className="text-emerald-950">New: Advanced Trend Analysis Engine</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400 mb-6 leading-[1.1]" style={{ fontFamily: "var(--font-outfit)" }}>
          Input your testing <span className="text-gray-400">data</span>,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
            you can see a <span className="text-gray-400">trend</span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Elevate your quality control with powerful, real-time visualization. Track anomalies, forecast performance, and turn raw data into crystal-clear insights instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] group"
          >
            Start Analyzing
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg text-white bg-white/5 hover:bg-white/10 hover:underline hover:text-fuchsia-500 border border-green-500/20 backdrop-blur-md transition-all"
          >
            View Documentation
          </Link>
        </div>
      </main>

      {/* Hero Image Showcase */}
      <div className="relative max-w-6xl mx-auto px-4 pb-32">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-2 md:p-4 shadow-2xl relative z-0 group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden bg-black/80 ring-1 ring-white/10">
            <Image src="/thisone-qc.png" alt="QC Dashboard Preview" fill className="object-cover object-top opacity-90 transition-transform duration-700 hover:scale-105" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="relative z-10 border-t border-white/10 bg-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-white/[0.07] group cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Seamless Data Input
              </h3>
              <p className="text-gray-400 leading-relaxed">Import your radiografi and QC metrics effortlessly. Our smart parser handles complex XML and spreadsheet formats instantly.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-white/[0.07] group cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Live Trend Analysis
              </h3>
              <p className="text-gray-400 leading-relaxed">Watch your data come alive. Identify patterns and outliers the moment new testing data is registered in the system.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-white/[0.07] group cursor-pointer">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "var(--font-outfit)" }}>
                Quality Assured
              </h3>
              <p className="text-gray-400 leading-relaxed">Generate instant reports and export them to PDF. Keep your stakeholders informed with beautiful, data-rich visuals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
