import Link from 'next/link'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <Link
        href="/api/auth/signin"
        className="rounded-full bg-white/10 px-8 py-3 font-medium text-white shadow-md backdrop-blur-md transition duration-200 hover:scale-105 hover:bg-white/20 active:scale-95"
      >
        Sign in
      </Link>
    </div>
  )
}
