/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext()
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(()=> {
        return localStorage.getItem('theme') || 'system'
    })

    useEffect(() => {
        const root = document.documentElement
        root.classList.remove( 'light', 'dark')
        const mediaQuery = typeof window.matchMedia === 'function'
            ? window.matchMedia('(prefers-color-scheme: dark)')
            : null

        function applySystemTheme() {
            root.classList.remove('light', 'dark')
            root.classList.add(mediaQuery?.matches ? 'dark' : 'light')
        }

        if (theme === 'system') {
            applySystemTheme()
            mediaQuery?.addEventListener?.('change', applySystemTheme)
        } else {
            root.classList.add(theme)
        }

        localStorage.setItem('theme', theme)

        return () => mediaQuery?.removeEventListener?.('change', applySystemTheme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
  export function useTheme() {
    return useContext(ThemeContext)
  }  
