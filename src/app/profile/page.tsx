"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Profile() {
  // const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  // const router = useRouter()

  // useEffect(() => {
  //   const authData = localStorage.getItem("auth")
  //   if (authData !== null) {
  //     try {
  //       const parsed = JSON.parse(authData)
  //       setUser(parsed)
  //     } catch (error) {
  //       console.error("Failed to parse auth data:", error)
  //       localStorage.removeItem("auth")
  //       router.push("/auth/login")
  //     }
  //   } else {
  //     // kalau belum login, redirect
  //     router.push("/auth/login")
  //   }
  // }, [router])

  // if (!user) return <div className="text-center p-8">Loading...</div>

  return (
    <div className="min-h-screen flex justify-center items-center bg-white">
      <div className="bg-white p-4 rounded-xl w-[400px]  flex flex-col items-center gap-4">
        <h2 className="text-xl font-semibold text-center">User Profile</h2>
        <div className="w-20 h-20 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center text-xl font-bold">
          {/* {user.username.charAt(0).toUpperCase()} */}
        </div>
        <div className="w-full space-y-2">
          <div className="flex items-center w-[368px] bg-[#F3F4F6]  px-4 py-2 rounded-md">
            <span className="font-semibold min-w-20">Username</span>
            <span>: </span>
              <div className="flex justify-start">
              <h1 className="text-start ml-4">Lorem ipsum dolor sit.</h1>
              </div>
          </div>
          <div className="flex items-center w-[368px] bg-[#F3F4F6]  px-4 py-2 rounded-md">
            <span className="font-semibold min-w-20">Password</span>
            <span>: </span>
              <div className="flex justify-start">
              <h1 className="text-start ml-4">Lorem ipsum dolor sit.</h1>
              </div>
          </div>
          <div className="flex items-center w-[368px] bg-[#F3F4F6]  px-4 py-2 rounded-md">
            <span className="font-semibold min-w-20">Role</span>
            <span>: </span>
              <div className="flex justify-start">
              <h1 className="text-start ml-4">Lorem ipsum dolor sit.</h1>
              </div>
          </div>
        </div>
        <button
          // onClick={() => router.push("/articles")}
          className="bg-blue-600 text-white px-4 py-2 w-full hover:cursor-pointer rounded-md mt-4 hover:bg-blue-700 transition"
        >
          Back to home
        </button>
      </div>
    </div>
  )
}
