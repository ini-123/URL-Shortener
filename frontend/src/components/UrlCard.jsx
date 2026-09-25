import { Copy, ExternalLink, Trash2 } from 'lucide-react'

function UrlCard({ url }) {
    return (
       <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">{url.originalUrl}</p>
                  <p className="mt-2 break-all text-lg font-semibold text-purple-600 dark:text-purple-400">{url.shortUrl}</p>
               </div>
               <div className="flex shrink-0 items-center gap-2">
                   <button 
                      className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:border-purple-500 hover:text-purple-600 
                      dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-purple-400"
                      title="Copy link"> <Copy size={18} />
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
                       className="rounded-lg border border-zinc-200 p-2 text-zinc-600 transition hover:border-red-500 hover:text-red-500 
                       dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-red-400"
                       title="Delete link"> <Trash2 size={18} />
                  </button>
               </div>
           </div>
            <div className="mt-5 flex flex-wrap gap-6 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800">
                <div>
                  <p className="text-zinc-500 dark:text-zinc-500">Clicks</p>
                  <p className="mt-1 font-semibold">{url.clicks}</p>
                </div>
                <div>
                   <p className="text-zinc-500 dark:text-zinc-500">Created</p>
                   <p className="mt-1 font-semibold">{url.createdAt}</p>
               </div>
           </div>
       </div>
    )
}

export default UrlCard