import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Statistics from '../pages/Statistics'
import Settings from '../pages/Settings'
import ProtectedRoute from '../components/ProtectedRoute'
import AdminDasboard from '../pages/admin/AdminDasboard'
import AllUrls from '../pages/admin/AllUrls'
import Users from '../pages/admin/Users'

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/statistics"
                element={
                    <ProtectedRoute>
                        <Statistics />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute>
                        <Settings />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminDasboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/urls"
                element={
                    <ProtectedRoute>
                        <AllUrls />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute>
                        <Users />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default AppRoutes