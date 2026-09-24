import { NavLink } from 'react-router-dom'
import {BarChart3, Home, Link as LinkIcon, Settings, LogOut, X,} from 'lucide-react'

function Sidebar({ isOpen, onClose }) {
    const navItems = [
        {
         name: 'Dashboard',
         path: '/dashboard',
         icon: Home,
        },
        {
          name: 'Statistics',
          path: '/statistics',
          icon: BarChart3,
        },
        {
          name: 'Settings',
          path: '/settings',
          icon: Settings,
        },
    ]

  return (
      <>
          {/* Mobile overlay */}
          {isOpen && (
              <div
                 onClick={onClose}
                 className="fixed inset-0 z-40 bg-black/60 lg:hidden"
                />
            )}
           <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-zinc-200 bg-white transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-950 ${
                   isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`} >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-zinc-200 px-6 dark:border-zinc-800">
                   <NavLink
                      to="/"
                       className="flex items-center gap-2 text-2xl font-bold text-purple-600 dark:text-purple-500">
                        <LinkIcon size={25} /> Linkly
                  </NavLink>
                  <button
                     onClick={onClose}
                     className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 lg:hidden">
                      <X size={20} />
                  </button>
               </div>
                {/* Navigation */}
                <nav className="flex-1 space-y-2 px-4 py-6">
                    {navItems.map((item) => { const Icon = item.icon
                        return (
                           <NavLink
                             key={item.path}
                             to={item.path}
                             onClick={onClose}
                             className={({ isActive }) =>
                                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                                      isActive
                                      ? 'bg-purple-600 text-white'
                                      : 'text-zinc-600 hover:bg-zinc-100 hover:text-purple-600 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-purple-400'
                                    }`
                                } >
                                <Icon size={20} /> {item.name}
                           </NavLink>
                        )
                    })}
               </nav>

               {/* Bottom */}
               <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
                  <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-red-500 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-red-400">
                     <LogOut size={20} />
                      Log out
                  </button>
               </div>
           </aside>
       </>
    )
}

export default Sidebar

