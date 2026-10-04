import { createContext, useContext, useState } from 'react'
const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('linklyUser')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const login = (userData) => {
       setUser(userData)
       localStorage.setItem('linklyUser', JSON.stringify(userData))
    }
    const logout = () => {
       setUser(null)
       localStorage.removeItem('linklyUser')
       localStorage.removeItem('linklyToken')
    }
    return (
       <AuthContext.Provider
           value={{
              user, login, logout, isAuthenticated: Boolean(user),
            }} >
            {children}
       </AuthContext.Provider>
    )
}

export function useAuth() { return useContext(AuthContext)}