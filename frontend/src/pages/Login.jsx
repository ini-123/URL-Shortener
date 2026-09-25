import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Link as LinkIcon } from 'lucide-react'
import { useAuth } from '../Context/useAuth'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    try {
      await login(formData.get('email'), formData.get('password'))
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

   return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-black dark:text-white">
        <div className="flex min-h-screen">
          {/* Left side */}
          <div className="hidden w-1/2 flex-col justify-between bg-purple-600 p-10 text-white lg:flex">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
                  <LinkIcon size={26} />
                    Linkly
                </Link>
              <div className="max-w-md">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-purple-200">
                      Welcome back
                    </p>
                  <h1 className="text-5xl font-bold leading-tight">
                      Shorter links.
                      <br />
                      Bigger possibilities.
                   </h1>
                  <p className="mt-6 text-lg leading-8 text-purple-100">
                      Create, manage and track your links all in one place.
                   </p>
                </div>
                <p className="text-sm text-purple-200">
                   © 2026 Linkly
                </p>
            </div>
           {/* Right side */}
          <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
              <div className="w-full max-w-md">
                  <Link
                     to="/"
                     className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400">
                     <ArrowLeft size={18} />
                        Back to home
                  </Link>
                  <div className="mb-8">
                      <h2 className="text-3xl font-bold">
                          Welcome back
                       </h2>
                       <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                           Login to continue to your Linkly account.
                        </p>
                    </div>
                   <form className="space-y-5" onSubmit={handleSubmit}>
                       {/* Email */}
                        <div>
                           <label
                              htmlFor="email"
                              className="mb-2 block text-sm font-medium">
                                Email address
                            </label>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="you@example.com"
                              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                            />
                            </div>
                            {/* Password */}
                            <div>
                              <div className="mb-2 flex items-center justify-between">
                                 <label
                                     htmlFor="password"
                                     className="text-sm font-medium">
                                      Password
                                    </label>
                                  <button
                                      type="button"
                                      className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400">
                                      Forgot password?
                                    </button>
                                </div>
                                <input
                                  id="password"
                                  name="password"
                                  type="password"
                                  placeholder="Enter your password"
                                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                />
                            </div>

                           {/* Submit */}
                           {error && <p className="text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
                           <button
                             type="submit"
                             disabled={isSubmitting}
                             className="w-full rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700">
                              {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                           Don't have an account?{' '}
                           <Link
                             to="/register"
                             className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login