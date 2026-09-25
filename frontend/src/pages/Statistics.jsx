import { useState } from 'react'
import { BarChart3, CalendarDays, ChevronDown, Link as LinkIcon, Menu, MousePointerClick, TrendingUp } from 'lucide-react'
import Sidebar from '../components/Sidebar'

function Statistics() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [range, setRange] = useState('Last 7 days')
	const activity = [42, 58, 45, 72, 61, 88, 76]
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

	return (
		<div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#071426] dark:text-white">
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<main className="lg:ml-64">
				<header className="flex h-20 items-center border-b border-zinc-200 bg-white px-6 dark:border-slate-800 dark:bg-[#0b1b30] lg:hidden">
					<button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-zinc-600 transition hover:bg-zinc-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Open navigation"><Menu size={22} /></button>
					<div className="ml-4 flex items-center gap-2 text-lg font-bold text-purple-500"><LinkIcon size={20} /> Linkly</div>
				</header>

				<div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
					<div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
						<div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-500">Analytics</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Link statistics</h1><p className="mt-2 text-sm text-zinc-500 dark:text-slate-400">Understand how your shortened links are performing.</p></div>
						<div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-500"><CalendarDays size={15} /> September 25, 2026</div>
					</div>

					<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						<StatCard label="Total clicks" value="1,248" detail="18.2% from last period" icon={<MousePointerClick size={19} />} />
						<StatCard label="Total links" value="12" detail="3 created this period" icon={<LinkIcon size={19} />} />
						<StatCard label="Average click rate" value="24.8%" detail="Across all active links" icon={<BarChart3 size={19} />} />
						<StatCard label="Best performing" value="Ab12x" detail="124 total clicks" icon={<TrendingUp size={19} />} />
					</section>

					<section className="mt-7 grid gap-6 xl:grid-cols-[1.5fr_0.8fr]">
						<div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1b30] sm:p-6">
							<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start"><div><h2 className="font-semibold">Click activity</h2><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500">Daily clicks across all your links</p></div><label className="relative"><span className="sr-only">Select date range</span><select value={range} onChange={(event) => setRange(event.target.value)} className="appearance-none rounded-lg border border-zinc-200 bg-zinc-50 py-2 pl-3 pr-8 text-xs font-medium text-zinc-600 outline-none dark:border-slate-700 dark:bg-[#08172a] dark:text-slate-300"><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option></select><ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400" /></label></div>
							<div className="mt-8 flex h-56 items-end gap-2 border-b border-zinc-200 px-1 dark:border-slate-800 sm:gap-4">{activity.map((height, index) => <div key={days[index]} className="group flex h-full flex-1 flex-col items-center justify-end gap-3"><div className="relative w-full max-w-10 rounded-t-md bg-purple-500/80 transition group-hover:bg-purple-400" style={{ height: `${height}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-[#071426] px-1.5 py-1 text-[10px] text-white group-hover:block">{height}</span></div><span className="text-[10px] text-zinc-500 dark:text-slate-500">{days[index]}</span></div>)}</div>
							<div className="mt-4 flex items-center gap-2 text-xs text-emerald-400"><TrendingUp size={14} /> 18.2% compared with the previous period</div>
						</div>

						<div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1b30] sm:p-6"><h2 className="font-semibold">Traffic sources</h2><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500">Where your visitors come from</p><div className="mt-7 space-y-5"><SourceRow label="Direct" value="48%" width="48%" color="bg-purple-500" /><SourceRow label="Social media" value="31%" width="31%" color="bg-purple-400" /><SourceRow label="Search" value="14%" width="14%" color="bg-purple-300" /><SourceRow label="Other" value="7%" width="7%" color="bg-purple-200" /></div></div>
					</section>

					<section className="mt-7 rounded-xl border border-zinc-200 bg-white dark:border-slate-800 dark:bg-[#0b1b30]"><div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-slate-800"><div><h2 className="font-semibold">Top performing links</h2><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500">Your most clicked URLs for {range.toLowerCase()}</p></div><span className="text-xs text-purple-500">12 total links</span></div><div className="hidden grid-cols-[1.5fr_1fr_100px_120px] gap-4 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-slate-500 md:grid"><span>Short URL</span><span>Original URL</span><span>Clicks</span><span>Created</span></div>{[['linkly.com/Ab12x', 'example.com/launch', '124', 'Today'], ['linkly.com/Xy45p', 'example.com/project', '68', 'Yesterday'], ['linkly.com/Qr91k', 'example.com/product', '42', 'Sep 18, 2026']].map(([shortUrl, originalUrl, clicks, created]) => <div key={shortUrl} className="grid gap-2 border-t border-zinc-100 px-5 py-4 first:border-0 dark:border-slate-800 md:grid-cols-[1.5fr_1fr_100px_120px] md:items-center md:gap-4"><span className="text-sm font-semibold text-purple-500">{shortUrl}</span><span className="truncate text-sm text-zinc-600 dark:text-slate-300">{originalUrl}</span><span className="text-sm text-zinc-600 dark:text-slate-400">{clicks}</span><span className="text-xs text-zinc-500 dark:text-slate-500">{created}</span></div>)}</section>
				</div>
			</main>
		</div>
	)
}

function StatCard({ label, value, detail, icon }) {
	return <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1b30]"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-zinc-500 dark:text-slate-400">{label}</p><p className="mt-3 text-2xl font-bold">{value}</p></div><span className="rounded-lg bg-purple-500/15 p-2.5 text-purple-400">{icon}</span></div><p className="mt-5 text-xs text-zinc-500 dark:text-slate-500">{detail}</p></div>
}

function SourceRow({ label, value, width, color }) {
	return <div><div className="mb-2 flex items-center justify-between text-xs"><span className="text-zinc-600 dark:text-slate-300">{label}</span><span className="font-semibold text-zinc-700 dark:text-slate-300">{value}</span></div><div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-slate-800"><div className={`h-full rounded-full ${color}`} style={{ width }} /></div></div>
}

export default Statistics
