"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  username: string
  password: string
  role: string
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("token")

    if (!token) {
      setError("No token found. Redirecting to login...")
      router.push("/auth/login")
      return
    }

    axios
      .get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data)
      })
      .catch(() => {
        setError("Session expired or invalid. Please login again.")
        Cookies.remove("token")
        Cookies.remove("auth")
        router.push("/auth/login")
      })
  }, [router])

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {user ? (
        <div className="bg-white w-full max-w-sm text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">User Profile</h1>
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-900">
              {user.username[0].toUpperCase()}
            </div>
          </div>

          <div className="space-y-4 text-left">
            {/* Gunakan grid 3 kolom */}
            <div className="grid grid-cols-3 items-center bg-gray-100 px-4 py-2 rounded-md">
              <span className="font-semibold text-gray-700">Username</span>
              <span className="text-start -translate-x-5">:</span>
              <span className="text-center -translate-x-7 text-gray-900">{user.username}</span>
            </div>

            <div className="grid grid-cols-3 items-center bg-gray-100 px-4 py-2 rounded-md">
              <span className="font-semibold text-gray-700">Password</span>
              <span className="text-start -translate-x-5">:</span>
              <span className="text-center -translate-x-7 text-gray-900">{user.password}</span>
            </div>

            <div className="grid grid-cols-3 items-center bg-gray-100 px-4 py-2 rounded-md">
              <span className="font-semibold text-gray-700">Role</span>
              <span className="text-start -translate-x-5">:</span>
              <span className="text-center -translate-x-7 text-gray-900">{user.role}</span>
            </div>
          </div>

          <button
          onClick={() => {
            if (user?.role === "Admin") {
              router.push("/admin/articles")
            } else {
              router.push("/articles")
            }
          }}
          className="mt-8 w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
        >
            Back to home
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">Loading profile...</p>
      )}
    </div>
  )
}
