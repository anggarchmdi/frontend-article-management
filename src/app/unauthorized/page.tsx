"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (!hasMounted) return

    const handleRedirect = () => {
      const auth = localStorage.getItem("auth")
      if (auth) {
        const role = JSON.parse(auth).role
        if (role === "Admin") {
          router.push("/admin/articles")
        } else {
          router.push("/articles")
        }
      } else {
        router.push("/auth/login")
      }
    }
    const timeout = setTimeout(() => handleRedirect(), 3000)

    return () => clearTimeout(timeout)
  }, [hasMounted])

  if (!hasMounted) return null

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-red-50 px-4">
      <h1 className="text-5xl font-bold text-red-600">403 - Unauthorized</h1>
      <p className="text-lg text-gray-700 mt-4">
        You don’t have access to this page.
      </p>
      <button
        onClick={() => {
          const auth = localStorage.getItem("auth")
          if (auth) {
            const role = JSON.parse(auth).role
            if (role === "Admin") {
              router.push("/admin/articles")
            } else {
              router.push("/articles")
            }
          } else {
            router.push("/auth/login")
          }
        }}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Dashboard
      </button>
    </div>
  )
}
