// src/app/admin/layout.tsx
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Newspaper, Tag, LogOut } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const router = useRouter()
  const pathname = usePathname() // Mengambil pathname secara dinamis

  useEffect(() => {
    const auth = localStorage.getItem("auth")
    if (auth) {
      try {
        setUser(JSON.parse(auth))
      } catch {
        localStorage.removeItem("auth")
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/auth/login"
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-[250px] bg-blue-600 text-white p-6 flex flex-col">
        <h2 className="text-[24px] font-bold mb-10">Logoipsum</h2>
        <nav className="flex-1 space-y-4">
          <Link
            href="/admin/articles"
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              pathname === "/admin/articles" || pathname === "/admin/add-article" || pathname.startsWith(`/admin/articles/`) ? "bg-[#3B82F6]" : "hover:bg-blue-700"
            }`}
          >
            <Newspaper size={20} /> Articles
          </Link>
          <Link
            href="/admin/categories"
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              pathname === "/admin/categories" ? "bg-[#3B82F6]" : "hover:bg-blue-700"
            }`}
          >
            <Tag size={20} /> Category
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-blue-700 px-4 py-2 rounded w-full text-left"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content + Navbar */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          {/* Page Title */}
          <h1 className="text-xl font-bold">
            {pathname.includes("articles") && "Articles"}
            {pathname.includes("categories") && "Categories"}
            {!pathname.includes("articles") && !pathname.includes("categories") && "Articles"}
          </h1>

          {/* User Info */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-black font-bold uppercase">
                {user.username.charAt(0)}
              </div>
              <span>{user.username}</span>
            </div>
          ) : (
            <span>Guest</span>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  )
}
