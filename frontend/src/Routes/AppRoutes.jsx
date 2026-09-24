import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Login from '../pages/Login'
import Register from '../pages/Register'

function Home() {
    return (
        <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">
            <Navbar />

            <main className="flex min-h-[calc(100vh-73px)] items-center justify-center px-6">
                <div className="text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
                        Welcome to
                    </p>
                    <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                       Linkly
                    </h1>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
                        Create short, simple links and keep track of how they perform.
                    </p>
                </div>
            </main>
        
        </div>
    )
}

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    )
}

export default AppRoutes