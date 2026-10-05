import { useState } from 'react'
import { Check, Moon, Monitor, Sun, Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useTheme } from '../Context/ThemeContext'

const themeOptions = [
    {
        value: 'light',
        label: 'Light',
        description: 'Use the light appearance',
        icon: Sun,
    },
    {
        value: 'dark',
        label: 'Dark',
        description: 'Use the dark appearance',
        icon: Moon,
    },
    {
        value: 'system',
        label: 'System',
        description: 'Follow your device preference',
        icon: Monitor,
    },
]

function Settings() {
    const { theme, setTheme } = useTheme()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="lg:ml-64">
                {/* Mobile header */}
                <header className="flex h-20 items-center gap-4 border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open sidebar"
                        aria-expanded={sidebarOpen}
                        className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    >
                        <Menu size={24} />
                    </button>

                    <span className="text-xl font-bold text-purple-600 dark:text-purple-500">
                        Linkly
                    </span>
                </header>

                <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10">
                    {/* Heading */}
                    <div className="mb-8">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                            Settings
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Settings
                        </h1>

                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Manage your Linkly preferences.
                        </p>
                    </div>

                    {/* Appearance */}
                    <section
                        aria-labelledby="appearance-heading"
                        className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
                    >
                        <div className="mb-6">
                            <h2
                                id="appearance-heading"
                                className="text-lg font-semibold"
                            >
                                Appearance
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                Choose how Linkly should look on your device.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {themeOptions.map((option) => {
                                const Icon = option.icon
                                const isSelected = theme === option.value

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setTheme(option.value)}
                                        aria-pressed={isSelected}
                                        className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                                            isSelected
                                                ? 'border-purple-500 bg-purple-50 dark:border-purple-500 dark:bg-purple-950/30'
                                                : 'border-zinc-200 bg-white hover:border-purple-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-purple-700 dark:hover:bg-zinc-900'
                                        }`}
                                    >
                                        <span
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                                isSelected
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'
                                            }`}
                                        >
                                            <Icon size={20} />
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="block font-medium">
                                                {option.label}
                                            </span>

                                            <span className="mt-1 block text-sm text-zinc-500 dark:text-zinc-400">
                                                {option.description}
                                            </span>
                                        </span>

                                        <span
                                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                                isSelected
                                                    ? 'border-purple-600 bg-purple-600 text-white'
                                                    : 'border-zinc-300 dark:border-zinc-700'
                                            }`}
                                        >
                                            {isSelected && <Check size={14} />}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Settings
