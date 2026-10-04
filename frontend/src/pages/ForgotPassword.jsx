import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../services/authService'

function ForgotPassword() {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email.trim()) {
            setError('Please enter your email address.')
            return
        }

        try {
            setError('')
            setMessage('')
            setIsSubmitting(true)

            const data = await forgotPassword(email)

            setMessage(data.message)
            setEmail('')
        } catch (error) {
            console.error('FORGOT PASSWORD ERROR:', error)

            setError(
                error.response?.data?.message ||
                'Unable to process password reset. Please try again.'
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
                            Get back to your account.
                        </p>

                        <p className="mt-4 text-purple-100">
                            Enter your email and we'll help you reset your password.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                                Forgot your password?
                            </h2>

                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                Enter your email address and we'll send you a password reset link.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        setError('')
                                        setMessage('')
                                    }}
                                    placeholder="you@example.com"
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
                                    ? 'Sending...'
                                    : 'Send reset link'}
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

export default ForgotPassword