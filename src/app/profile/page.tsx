"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function Profile() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const authData = Cookies.get("auth")
    if (authData) {
      try {
        const parsed = JSON.parse(authData)
        if (typeof parsed === "object" && parsed !== null && "username" in parsed && "role" in parsed) {
          setUser(parsed)
        } else {
          throw new Error("Invalid user data structure")
        }
      } catch (error) {
        console.error("Failed to parse auth data:", error)
        setError("Failed to parse authentication data. Redirecting to login.")
        Cookies.remove("auth")
        router.push("/auth/login")
      }
    } else {
      setError("No authentication data found. Redirecting to login.")
      router.push("/auth/login")
    }
  }, [router])

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>
  }

  if (!user) return <div className="text-center p-8">Loading...</div>

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white p-4 rounded-xl w-[400px] flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-center">User Profile</h2>
        <div className="w-20 h-20 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-xl font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center w-[368px] bg-[#F3F4F6] px-4 py-2 rounded-md">
            <span className="font-semibold min-w-20">Username</span>
            <span>: </span>
            <div className="flex justify-start">
              <h1 className="text-start ml-4">{user.username}</h1>
            </div>
          </div>
          <div className="flex items-center w-[368px] bg-[#F3F4F6] px-4 py-2 rounded-md">
            <span className="font-semibold min-w-20">Role</span>
            <span>: </span>
            <div className="flex justify-start">
              <h1 className="text-start ml-4">{user.role}</h1>
            </div>
          </div>
        </div>
        <button
          onClick={() => router.push("/articles")}
          className="bg-blue-600 text-white px-4 py-2 w-full hover:cursor-pointer rounded-md mt-4 hover:bg-blue-700 transition"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
