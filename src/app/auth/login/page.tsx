"use client"

import axios from "@/lib/axios"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  const handleLogin = async () => {
    let valid = true
    const newErrors: typeof errors = {}

    if (!username) {
      newErrors.username = "Please enter your username"
      valid = false
    }

    if (!password) {
      newErrors.password = "Please enter your password"
      valid = false
    }

    if (!valid) {
      setErrors(newErrors)
      return
    }

    try {
      const res = await axios.post("/auth/login", { username, password })
      const token = res.data.token
      localStorage.setItem("token", token)
      document.cookie = `token=${token}; path=/`

      const profileRes = await axios.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })

      const auth = profileRes.data
      localStorage.setItem("auth", JSON.stringify(auth))
      document.cookie = `auth=${encodeURIComponent(JSON.stringify(auth))}; path=/`

      if (auth.role === "Admin") {
        router.push("/admin")
      } else {
        router.push("/articles")
      }
    } catch (err) {
      alert("Login gagal. Periksa username atau password.")
    }
  }

  return (
    <div className="w-screen bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[343px] lg:w-[400px] space-y-4">
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-blue-900">Logoipsum</h1>
        </div>
        <div>
          <label className="font-semibold">Username</label>
          <input
            type="text"
            className="w-full p-2.5 rounded-md border-2"
            placeholder="Input username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setErrors((prev) => ({ ...prev, username: "" }))
            }}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        <div className="relative">
          <label className="font-semibold">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-2.5 rounded-md border-2"
            placeholder="Input password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setErrors((prev) => ({ ...prev, password: "" }))
            }}
          />
          <button
            type="button"
            className="absolute right-4 top-[40px] text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-[#2563EB] text-white font-semibold rounded-lg hover:scale-95 transition"
        >
          Login
        </button>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account? <a href="/auth/register" className="text-blue-600 underline">Register</a>
        </p>
      </div>
    </div>
  )
}
