import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BarChart3, Check, ClipboardCheck, ShieldCheck, Sparkles } from "lucide-react";

const metrics = [
  { value: "24/7", label: "data visibility" },
  { value: "3x", label: "faster reporting" },
  { value: "100%", label: "traceable records" },
];

const capabilities = [
  {
    icon: ClipboardCheck,
    title: "Capture with confidence",
    description: "Keep every test result, instrument detail, and note in one reliable workspace.",
  },
  {
    icon: BarChart3,
    title: "See the signal",
    description: "Turn routine measurements into clear trends that make changes easy to spot.",
  },
  {
    icon: ShieldCheck,
    title: "Report without friction",
    description: "Create polished, audit-ready reports when your team needs them.",
  },
];

export default function TestTwoPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f0e8] text-[#152b35] selection:bg-[#ef765b] selection:text-white">
      <div className="relative isolate">
        <div className="pointer-events-none absolute -right-32 -top-40 -z-10 h-136 w-136 rounded-full bg-[#f5c9a9] blur-3xl opacity-70" />
        <div className="pointer-events-none absolute -left-72 top-120 -z-10 h-112 w-md rounded-full bg-[#c8ded8] blur-3xl opacity-70" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="ThisOne QC home">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#152b35] text-[#f8c06f] shadow-lg shadow-[#152b35]/15">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-lg font-black tracking-[-0.04em]">ThisOne QC</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold md:flex">
            <a href="#workflow" className="transition-colors hover:text-[#ef765b]">Workflow</a>
            <a href="#capabilities" className="transition-colors hover:text-[#ef765b]">Capabilities</a>
            <a href="#about" className="transition-colors hover:text-[#ef765b]">Why QC</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden px-3 py-2 text-sm font-bold hover:text-[#ef765b] sm:block">Sign in</Link>
            <Link href="/register" className="rounded-full bg-[#ef765b] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#ef765b]/20 transition-transform hover:-translate-y-0.5">Get started</Link>
          </div>
        </nav>

        <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-28 lg:pt-20">
          <div className="max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#152b35]/10 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#ef765b]">
              <span className="h-2 w-2 rounded-full bg-[#ef765b]" />
              Quality control, made visible
            </div>
            <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-[-0.065em] sm:text-7xl">
              Better checks.<br />
              <span className="text-[#ef765b]">Sharper decisions.</span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#152b35]/70">
              A calmer way to manage medical equipment quality data. Capture the detail, understand the trend, and keep your team moving.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#152b35] px-6 py-4 font-bold text-white transition-colors hover:bg-[#234653]">
                Explore the dashboard
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link href="#workflow" className="inline-flex items-center justify-center rounded-full border border-[#152b35]/20 px-6 py-4 font-bold transition-colors hover:border-[#ef765b] hover:text-[#ef765b]">
                See how it works
              </Link>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-[#152b35]/15 pt-6">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <div className="text-2xl font-black tracking-[-0.04em]">{metric.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#152b35]/55">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0 lg:pl-5">
            <div className="absolute -right-2 top-6 z-20 hidden rounded-2xl bg-[#f8c06f] px-5 py-4 shadow-xl shadow-[#152b35]/10 sm:block lg:-right-8">
              <div className="text-3xl font-black tracking-[-0.06em]">+18.4%</div>
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-[#152b35]/60">stable performance</div>
            </div>
            <div className="relative overflow-hidden rounded-4xl border-10 border-[#152b35] bg-[#152b35] shadow-2xl shadow-[#152b35]/25">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef765b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f8c06f]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#9fc9bc]" />
                <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">live workspace</span>
              </div>
              <div className="relative aspect-4/3 overflow-hidden bg-white">
                <Image src="/hero-dashboard.png" alt="ThisOne QC dashboard preview" fill className="object-cover object-top" priority />
              </div>
            </div>
            <div className="absolute -bottom-7 -left-5 z-20 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-[#152b35]/10 sm:-left-8">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c8ded8]"><Check className="h-5 w-5" /></span>
              <div><div className="text-sm font-black">All systems clear</div><div className="text-xs text-[#152b35]/55">Last check, just now</div></div>
            </div>
          </div>
        </section>
      </div>

      <section id="capabilities" className="border-y border-[#152b35]/10 bg-white/55">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ef765b]">One clear view</p>
            <h2 className="mt-3 max-w-sm text-4xl font-black leading-tight tracking-[-0.06em]">The routine work, with more clarity.</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article key={title}>
                <Icon className="h-7 w-7 text-[#ef765b]" strokeWidth={1.8} />
                <h3 className="mt-5 text-lg font-black tracking-[-0.03em]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#152b35]/65">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div id="about" className="flex flex-col justify-between gap-8 rounded-4xl bg-[#152b35] px-7 py-10 text-white sm:px-12 lg:flex-row lg:items-end lg:px-16 lg:py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f8c06f]">Make every measurement count</p>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.06em] sm:text-5xl">Quality data deserves a better home.</h2>
          </div>
          <Link href="/register" className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-[#f8c06f] px-6 py-4 font-black text-[#152b35] transition-colors hover:bg-[#ffd790] lg:self-end">
            Start your workspace <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  );
}