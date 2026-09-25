import { useState } from 'react'
import { BarChart3, CalendarDays, Check, Clipboard, Link as LinkIcon, Menu, MousePointerClick, Plus, TrendingUp } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import UrlForm from '../components/UrlForm'

const initialUrls = [
    { id: 1, originalUrl: 'https://www.example.com/very-long-example-link', shortUrl: 'linkly.com/Ab12x', clicks: 124, createdAt: 'Today' },
    { id: 2, originalUrl: 'https://www.example.com/my-important-project', shortUrl: 'linkly.com/Xy45p', clicks: 68, createdAt: 'Yesterday' },
    { id: 3, originalUrl: 'https://www.example.com/product-launch', shortUrl: 'linkly.com/Qr91k', clicks: 42, createdAt: 'Sep 18, 2026' },
]

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [urls, setUrls] = useState(initialUrls)
    const [copiedId, setCopiedId] = useState(null)

    function handleUrlSubmit(originalUrl) {
        const shortCode = Math.random().toString(36).slice(2, 7)
        setUrls((currentUrls) => [{ id: Date.now(), originalUrl, shortUrl: `linkly.com/${shortCode}`, clicks: 0, createdAt: 'Just now' }, ...currentUrls])
    }

    async function handleCopy(url) {
        const shortUrl = url.shortUrl.startsWith('http') ? url.shortUrl : `https://${url.shortUrl}`
        await navigator.clipboard.writeText(shortUrl)
        setCopiedId(url.id)
        window.setTimeout(() => setCopiedId(null), 1500)
    }

    function handleDelete(urlId) {
        setUrls((currentUrls) => currentUrls.filter((url) => url.id !== urlId))
    }

    const totalClicks = urls.reduce((total, url) => total + url.clicks, 0)

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#071426] dark:text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="lg:ml-64">
                <header className="flex h-20 items-center border-b border-zinc-200 bg-white px-6 dark:border-slate-800 dark:bg-[#0b1b30] lg:hidden">
                    <button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-zinc-600 transition hover:bg-zinc-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Open navigation"><Menu size={22} /></button>
                    <div className="ml-4 flex items-center gap-2 text-lg font-bold text-purple-500"><LinkIcon size={20} /> Linkly</div>
                </header>

                <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
                    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-500">Overview</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Good morning, Linkly user</h1><p className="mt-2 text-sm text-zinc-500 dark:text-slate-400">Here&apos;s what&apos;s happening with your links today.</p></div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-500"><CalendarDays size={15} /><span>September 25, 2026</span></div>
                    </div>

                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                        <MetricCard label="Total links" value={urls.length} icon={<LinkIcon size={19} />} detail="12% this month" />
                        <MetricCard label="Total clicks" value={totalClicks.toLocaleString()} icon={<MousePointerClick size={19} />} detail="8.4% this month" />
                        <MetricCard label="Click rate" value="24.8%" icon={<BarChart3 size={19} />} detail="Across all active links" />
                    </section>

                    <section className="mt-7 rounded-xl border border-purple-400/20 bg-gradient-to-br from-purple-700 to-purple-600 p-6 shadow-xl shadow-purple-950/20 sm:p-7">
                        <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-200">Quick action</p><h2 className="mt-2 text-xl font-bold text-white">Shorten your links.</h2><p className="mt-1 text-sm text-purple-100">Turn a long URL into something easy to share.</p></div><span className="hidden rounded-lg bg-white/10 p-3 text-white sm:block"><Plus size={20} /></span></div>
                        <div className="mt-6 rounded-lg bg-black/20 p-2"><UrlForm onUrlSubmit={handleUrlSubmit} /></div>
                    </section>

                    <section className="mt-9">
                        <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-500">Library</p><h2 className="mt-1 text-xl font-bold">Your links</h2></div><span className="text-xs text-zinc-500 dark:text-slate-500">{urls.length} links</span></div>
                        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-slate-800 dark:bg-[#0b1b30]">
                            <div className="hidden grid-cols-[minmax(0,1.8fr)_minmax(130px,1fr)_90px_120px_88px] gap-4 border-b border-zinc-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:border-slate-800 dark:text-slate-500 md:grid"><span>Original URL</span><span>Short URL</span><span>Clicks</span><span>Created</span><span className="text-right">Actions</span></div>
                            {urls.length === 0 ? <div className="px-5 py-12 text-center text-sm text-zinc-500 dark:text-slate-500">No links yet. Create your first short link above.</div> : urls.map((url) => <LinkRow key={url.id} url={url} copied={copiedId === url.id} onCopy={handleCopy} onDelete={handleDelete} />)}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

function MetricCard({ label, value, icon, detail }) {
    return <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1b30]"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-zinc-500 dark:text-slate-400">{label}</p><p className="mt-3 text-3xl font-bold">{value}</p></div><span className="rounded-lg bg-purple-500/15 p-2.5 text-purple-400">{icon}</span></div><p className="mt-5 flex items-center gap-1 text-xs text-emerald-400"><TrendingUp size={14} /> {detail}</p></div>
}

function LinkRow({ url, copied, onCopy, onDelete }) {
    return <div className="grid gap-3 border-b border-zinc-100 p-5 last:border-0 dark:border-slate-800 md:grid-cols-[minmax(0,1.8fr)_minmax(130px,1fr)_90px_120px_88px] md:items-center md:gap-4 md:px-5 md:py-4"><div className="min-w-0"><p className="truncate text-sm font-medium text-zinc-800 dark:text-slate-200">{url.originalUrl}</p><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500 md:hidden">Created {url.createdAt}</p></div><p className="truncate text-sm font-semibold text-purple-600 dark:text-purple-400">{url.shortUrl}</p><p className="text-sm text-zinc-600 dark:text-slate-300"><span className="mr-2 text-xs text-zinc-500 md:hidden">Clicks</span>{url.clicks}</p><p className="hidden text-xs text-zinc-500 dark:text-slate-400 md:block">{url.createdAt}</p><div className="flex items-center justify-start gap-2 md:justify-end"><button type="button" onClick={() => onCopy(url)} className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-purple-500 hover:text-purple-500 dark:border-slate-700 dark:text-slate-400" aria-label="Copy shortened link">{copied ? <Check size={14} /> : <Clipboard size={14} />}<span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span></button><button type="button" onClick={() => onDelete(url.id)} className="rounded-md p-1.5 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400" aria-label="Delete shortened link">&times;</button></div></div>
}

export default Dashboard