import { useState } from 'react'

function UrlForm({ onUrlSubmit }) {
    const [url, setUrl] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (url.trim()) {
            onUrlSubmit(url)
            setUrl('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:flex-row">
            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your long URL here..."
                className="min-w-0 flex-1 rounded-lg border-0 bg-white px-4 py-3 text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-purple-500"
                required
            />
            <button
                type="submit"
                className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
                Shorten URL
            </button>
        </form>
    )
}

export default UrlForm