"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Newspaper, Tag, LogOut } from "lucide-react"
import Cookies from "js-cookie"
import LogoutDialog from "@/components/ui/LogoutDialog"
import toast from "react-hot-toast"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [showLogoutDialog,setShowLogoutDialog] = useState(false)
  const router = useRouter()
  const pathname = usePathname()


  useEffect(() => {
    const auth = Cookies.get("auth")
    if (auth) {
      try {
        setUser(JSON.parse(auth))
      } catch {
        Cookies.remove("auth")
        setUser(null)
      }
    }
  }, [])

  const handleLogout = () => {
    toast.error("logout Berhasil")
    Cookies.remove("token")
    Cookies.remove("auth")
    router.push("/auth/login")
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-[250px] bg-blue-600 text-white p-6 flex flex-col">
        <h2 className="text-[24px] font-bold mb-10">Logoipsum</h2>
        <nav className="flex-1 space-y-4">
          <Link
            href="/admin/articles"
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              pathname.startsWith("/admin/articles") ? "bg-[#3B82F6]" : "hover:bg-blue-700"
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
            onClick={() => setShowLogoutDialog(true)}
            className="flex items-center hover:cursor-pointer gap-2 hover:bg-blue-700 px-4 py-2 rounded w-full text-left"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {pathname.includes("articles") && "Articles"}
            {pathname.includes("categories") && "Categories"}
            {!pathname.includes("articles") && !pathname.includes("categories") && "Dashboard"}
          </h1>

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

        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>

      <LogoutDialog 
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </div>
  )
}
