import { useEffect, useState } from 'react'
import { Menu, Link as LinkIcon, Copy, MousePointerClick } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import UrlCard from '../components/UrlCard'
import { createShortUrl, getMyUrls, deleteUrl } from '../services/urlServices'

function Dashboard() { 
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [originalUrl, setOriginalUrl] = useState('')
    const [urls, setUrls] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [ error, setError ] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    useEffect(() => {
       const loadUrls = async () => {
          try {
              const data = await getMyUrls()
              console.log('MY URLS RESPONSE:', data)
              setUrls(data.data)
            } catch (error) {
               console.error('FAILED TO LOAD URLS:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadUrls()
    }, [])
    const handleShortenUrl = async () => {
        if (!originalUrl.trim()) {
           setError('Please enter a URL.')
            return
        }

       try {
          setError('')
          setIsSubmitting(true)

          await createShortUrl(originalUrl)

          const data = await getMyUrls()
          setUrls(data.data)

          setOriginalUrl('')
        } catch (error) {
           console.error('FAILED TO SHORTEN URL:', error)
           setError(
              error.response?.data?.message || 'Failed to shorten URL. Please try again.'
            )
        } finally {
          setIsSubmitting(false)
        }
    }
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>

            {/* Main content */}
            <main className="lg:ml-64">
                {/* Mobile header */}
                <header className="flex h-20 items-center border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 
                    dark:bg-zinc-950 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900">
                        <Menu size={24} />
                    </button>
                    <div className="ml-4 flex items-center gap-2 text-xl font-bold text-purple-600 dark:text-purple-500">
                        <LinkIcon size={22} /> Linkly
                    </div>
                </header>
                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">

                    {/* Heading */}
                    <div className="mb-8">
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Dashboard</p>
                        <h1 className="mt-1 text-3xl font-bold">Welcome back 👋</h1>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage your links and track their performance.</p>
                    </div>

                    {/* Create URL */}
                    <section className="rounded-2xl bg-purple-600 p-6 shadow-lg">
                        <div className="flex items-center gap-3 text-white">
                            <LinkIcon size={24} />
                            <h2 className="text-xl font-semibold">Create a short link</h2>
                        </div>
                        <div className="mt-5">
                            <div className= "flex flex-col gap-3 md:flex-row">
                                <input
                                    type="url"
                                    value={originalUrl}
                                    onChange={(e) => setOriginalUrl(e.target.value)}
                                    placeholder="Paste your long URL here..."
                                    className="min-w-0 flex-1 rounded-lg border-0 bg-white px-4 py-3 text-zinc-900 outline-none 
                                    placeholder:text-zinc-400 focus:ring-2 focus:ring-white/40"
                               />
                               <button
                                  onClick={handleShortenUrl} 
                                  disabled={isSubmitting}
                                  className="rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-900"
                                  >
                                   {isSubmitting ? 'Shortening...' : 'Shorten URL'}
                                </button>
                                {error && (
                                  <p className="mt-2 text-sm text-white">{error}</p>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Stats */}
                    <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                    <LinkIcon size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Links</p>
                                <p className="mt-1 text-2xl font-bold">{urls.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                    <MousePointerClick size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Clicks</p>
                                    <p className="mt-1 text-2xl font-bold">{urls.reduce((total, url) => total + url.clicks.length, 0)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                    <Copy size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Recent Links</p>
                                    <p className="mt-1 text-2xl font-bold">{urls.length}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* URLs */}
                    <section className="mt-10">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">Your links</h2>
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Manage your shortened URLs.</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {isLoading ? (
                               <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading your links...</p>
                            ) : urls.length === 0 ? (
                                <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-950">
                                    <p className="font-medium">You haven't created any links yet.</p>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Create your first short link above.</p>
                                </div>
                            ) : (
                                urls.map((url) => (
                                    <UrlCard
                                        key={url._id}
                                        url={url}
                                        onDelete={() =>
                                            setUrls(urls.filter((item) => item._id !== url._id))
                                        }
                                    />
                                ))
                            )}
                       </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default Dashboard