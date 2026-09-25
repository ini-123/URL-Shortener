import { ArrowRight, BarChart3, Check, Link as LinkIcon, MousePointerClick, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const currentYear = new Date().getFullYear()

function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#071426] text-white">
      <Navbar />

      <main>
        <section className="relative border-b border-slate-800">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-28">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1.5 text-xs font-semibold text-purple-300">
                <Sparkles size={14} /> Simple links. Better reach.
              </div>
              <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                Shorten your links.
                <span className="block text-purple-400">Track your clicks.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
                Turn long URLs into clean, memorable links and understand what happens after you share them.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-400">
                  Create your first link <ArrowRight size={17} />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-purple-400 hover:text-white">
                  Sign in
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-500">
                <span className="flex items-center gap-2"><Check size={14} className="text-purple-400" /> Free to get started</span>
                <span className="flex items-center gap-2"><Check size={14} className="text-purple-400" /> Built for sharing</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-8 rounded-full bg-purple-600/10 blur-3xl" />
              <div className="relative rounded-2xl border border-slate-700 bg-[#0b1b30] p-5 shadow-2xl shadow-black/30">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2 text-sm font-semibold"><span className="rounded-md bg-purple-500/15 p-1.5 text-purple-400"><LinkIcon size={15} /></span> Link preview</div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">Live analytics</span>
                </div>
                <div className="mt-6 rounded-xl border border-slate-800 bg-[#08172a] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Your long URL</p>
                  <p className="mt-2 truncate text-sm text-slate-300">https://example.com/your-content</p>
                  <div className="my-5 flex items-center gap-3"><div className="h-px flex-1 bg-slate-800" /><ArrowRight size={15} className="text-purple-400" /><div className="h-px flex-1 bg-slate-800" /></div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-400">Your short link</p>
                  <p className="mt-2 text-lg font-semibold text-white">linkly.com/your-link</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <PreviewStat icon={<MousePointerClick size={14} />} label="Clicks" value="248" />
                  <PreviewStat icon={<BarChart3 size={14} />} label="Rate" value="24.8%" />
                  <PreviewStat icon={<ShieldCheck size={14} />} label="Status" value="Active" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
          <div className="grid gap-4 md:grid-cols-3">
            <Feature icon={<LinkIcon size={19} />} title="Clean, short links" description="Make every URL easier to remember, share, and trust." />
            <Feature icon={<MousePointerClick size={19} />} title="Know what works" description="See clicks and activity so your next share is smarter." />
            <Feature icon={<ShieldCheck size={19} />} title="Ready to share" description="A focused workspace for the links that matter to you." />
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-slate-800 pt-8 sm:flex-row sm:items-center">
            <div><p className="text-sm font-semibold text-slate-200">Start building your link library.</p><p className="mt-1 text-xs text-slate-500">One focused dashboard for every URL.</p></div>
            <Link to="/register" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 transition hover:text-purple-300">Get started <ArrowRight size={16} /></Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 px-6 py-6 sm:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
          <span className="font-semibold tracking-wide text-slate-400">Linkly</span>
          <span>&copy; {currentYear} Linkly. All rights reserved | Group 16 Hajim TSAcademy </span>
        </div>
      </footer>
    </div>
  )
}

function PreviewStat({ icon, label, value }) {
  return <div className="rounded-lg border border-slate-800 bg-[#08172a] p-3"><div className="text-purple-400">{icon}</div><p className="mt-3 text-[10px] text-slate-500">{label}</p><p className="mt-1 text-xs font-semibold text-slate-200">{value}</p></div>
}

function Feature({ icon, title, description }) {
  return <div className="rounded-xl border border-slate-800 bg-[#0b1b30] p-5"><span className="inline-flex rounded-lg bg-purple-500/15 p-2.5 text-purple-400">{icon}</span><h2 className="mt-5 text-sm font-semibold text-white">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{description}</p></div>
}

export default Home