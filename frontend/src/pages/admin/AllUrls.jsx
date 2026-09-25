import { useState } from 'react'
import { ArrowLeft, Clipboard, Link as LinkIcon, LogOut, Menu, Search, ShieldCheck, Trash2, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/useAuth'

const initialUrls = [
	{ id: 1, shortUrl: 'linkly.com/Ab12x', originalUrl: 'https://www.example.com/very-long-example-link', owner: 'John Doe', clicks: 124, created: 'Sep 25, 2026' },
	{ id: 2, shortUrl: 'linkly.com/Xy45p', originalUrl: 'https://www.example.com/my-important-project', owner: 'Mary Smith', clicks: 68, created: 'Sep 24, 2026' },
	{ id: 3, shortUrl: 'linkly.com/Qr91k', originalUrl: 'https://www.example.com/product-launch', owner: 'Admin User', clicks: 42, created: 'Sep 18, 2026' },
	{ id: 4, shortUrl: 'linkly.com/Km73a', originalUrl: 'https://www.example.com/resources/getting-started', owner: 'John Doe', clicks: 31, created: 'Sep 16, 2026' },
]

function AllUrls() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [urls, setUrls] = useState(initialUrls)
	const [query, setQuery] = useState('')
	const [copiedId, setCopiedId] = useState(null)
	const navigate = useNavigate()
	const { logout } = useAuth()

	const filteredUrls = urls.filter((url) =>
		[url.shortUrl, url.originalUrl, url.owner].some((value) => value.toLowerCase().includes(query.toLowerCase())),
	)

	async function handleCopy(url) {
		await navigator.clipboard.writeText(`https://${url.shortUrl}`)
		setCopiedId(url.id)
		window.setTimeout(() => setCopiedId(null), 1500)
	}

	function handleLogout() {
		logout()
		navigate('/login', { replace: true })
	}

	return (
		<div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#071426] dark:text-white">
			<aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-200 bg-white transition-transform dark:border-slate-800 dark:bg-[#0b1b30] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
				<div className="flex h-20 items-center justify-between border-b border-zinc-200 px-6 dark:border-slate-800">
					<NavLink to="/admin" className="flex items-center gap-2 text-xl font-bold text-purple-500"><span className="rounded-lg bg-purple-500/15 p-2"><LinkIcon size={17} /></span>Linkly</NavLink>
					<button type="button" onClick={() => setSidebarOpen(false)} className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-slate-800 lg:hidden" aria-label="Close navigation"><X size={18} /></button>
				</div>
				<div className="px-5 pt-6"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-500">Workspace</p><p className="mt-2 flex items-center gap-2 text-xs text-zinc-500 dark:text-slate-400"><ShieldCheck size={14} /> Administrator</p></div>
				<nav className="flex-1 space-y-1 px-4 py-6">
					<AdminNavItem to="/admin" label="Overview" />
					<AdminNavItem to="/admin/users" label="Users" />
					<AdminNavItem to="/admin/urls" label="All URLs" />
					<AdminNavItem to="/settings" label="Settings" />
				</nav>
				<div className="border-t border-zinc-200 p-4 dark:border-slate-800"><button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400 dark:text-slate-400"><LogOut size={18} /> Log out</button></div>
			</aside>

			<main className="lg:ml-64">
				<header className="flex h-20 items-center border-b border-zinc-200 bg-white px-5 dark:border-slate-800 dark:bg-[#0b1b30] lg:px-10">
					<button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden" aria-label="Open navigation"><Menu size={22} /></button>
					<div className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/20 text-sm font-semibold text-purple-300">AU</div>
				</header>

				<div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
					<NavLink to="/admin" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-purple-500 dark:text-slate-500"><ArrowLeft size={14} /> Back to overview</NavLink>
					<div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-500">Management</p><h1 className="mt-2 text-3xl font-bold tracking-tight">All URLs</h1><p className="mt-2 text-sm text-zinc-500 dark:text-slate-400">Review and manage every shortened link.</p></div><div className="text-sm text-zinc-500 dark:text-slate-500">{urls.length} total URLs</div></div>

					<div className="mt-8 flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#0b1b30]"><Search size={17} className="shrink-0 text-zinc-400 dark:text-slate-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by URL or owner..." className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-slate-600" /></div>

					<section className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-slate-800 dark:bg-[#0b1b30]">
						<div className="hidden grid-cols-[1fr_1.4fr_120px_110px_100px] gap-4 border-b border-zinc-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:border-slate-800 dark:text-slate-500 md:grid"><span>Short URL</span><span>Original URL</span><span>Owner</span><span>Clicks</span><span className="text-right">Actions</span></div>
						{filteredUrls.length === 0 ? <div className="px-5 py-14 text-center text-sm text-zinc-500 dark:text-slate-500">No URLs match your search.</div> : filteredUrls.map((url) => <div key={url.id} className="grid gap-3 border-b border-zinc-100 p-5 last:border-0 dark:border-slate-800 md:grid-cols-[1fr_1.4fr_120px_110px_100px] md:items-center md:gap-4 md:px-5 md:py-4"><div><p className="text-sm font-semibold text-purple-500">{url.shortUrl}</p><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500 md:hidden">{url.created}</p></div><p className="truncate text-sm text-zinc-600 dark:text-slate-300">{url.originalUrl}</p><p className="text-sm text-zinc-600 dark:text-slate-300">{url.owner}</p><p className="text-xs text-zinc-500 dark:text-slate-400">{url.clicks} clicks</p><div className="flex items-center gap-2 md:justify-end"><button type="button" onClick={() => handleCopy(url)} className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-purple-500 hover:text-purple-500 dark:border-slate-700 dark:text-slate-400" aria-label="Copy URL"><Clipboard size={14} /> <span className="hidden sm:inline">{copiedId === url.id ? 'Copied' : 'Copy'}</span></button><button type="button" onClick={() => setUrls((currentUrls) => currentUrls.filter((item) => item.id !== url.id))} className="rounded-md p-1.5 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400" aria-label="Delete URL"><Trash2 size={15} /></button></div></div>)}
					</section>
				</div>
			</main>
		</div>
	)
}

function AdminNavItem({ to, label }) {
	return <NavLink to={to} end={to === '/admin'} className={({ isActive }) => `block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-purple-600 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-purple-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-purple-400'}`}>{label}</NavLink>
}

export default AllUrls
