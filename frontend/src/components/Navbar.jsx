import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Laptop, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../Context/ThemeContext'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { theme, setTheme } = useTheme()

    return (
        <nav className="border-b border-slate-800 bg-[#071426]">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* LOGO */}
                <Link
                  to="/"
                  className="text-2xl font-bold text-purple-400">
                    Linkly
                </Link>
                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                      to="/"
                      className="text-sm font-medium text-slate-300 transition hover:text-purple-400">
                        Home
                    </Link>

                    <Link
                     to="/login"
                     className="text-sm font-medium text-slate-300 transition hover:text-purple-400">
                        Login
                    </Link>

                    <Link
                     to="/register"
                     className="rounded-lg bg-purple-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-400">
                        Get Started
                    </Link>
                    <ThemeMenu theme={theme} setTheme={setTheme} />
                </div>
                {/* Mobile Menu Button */}
                <button
                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                   className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
                   aria-label="toggle navigation menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-slate-800 px-6 py-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        <Link
                           to="/"
                           onClick={() => setIsMenuOpen(false)}
                           className="text-sm font-medium text-slate-300 hover:text-purple-400">
                            Home
                        </Link>

                        <Link
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm font-medium text-slate-300 hover:text-purple-400">
                            Login
                        </Link>
                        <Link
                           to="/register"
                           onClick={() => setIsMenuOpen(false)}
                           className="rounded-lg bg-purple-500 px-5 py-2.5 text-white hover:bg-purple-400">
                            Get Started
                        </Link>
                        <ThemeMenu theme={theme} setTheme={setTheme} />
                    </div>
                </div>
            )}
        </nav>
    )
}

function ThemeMenu({ theme, setTheme }) {
    return (
        <details className="relative">
            <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-purple-400 hover:text-white">
                {theme === 'light' ? <Sun size={16} /> : theme === 'dark' ? <Moon size={16} /> : <Laptop size={16} />}
                <span className="hidden lg:inline">Theme</span>
            </summary>
            <div className="absolute right-0 top-full z-20 mt-2 w-36 rounded-lg border border-slate-700 bg-[#0b1b30] p-1 shadow-xl">
                <ThemeOption value="light" label="Light" icon={<Sun size={15} />} theme={theme} setTheme={setTheme} />
                <ThemeOption value="dark" label="Dark" icon={<Moon size={15} />} theme={theme} setTheme={setTheme} />
                <ThemeOption value="system" label="Device" icon={<Laptop size={15} />} theme={theme} setTheme={setTheme} />
            </div>
        </details>
    )
}

function ThemeOption({ value, label, icon, theme, setTheme }) {
    return <button type="button" onClick={() => setTheme(value)} className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs transition ${theme === value ? 'bg-purple-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`} aria-pressed={theme === value}>{icon}{label}</button>
}

export default Navbar