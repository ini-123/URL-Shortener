const variantClasses = {
	primary:
		'bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-500/40',
	secondary:
		'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800',
	ghost:
		'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-zinc-500/30 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white',
	danger:
		'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500/40',
}

const sizeClasses = {
	sm: 'px-3 py-2 text-sm',
	md: 'px-5 py-3 text-sm',
	lg: 'px-6 py-3 text-base',
}

function Button({
	children,
	className = '',
	variant = 'primary',
	size = 'md',
	type = 'button',
	...props
}) {
	return (
		<button
			{...props}
			type={type}
			className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant] ?? variantClasses.primary} ${sizeClasses[size] ?? sizeClasses.md} ${className}`}
		>
			{children}
		</button>
	)
}

export default Button