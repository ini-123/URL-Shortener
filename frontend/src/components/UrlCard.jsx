import { useEffect, useState } from 'react'
import { Copy, ExternalLink, Trash2 } from 'lucide-react'
import { getUrlStats, deleteUrl } from '../services/urlServices'

function UrlCard({ url, onDelete }) {
    const [stats, setStats] = useState(null)
    const [copied, setCopied] = useState(false)
    const shortUrl = `https://url-shortener-woht.onrender.com/${url.shortCode}`
    useEffect(() => {
        const loadStats = async () => {
           try {
               const data = await getUrlStats(url.shortCode)
               console.log('URL STATS RESPONSE:', data)
               setStats(data.data)
            } catch (error) {
              console.error('FAILED TO LOAD STATS:', error)
            }
       }
       loadStats()
    }, [url.shortCode])
    return (
       <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{url.originalUrl}</p>
                  <a
                      href={`https://url-shortener-woht.onrender.com/${url.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block break-all text-lg font-semibold text-purple-600 hover:underline dark:text-purple-400"
                       >
                      {url.shortCode}
                   </a>
               </div>
               <div className="flex shrink-0 items-center gap-2">
                   <button 
                      onClick={async () => {
                          await navigator.clipboard.writeText(shortUrl)
                          setCopied(true)

                          setTimeout(() => {
                              setCopied(false)
                            }, 2000)
                        }}
                       className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:border-purple-500 hover:text-purple-600 
                        dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-purple-400"
                       title={copied ? 'Copied!' : 'Copy link'}
                       >
                      <Copy size={18} />
                    </button>
                    <a
                       href={url.originalUrl}
                       target="_blank"
                       rel="noreferrer"
                       className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:border-purple-500 hover:text-purple-600 
                       dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-purple-400"
                       title="Open original link"> <ExternalLink size={18} />
                   </a>
                   <button
                       onClick={async () => {
                           const confirmed = window.confirm(
                              'Are you sure you want to delete this link?'
                            )

                           if (!confirmed) return

                           try {
                               await deleteUrl(url.shortCode)
                               onDelete()
                            } catch (error) {
                               console.error('FAILED TO DELETE URL:', error)
                            }
                        }}
                       className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:border-red-500 hover:text-red-500 
                       dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-red-400"
                       title="Delete link"> <Trash2 size={18} />
                  </button>
               </div>
           </div>
            <div className="mt-5 flex flex-wrap gap-6 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-500">Clicks</p>
                  <p className="mt-1 font-semibold">{stats ? stats.totalClicks : '...'}</p>
                </div>
                <div>
                   <p className="text-sm text-zinc-500 dark:text-zinc-400">Created</p>
                    <p className="mt-1 font-semibold">
                        {new Date(url.createdAt).toLocaleDateString()}
                   </p>
               </div>
          </div>
       </div>
    )
}

export default UrlCard