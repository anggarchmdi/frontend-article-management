"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<{ username: string; role: string } | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const dropdownRef = useRef(null)
  const router = useRouter()

  // Handle navbar scroll style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);  

  useEffect(() => {
    const authData = Cookies.get("auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        setUser(parsed); // This will store username and role from the cookie
      } catch (err) {
        console.error("Failed to parse auth data:", err);
        Cookies.remove("auth");
      }
    }
  }, []);
  

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("auth");
    router.push("/auth/login");
  }
  
  return (
    <>
      <div
        className={`w-full fixed top-0 z-10 p-4 duration-300 flex justify-between items-center lg:px-12 ${
          isScrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
        }`}
      >
        {/* Logo */}
        <Link href="/articles">
          <h1 className="font-semibold text-lg lg:text-xl">Logoipsum</h1>
        </Link>

        {/* User dropdown */}
        {user && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 hover:underline"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>

              <span className="hidden sm:inline">{user.username ?? "Unknown"}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black border rounded-md shadow-lg py-2 z-20">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => setShowDropdown(false)}
                >
                  My Account
                </Link>
                <button
                  onClick={() => {
                    setShowDropdown(false)
                    setShowLogoutModal(true)
                  }}
                  className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-30">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
            <h2 className="text-lg font-semibold mb-2">Logout</h2>
            <p className="mb-4 text-sm">Are you sure want to logout?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
