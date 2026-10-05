import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

function getAuthHeaders() {
    const token = localStorage.getItem('linklyToken')

    return {
        Authorization: `Bearer ${token}`,
    }
}

export async function createShortUrl(originalUrl) {
    const response = await axios.post(
        `${API_BASE_URL}/urls/create`,
        { originalUrl },
        { headers: getAuthHeaders() }
    )

    return response.data
}

export async function getMyUrls() {
    const response = await axios.get(
        `${API_BASE_URL}/urls/my-urls`,
        { headers: getAuthHeaders() }
    )

    return response.data
}

export async function getUrlStats(shortCode) {
    const response = await axios.get(
        `${API_BASE_URL}/urls/${shortCode}/stats`,
        { headers: getAuthHeaders() }
    )

    return response.data
}

export async function deleteUrl(shortCode) {
    const response = await axios.delete(
        `${API_BASE_URL}/urls/${shortCode}/delete`,
        { headers: getAuthHeaders() }
    )

    return response.data
}