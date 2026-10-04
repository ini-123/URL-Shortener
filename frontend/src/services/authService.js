import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export async function registerUser(userData) {
    const response = await axios.post( `${API_BASE_URL}/register`,userData)
    return response.data
}
export async function loginUser(credentials) {
    const response = await axios.post(`${API_BASE_URL}/login`,credentials)
    return response.data

}
export async function forgotPassword(email) {
    const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email })
    return response.data
}
export async function resetPassword(token, password) {
    const response = await axios.post(`${API_BASE_URL}/reset-password/${token}`, { password })
    return response.data
}