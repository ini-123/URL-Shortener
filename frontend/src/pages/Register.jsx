import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Link as LinkIcon } from 'lucide-react'
import { registerUser } from '../services/authService'

function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((previous) => ({ ...previous, [name]: value,}))
    }
    const handleSubmit = async (event) => { event.preventDefault() 
        setError('')
        if (formData.password !== formData.confirmPassword) { setError('Passwords do not match.')
            return
        }
        setIsLoading(true)
        try {
            await registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
            })
            navigate('/login')
        } catch (error) {
            console.log('Registration error:', error.response?.data || error.message)
            const message = error.response?.data?.message || 
            error.response?.data?.errors?.[0]?.msg || 
            error.message || 
            'Registration failed. Please try again'
            setError( typeof message === 'string'
        ? message
        : 'Registration failed. Please check your details.')
        } finally { setIsLoading(false)}
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
                          Get started
                       </p>
                       <h1 className="text-5xl font-bold leading-tight">
                          Your links.
                           <br />
                          Your control.
                       </h1>
                       <p className="mt-6 text-lg leading-8 text-purple-100">
                          Create short links and keep track of how they perform.
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
                          className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-purple-600 
                          dark:text-zinc-400 dark:hover:text-purple-400">
                          <ArrowLeft size={18} />
                            Back to home
                      </Link>
                      <div className="mb-8">
                          <h2 className="text-3xl font-bold">Create your account</h2>
                          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Join Linkly and start creating shorter links.</p>
                      </div>
                      <form  onSubmit={handleSubmit} className="space-y-5">
                           {/* First Name */}
                           <div>
                              <label
                                  htmlFor="firstName"
                                  className="mb-2 block text-sm font-medium">
                                    First name
                               </label>
                               <input
                                   id="firstName"
                                   name="firstName"
                                   type="text"
                                   value={formData.firstName}
                                   onChange={handleChange}
                                   placeholder="Your first name" required
                                   className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition 
                                   focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                               />
                          </div>

                          {/* Last Name */}
                           <div>
                              <label
                                  htmlFor="lastName"
                                  className="mb-2 block text-sm font-medium">
                                    Last name
                               </label>
                               <input
                                   id="lastName"
                                   name="lastName"
                                   type="text"
                                   value={formData.lastName}
                                   onChange={handleChange}
                                   placeholder="Your last name" required
                                   className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition 
                                   focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                               />
                          </div>

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
                                  type="text"
                                  value={formData.email}
                                  onChange={handleChange}
                                  placeholder="you@example.com" required
                                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition 
                                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                                />
                          </div>

                          {/* Phone Number */}
                           <div>
                              <label
                                  htmlFor="phoneNumber"
                                  className="mb-2 block text-sm font-medium">
                                    Phone number
                               </label>
                               <input
                                   id="phoneNumber"
                                   name="phoneNumber"
                                   type="tel"
                                   value={formData.phoneNumber}
                                   onChange={handleChange}
                                   placeholder="Your phone number" required
                                   className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition 
                                   focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                               />
                          </div>

                          {/* Password */}
                          <div>
                              <label
                                  htmlFor="password"
                                  className="mb-2 block text-sm font-medium">
                                    Password
                              </label>
                              <input
                                  id="password"
                                  name="password"
                                  type="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                  placeholder="Create a password" required
                                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition 
                                  focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                               />
                          </div>

                          {/* Confirm password */}
                          <div>
                              <label
                                 htmlFor="confirmPassword"
                                 className="mb-2 block text-sm font-medium">
                                   Confirm password
                              </label>
                               <input
                                 id="confirmPassword"
                                 name="confirmPassword"
                                 type="password"
                                 value={formData.confirmPassword}
                                 onChange={handleChange}
                                 placeholder="Confirm your password" required
                                 className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 outline-none transition 
                                 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                               />
                           </div>

                           {/* Error */}
                           {error && (
                            <p className="rounde-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400"> {error}</p>
                           )}
                           <button
                             type="submit"
                             disabled={isLoading}
                             className="w-full rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700
                             disabled:cursor-not-allowed disabled:opacity-60">
                                {isLoading ? 'Creating account...' : 'Create account'}
                          </button>
                       </form>
                       <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
                          Already have an account?{' '}
                          <Link
                              to="/login"
                              className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400">
                               Login
                          </Link>
                       </p>
                   </div>
               </div>
          </div>
      </div>
    )
}

export default Register