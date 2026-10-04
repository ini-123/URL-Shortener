import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* LOGO */}
                <Link
                  to="/"
                  className="text-2xl font-bold text-purple-600 dark:text-purple-500">
                    Linkly
                </Link>
                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                      to="/"
                      className="text-sm font-medium text-zinc-700 transition hover:text-purole-600 dark:text-zinc-300 dark:hover:text-purple-400">
                        Home
                    </Link>

                    <Link
                     to="/login"
                     className="text-sm font-medium text-zinc-700 transition hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400">
                        Login
                    </Link>

                    <Link
                     to="/register"
                     className="rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700">
                        Get Started
                    </Link>
                </div>
                {/* Mobile Menu Button */}
                <button
                   onclick={() => setIsMenuOpen(!isMenuOpen)}
                   className="rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 md:hidden"
                   aria-label="toggle navigation menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-zinc-200 px-6 py-4 dark:border-zinc-800 md:hidden">
                    <div className="flex flex-col gap-4">
                        <Link
                           to="/"
                           onClick={() => setIsMenuOpen(false)}
                           className="text-sm font-medium text-zinc-700 hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400">
                            Home
                        </Link>

                        <Link
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm font-medium text-zinc-700 hover:text-purple-600 dark:text-zinc-300 dark:hover:text-purple-400">
                            Login
                        </Link>
                        <Link
                           to="/register"
                           onClick={() => setIsMenuOpen(false)}
                           className="rounded-lg bg-purple-600 px-5 py-2.5 text-white hover:bg-purple-700">
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
export default Navbar