import { useState } from 'react'
import { Laptop, Menu, Moon, Palette, Sun } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../Context/ThemeContext'

function Settings() {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { theme, setTheme } = useTheme()

	return (
		<div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#071426] dark:text-white">
			<Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
			<main className="lg:ml-64">
				<header className="flex h-20 items-center border-b border-zinc-200 bg-white px-6 dark:border-slate-800 dark:bg-[#0b1b30] lg:hidden">
					<button type="button" onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-zinc-600 hover:bg-zinc-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Open navigation"><Menu size={22} /></button>
					<div className="ml-4 text-lg font-bold text-purple-500">Linkly</div>
				</header>
				<div className="mx-auto max-w-5xl px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
					<p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-500">Account</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight">Settings</h1>
					<p className="mt-2 text-sm text-zinc-500 dark:text-slate-400">Manage your Linkly preferences.</p>

					<section className="mt-8 rounded-xl border border-zinc-200 bg-white dark:border-slate-800 dark:bg-[#0b1b30]">
						<div className="border-b border-zinc-200 px-5 py-5 dark:border-slate-800 sm:px-6">
							<div className="flex items-start gap-3"><span className="rounded-lg bg-purple-500/15 p-2.5 text-purple-400"><Palette size={19} /></span><div><h2 className="font-semibold">Appearance</h2><p className="mt-1 text-sm text-zinc-500 dark:text-slate-500">Choose how Linkly looks on this device.</p></div></div>
						</div>
						<div className="flex flex-col gap-5 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><p className="text-sm font-medium">Theme mode</p><p className="mt-1 text-xs text-zinc-500 dark:text-slate-500">System follows your device preference automatically.</p></div><div className="grid grid-cols-3 gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-slate-700 dark:bg-[#08172a]" role="group" aria-label="Theme mode"><ThemeOption value="light" label="Light" icon={<Sun size={15} />} theme={theme} onSelect={setTheme} /><ThemeOption value="dark" label="Dark" icon={<Moon size={15} />} theme={theme} onSelect={setTheme} /><ThemeOption value="system" label="System" icon={<Laptop size={15} />} theme={theme} onSelect={setTheme} /></div></div>
					</section>
				</div>
			</main>
		</div>
	)
}

function ThemeOption({ value, label, icon, theme, onSelect }) {
	return <button type="button" onClick={() => onSelect(value)} aria-pressed={theme === value} className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition ${theme === value ? 'bg-purple-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900 dark:text-slate-400 dark:hover:text-white'}`}>{icon}{label}</button>
}

export default Settings
