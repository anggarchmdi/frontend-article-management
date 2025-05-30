"use client"

import axios from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string; role?: string }>({})
  const router = useRouter()

  const handleRegister = async () => {
    const newErrors: typeof errors = {}
    let valid = true

    if (!username.trim()) {
      newErrors.username = "Username field cannot be empty"
      valid = false
    }

    if (!password || password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
      valid = false
    }
    if (!role) {
        newErrors.role = "Please select a role"
        valid = false
      }      

    if (!valid) {
      setErrors(newErrors)
      return
    }

    try {
      await axios.post("/auth/register", { username, password, role })
       toast.success("Register berhasil! Silakan login.")
    //   console.log({username, password, role})
      router.push("/auth/login")
} catch (err: any) {
     toast.error("Register gagal, coba cek kembali!")
    console.log("Register Error:", err.response?.data || err.message)
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
        <div>
          <label className="font-semibold">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2.5 rounded-md border-2"
          >
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
            <option value="" disabled>Select Role</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <button
          onClick={handleRegister}
          className="w-full py-2 bg-[#2563EB] text-white hover:cursor-pointer font-semibold rounded-lg hover:scale-95 transition"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account? <a href="/auth/login" className="text-blue-600 underline">Login</a>
        </p>
      </div>
    </div>
  )
}
