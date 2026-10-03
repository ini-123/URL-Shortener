import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Link as LinkIcon, MousePointerClick, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Sidebar from '../components/Sidebar'
import { getMyUrls, getUrlStats } from '../services/urlServices'

function Statistics() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [urls, setUrls] = useState([])
    const [stats, setStats] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const loadStatistics = async () => {
            try {
                const urlsData = await getMyUrls()
                const userUrls = urlsData.data || []

                setUrls(userUrls)

                const statsData = await Promise.all(
                    userUrls.map(async (url) => {
                        try {
                            const response = await getUrlStats(url.shortCode)

                            return {
                                ...url,
                                totalClicks: response.data.totalClicks || 0,
                            }
                        } catch (error) {
                            console.error(
                                `FAILED TO LOAD STATS FOR ${url.shortCode}:`,
                                error
                            )

                            return {
                                ...url,
                                totalClicks: 0,
                            }
                        }
                    })
                )

                setStats(statsData)
            } catch (error) {
                console.error('FAILED TO LOAD STATISTICS:', error)

                setError(
                    error.response?.data?.message ||
                    'Failed to load statistics.'
                )
            } finally {
                setIsLoading(false)
            }
        }

        loadStatistics()
    }, [])

    const totalLinks = urls.length

    const totalClicks = stats.reduce(
        (total, url) => total + url.totalClicks,
        0
    )

    const averageClicks =
        totalLinks > 0
            ? (totalClicks / totalLinks).toFixed(1)
            : 0

    const topUrl = stats.reduce(
        (top, url) =>
            !top || url.totalClicks > top.totalClicks
                ? url
                : top,
        null
    )

    const chartData = stats.map((url) => ({
        name: url.shortCode,
        clicks: url.totalClicks,
    }))

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <main className="lg:ml-64">

                <header className="flex h-20 items-center border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    >
                        <span className="text-xl">☰</span>
                    </button>

                    <div className="ml-4 flex items-center gap-2 text-xl font-bold text-purple-600 dark:text-purple-500">
                        <LinkIcon size={22} />
                        Linkly
                    </div>
                </header>

                <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">

                    <div className="mb-8">
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                            Analytics
                        </p>

                        <h1 className="mt-1 text-3xl font-bold">
                            Statistics
                        </h1>

                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                            Track how your shortened links are performing.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                            {error}
                        </div>
                    )}

                    {isLoading ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Loading statistics...
                        </p>
                    ) : (
                        <>
                            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                                <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                            <LinkIcon size={20} />
                                        </div>

                                        <div>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                Total Links
                                            </p>

                                            <p className="mt-1 text-2xl font-bold">
                                                {totalLinks}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                            <MousePointerClick size={20} />
                                        </div>

                                        <div>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                Total Clicks
                                            </p>

                                            <p className="mt-1 text-2xl font-bold">
                                                {totalClicks}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">
                                            <TrendingUp size={20} />
                                        </div>

                                        <div>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                Average Clicks
                                            </p>

                                            <p className="mt-1 text-2xl font-bold">
                                                {averageClicks}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </section>

                            <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                                <h2 className="text-xl font-bold">Clicks per link</h2>
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Compare the performance of your shortened links.</p>
                               {chartData.length === 0 ? (
                                    <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
                                      Create a short link to see your statistics.
                                   </p>
                                ) : (
                                  <div className="mt-6 h-80 w-full">
                                      <ResponsiveContainer width="100%" height="100%">
                                          <BarChart
                                              data={chartData}
                                              layout="vertical"
                                              margin={{
                                                  top: 10,
                                                  right: 20,
                                                  left: 20,
                                                  bottom: 10,
                                                }}
                                               >
                                              <CartesianGrid strokeDasharray="3 3" />
                                              <XAxis type="number" allowDecimals={false} />
                                              <YAxis type="category"
                                                  dataKey="name"
                                                   width={80} 
                                                />
                                              <Tooltip />

                                              <Bar
                                                 dataKey="clicks"
                                                 name="Clicks"
                                                 fill="#9333ea"
                                                 radius={[6, 6, 0, 0]}
                                               />
                                          </BarChart>
                                      </ResponsiveContainer>
                                   </div>
                             )}
                            </section>

                            <section className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                                    <h2 className="text-xl font-bold">Click distribution</h2>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                    See how your total clicks are distributed across your links.
                                    </p>

                                   {chartData.length === 0 || totalClicks === 0 ? (
                                        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
                                           Click data will appear here once your links receive clicks.
                                        </p>
                                    ) : (
                                       <div className="mt-6 h-80 w-full">
                                           <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                <Pie
                                                   data={chartData}
                                                   dataKey="clicks"
                                                   nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={110}
                                                   label
                                                   >
                                                  {chartData.map((entry) => (
                                                      <Cell key={entry.name} />
                                                    ))}
                                               </Pie>

                                               <Tooltip />
                                           </PieChart>
                                      </ResponsiveContainer>
                                  </div>
                                )}
                           </section>

                            <section className="mt-8">
                                <h2 className="mb-5 text-xl font-bold">
                                    Top-performing link
                                </h2>

                                {topUrl ? (
                                    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                                        <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                                            {topUrl.originalUrl}
                                        </p>

                                        <p className="mt-2 text-lg font-semibold text-purple-600 dark:text-purple-400">
                                            {topUrl.shortCode}
                                        </p>

                                        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                                            {topUrl.totalClicks} clicks
                                        </p>
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-950">
                                        <p className="font-medium">
                                            No statistics yet.
                                        </p>

                                        <Link
                                            to="/dashboard"
                                            className="mt-2 inline-block text-sm font-semibold text-purple-600 hover:underline dark:text-purple-400"
                                        >
                                            Create a short link
                                        </Link>
                                    </div>
                                )}
                            </section>
                        </>
                    )}

                </div>
            </main>
        </div>
    )
}

export default Statistics