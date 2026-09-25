import { useState } from 'react'
import { BarChart3, Link as LinkIcon, LogOut, Menu, Settings, ShieldCheck, Trash2, UserRound, Users, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/useAuth'

const recentUsers = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', links: 12, joined: 'Sep 24, 2026' },
	{ id: 2, name: 'Mary Smith', email: 'mary@example.com', role: 'User', links: 8, joined: 'Sep 22, 2026' },
	{ id: 3, name: 'Admin User', email: 'admin@linkly.com', role: 'Admin', links: 24, joined: 'Sep 18, 2026' },
]

const recentUrls = [
	{ id: 1, shortUrl: 'linkly.com/Ab12x', owner: 'John Doe', clicks: 124, created: 'Today' },
	{ id: 2, shortUrl: 'linkly.com/Xy45p', owner: 'Mary Smith', clicks: 68, created: 'Yesterday' },
	{ id: 3, shortUrl: 'linkly.com/Qr91k', owner: 'Admin User', clicks: 42, created: 'Sep 18' },
]

function AdminDasboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const navigate = useNavigate()
	const { logout } = useAuth()

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
					<AdminNavItem to="/admin" icon={<BarChart3 size={18} />} label="Overview" />
					<AdminNavItem to="/admin/users" icon={<Users size={18} />} label="Users" />
					<AdminNavItem to="/admin/urls" icon={<LinkIcon size={18} />} label="All URLs" />
					<AdminNavItem to="/settings" icon={<Settings size={18} />} label="Settings" />
				</nav>
				<div className="border-t border-zinc-200 p-4 dark:border-slate-800"><button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400 dark:text-slate-400"><LogOut size={18} /> Log out</button></div>
			</aside>

			<main className="lg:ml-64">
				<header className="flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-5 dark:border-slate-800 dark:bg-[#0b1b30] lg:px-10">
					<button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden" aria-label="Open navigation"><Menu size={22} /></button>
					<div className="ml-auto flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-semibold">Admin User</p><p className="text-xs text-zinc-500 dark:text-slate-500">Administrator</p></div><div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/20 text-purple-300"><UserRound size={17} /></div></div>
				</header>

				<div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
					<div className="mb-8"><p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-500">Control center</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Admin dashboard</h1><p className="mt-2 text-sm text-zinc-500 dark:text-slate-400">Monitor your Linkly platform at a glance.</p></div>

					<section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						<AdminMetric label="Total users" value="1,204" icon={<Users size={19} />} change="12% this month" />
						<AdminMetric label="Total links" value="8,392" icon={<LinkIcon size={19} />} change="8.4% this month" />
						<AdminMetric label="Total clicks" value="52,481" icon={<BarChart3 size={19} />} change="18% this month" />
						<AdminMetric label="Active today" value="386" icon={<UserRound size={19} />} change="Live users" />
					</section>

					<section className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
						<div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-slate-800 dark:bg-[#0b1b30]
						"><div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-slate-800"><div><h2 className="font-semibold">Recent users</h2><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500">Latest accounts on the platform</p></div><NavLink to="/admin/users" className="text-xs font-semibold text-purple-500 hover:text-purple-400">View all</NavLink></div><div className="divide-y divide-zinc-100 dark:divide-slate-800">{recentUsers.map((user) => <div key={user.id} className="grid grid-cols-[minmax(0,1fr)_70px_85px] items-center gap-3 px-5 py-4"><div className="flex min-w-0 items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-xs font-semibold text-purple-400">{user.name.split(' ').map((part) => part[0]).join('')}</span><div className="min-w-0"><p className="truncate text-sm font-medium">{user.name}</p><p className="truncate text-xs text-zinc-500 dark:text-slate-500">{user.email}</p></div></div><span className="text-xs text-zinc-500 dark:text-slate-400">{user.links} links</span><span className="text-right text-xs text-zinc-500 dark:text-slate-500">{user.joined}</span></div>)}</div></div>

						<div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1b30]"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Platform activity</h2><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500">Link creation this week</p></div><BarChart3 className="text-purple-400" size={20} /></div><div className="mt-8 flex h-36 items-end gap-3 border-b border-zinc-200 px-2 dark:border-slate-800">{[42, 58, 45, 72, 61, 88, 76].map((height, index) => <div key={index} className="group flex flex-1 flex-col items-center gap-2"><div className="w-full rounded-t bg-purple-500/80 transition group-hover:bg-purple-400" style={{ height: `${height}%` }} /><span className="text-[10px] text-zinc-500 dark:text-slate-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span></div>)}</div></div>
					</section>

					<section className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-slate-800 dark:bg-[#0b1b30]"><div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-slate-800"><div><h2 className="font-semibold">Recent URLs</h2><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500">Most recently created short links</p></div><NavLink to="/admin/urls" className="text-xs font-semibold text-purple-500 hover:text-purple-400">View all</NavLink></div><div className="hidden grid-cols-[1fr_1fr_100px_100px_44px] gap-4 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-slate-500 md:grid"><span>Short URL</span><span>Owner</span><span>Clicks</span><span>Created</span><span /></div>{recentUrls.map((url) => <div key={url.id} className="grid gap-2 border-t border-zinc-100 px-5 py-4 first:border-0 dark:border-slate-800 md:grid-cols-[1fr_1fr_100px_100px_44px] md:items-center md:gap-4"><span className="text-sm font-semibold text-purple-500">{url.shortUrl}</span><span className="text-sm text-zinc-600 dark:text-slate-300">{url.owner}</span><span className="text-xs text-zinc-500 dark:text-slate-400">{url.clicks} clicks</span><span className="text-xs text-zinc-500 dark:text-slate-500">{url.created}</span><button type="button" className="hidden justify-self-end rounded-md p-2 text-zinc-400 hover:bg-red-500/10 hover:text-red-400 md:inline-flex" aria-label="Delete URL"><Trash2 size={15} /></button></div>)}</section>
				</div>
			</main>
		</div>
	)
}

function AdminNavItem({ to, icon, label }) {
	return <NavLink to={to} end={to === '/admin'} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/20' : 'text-zinc-600 hover:bg-zinc-100 hover:text-purple-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-purple-400'}`}>{icon}{label}</NavLink>
}

function AdminMetric({ label, value, icon, change }) {
	return <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1b30]"><div className="flex items-start justify-between"><div><p className="text-xs font-medium text-zinc-500 dark:text-slate-400">{label}</p><p className="mt-3 text-2xl font-bold">{value}</p></div><span className="rounded-lg bg-purple-500/15 p-2.5 text-purple-400">{icon}</span></div><p className="mt-5 text-xs text-emerald-400">{change}</p></div>
}

export default AdminDasboard