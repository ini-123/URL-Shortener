import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Link as LinkIcon, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
	const [email, setEmail] = useState('')
	const [submitted, setSubmitted] = useState(false)

	function handleSubmit(event) {
		event.preventDefault()
		setSubmitted(true)
	}

	return (
		<div className="min-h-screen bg-[#071426] text-white">
			<div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
				<div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-[#0b1b30] shadow-2xl shadow-black/30 lg:grid-cols-2">
					<section className="hidden flex-col justify-between bg-purple-600 p-10 lg:flex">
						<Link to="/" className="flex items-center gap-2 text-xl font-bold"><LinkIcon size={22} /> Linkly</Link>
						<div><p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-200">Account recovery</p><h1 className="mt-4 text-4xl font-bold leading-tight">Get back to your links.</h1><p className="mt-5 max-w-sm text-sm leading-6 text-purple-100">We&apos;ll help you securely reset your password and return to your Linkly workspace.</p></div>
						<p className="text-xs text-purple-200">&copy; {new Date().getFullYear()} Linkly</p>
					</section>

					<section className="flex min-h-[560px] items-center px-6 py-12 sm:px-12">
						<div className="w-full max-w-md">
							<Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-purple-400"><ArrowLeft size={16} /> Back to login</Link>
							<div className="mt-12"><span className="inline-flex rounded-xl bg-purple-500/15 p-3 text-purple-400"><Mail size={22} /></span><h2 className="mt-6 text-3xl font-bold">Forgot your password?</h2><p className="mt-3 text-sm leading-6 text-slate-400">Enter your account email and we&apos;ll send instructions to reset your password.</p></div>

							{submitted ? (
								<div className="mt-8 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-5 text-sm text-emerald-300" role="status"><CheckCircle2 className="mb-3" size={22} /><p className="font-semibold">Check your inbox</p><p className="mt-1 text-emerald-200/80">If an account exists for {email}, reset instructions will be sent shortly.</p></div>
							) : (
								<form className="mt-8 space-y-5" onSubmit={handleSubmit}><div><label htmlFor="reset-email" className="mb-2 block text-xs font-medium text-slate-300">Email address</label><input id="reset-email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required className="w-full rounded-lg border border-slate-700 bg-[#08172a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20" /></div><button type="submit" className="w-full rounded-lg bg-purple-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-400">Send reset link</button></form>
							)}

							<p className="mt-8 text-center text-xs text-slate-500">Remember your password? <Link to="/login" className="font-semibold text-purple-400 hover:text-purple-300">Log in</Link></p>
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}

export default ForgotPassword
