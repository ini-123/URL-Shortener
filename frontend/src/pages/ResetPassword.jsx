import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../services/authService'

function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!password || !confirmPassword) {
            setError('Please fill in both password fields.')
            return
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long.')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        try {
            setError('')
            setMessage('')
            setIsSubmitting(true)

            const data = await resetPassword(token, password)

            setMessage(data.message)

            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } catch (error) {
            console.error('RESET PASSWORD ERROR:', error)

            setError(
                error.response?.data?.message ||
                'Password reset failed. Please try again.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <div className="grid min-h-screen lg:grid-cols-2">

                <div className="hidden bg-purple-600 p-12 text-white lg:flex lg:flex-col lg:justify-center">
                    <div className="mx-auto max-w-md">
                        <h1 className="text-4xl font-bold">
                            Linkly
                        </h1>

                        <p className="mt-6 text-3xl font-bold leading-tight">
                            Create a new password.
                        </p>

                        <p className="mt-4 text-purple-100">
                            Choose a strong password to keep your Linkly account secure.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                                Reset your password
                            </h2>

                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                Enter your new password below.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                >
                                    New password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        setError('')
                                    }}
                                    placeholder="Enter new password"
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                >
                                    Confirm password
                                </label>

                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        setError('')
                                    }}
                                    placeholder="Confirm new password"
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                                />
                            </div>

                            {error && (
                                <p className="text-sm text-red-500">
                                    {error}
                                </p>
                            )}

                            {message && (
                                <p className="text-sm text-green-600">
                                    {message}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? 'Resetting...'
                                    : 'Reset password'}
                            </button>

                        </form>

                        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                            Remember your password?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-purple-600 hover:underline dark:text-purple-400"
                            >
                                Back to login
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResetPassword