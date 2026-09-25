import { useState } from 'react'
import { ArrowLeft, Link as LinkIcon, LogOut, Menu, Search, ShieldCheck, Trash2, UserPlus, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/useAuth'

const initialUsers = [
	{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', links: 12, joined: 'Sep 24, 2026', status: 'Active' },
	{ id: 2, name: 'Mary Smith', email: 'mary@example.com', role: 'User', links: 8, joined: 'Sep 22, 2026', status: 'Active' },
	{ id: 3, name: 'Admin User', email: 'admin@linkly.com', role: 'Admin', links: 24, joined: 'Sep 18, 2026', status: 'Active' },
	{ id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', links: 5, joined: 'Sep 14, 2026', status: 'Inactive' },
]

function Users() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [users, setUsers] = useState(initialUsers)
	const [query, setQuery] = useState('')
	const [role, setRole] = useState('All roles')
	const navigate = useNavigate()
	const { logout } = useAuth()

	const filteredUsers = users.filter((user) => {
		const matchesQuery = [user.name, user.email].some((value) => value.toLowerCase().includes(query.toLowerCase()))
		return matchesQuery && (role === 'All roles' || user.role === role)
	})

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
				<nav className="flex-1 space-y-1 px-4 py-6"><AdminNavItem to="/admin" label="Overview" /><AdminNavItem to="/admin/users" label="Users" /><AdminNavItem to="/admin/urls" label="All URLs" /><AdminNavItem to="/settings" label="Settings" /></nav>
				<div className="border-t border-zinc-200 p-4 dark:border-slate-800"><button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400 dark:text-slate-400"><LogOut size={18} /> Log out</button></div>
			</aside>

			<main className="lg:ml-64">
				<header className="flex h-20 items-center border-b border-zinc-200 bg-white px-5 dark:border-slate-800 dark:bg-[#0b1b30] lg:px-10"><button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden" aria-label="Open navigation"><Menu size={22} /></button><div className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-purple-500/20 text-sm font-semibold text-purple-300">AU</div></header>

				<div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
					<NavLink to="/admin" className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 transition hover:text-purple-500 dark:text-slate-500"><ArrowLeft size={14} /> Back to overview</NavLink>
					<div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-500">Management</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Users</h1><p className="mt-2 text-sm text-zinc-500 dark:text-slate-400">Manage Linkly accounts and access.</p></div><button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"><UserPlus size={16} /> Add user</button></div>

					<section className="mt-8 grid gap-4 sm:grid-cols-3"><UserStat label="Total users" value={users.length} /><UserStat label="Active users" value={users.filter((user) => user.status === 'Active').length} /><UserStat label="Administrators" value={users.filter((user) => user.role === 'Admin').length} /></section>

					<div className="mt-7 flex flex-col gap-3 sm:flex-row"><div className="flex flex-1 items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-[#0b1b30]"><Search size={17} className="shrink-0 text-zinc-400 dark:text-slate-500" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name or email..." className="min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-white dark:placeholder:text-slate-600" /></div><select value={role} onChange={(event) => setRole(event.target.value)} className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none dark:border-slate-800 dark:bg-[#0b1b30] dark:text-slate-300"><option>All roles</option><option>User</option><option>Admin</option></select></div>

					<section className="mt-5 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-slate-800 dark:bg-[#0b1b30]"><div className="hidden grid-cols-[1.4fr_1.5fr_90px_90px_120px_44px] gap-4 border-b border-zinc-200 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 dark:border-slate-800 dark:text-slate-500 md:grid"><span>User</span><span>Email</span><span>Role</span><span>Links</span><span>Joined</span><span /></div>{filteredUsers.length === 0 ? <div className="px-5 py-14 text-center text-sm text-zinc-500 dark:text-slate-500">No users match your search.</div> : filteredUsers.map((user) => <div key={user.id} className="grid gap-3 border-b border-zinc-100 p-5 last:border-0 dark:border-slate-800 md:grid-cols-[1.4fr_1.5fr_90px_90px_120px_44px] md:items-center md:gap-4 md:px-5 md:py-4"><div className="flex items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-xs font-semibold text-purple-400">{user.name.split(' ').map((part) => part[0]).join('')}</span><span className="text-sm font-medium">{user.name}</span></div><p className="truncate text-sm text-zinc-600 dark:text-slate-300">{user.email}</p><span className={`w-fit rounded-full px-2 py-1 text-[10px] font-semibold ${user.role === 'Admin' ? 'bg-purple-500/15 text-purple-400' : 'bg-zinc-100 text-zinc-600 dark:bg-slate-800 dark:text-slate-400'}`}>{user.role}</span><span className="text-xs text-zinc-500 dark:text-slate-400">{user.links} links</span><span className="text-xs text-zinc-500 dark:text-slate-500">{user.joined}</span><button type="button" onClick={() => setUsers((currentUsers) => currentUsers.filter((item) => item.id !== user.id))} className="rounded-md p-2 text-zinc-400 transition hover:bg-red-500/10 hover:text-red-400 md:justify-self-end" aria-label={`Delete ${user.name}`}><Trash2 size={15} /></button></div>)}</section>
				</div>
			</main>
		</div>
	)
}

function AdminNavItem({ to, label }) {
	return <NavLink to={to} end={to === '/admin'} className={({ isActive }) => `block rounded-lg px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-purple-600 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-purple-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-purple-400'}`}>{label}</NavLink>
}

function UserStat({ label, value }) {
	return <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-slate-800 dark:bg-[#0b1b30]"><p className="text-xs text-zinc-500 dark:text-slate-400">{label}</p><p className="mt-3 text-2xl font-bold">{value}</p></div>
}

export default Users
