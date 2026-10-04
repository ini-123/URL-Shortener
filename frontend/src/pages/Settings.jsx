import { Check, Moon, Monitor, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
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
   return (
       <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">
           <main className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:px-10">
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
              <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">
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
                                   className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${
                                        isSelected
                                        ? 'border-purple-500 bg-purple-50 dark:border-purple-500 dark:bg-purple-950/30'
                                        : 'border-zinc-200 bg-white hover:border-purple-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-purple-700 dark:hover:bg-zinc-900'
                                    }`} >
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                                           isSelected
                                           ? 'bg-purple-600 text-white'
                                           : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400'
                                        }`} >
                                       <Icon size={20} />
                                   </div>
                                   <div className="min-w-0 flex-1">
                                        <h3 className="font-medium"> {option.label} </h3>
                                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{option.description}</p>
                                   </div>
                                   <div
                                       className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                                            isSelected
                                            ? 'border-purple-600 bg-purple-600 text-white'
                                            : 'border-zinc-300 dark:border-zinc-700'
                                        }`} >
                                        {isSelected && <Check size={14} />}
                                   </div>
                               </button>
                            )
                        })}
                   </div>
               </section>
           </main>
       </div>
    )
}

export default Settings