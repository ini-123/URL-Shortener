import { LoaderCircle } from 'lucide-react'

function LoadingSpinner({ text = 'Loading...' }) {
   return (
        <div className="flex items-center justify-center gap-2 py-6 text-zinc-600 dark:text-zinc-400">
           <LoaderCircle
            size={20}
            className="animate-spin text-purple-600 dark:text-purple-400"/>
            <span className="text-sm">{text}</span>
      </div>
    )
}

export default LoadingSpinner