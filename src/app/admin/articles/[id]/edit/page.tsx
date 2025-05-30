"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "@/lib/axios"
import Link from "next/link"

export default function EditArticle() {
  const { id } = useParams()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`/articles/${id}`)
        const { title, content, imageUrl, category } = res.data
        setTitle(title)
        setContent(content)
        setImageUrl(imageUrl)
        setCategoryId(category?.id || "")
      } catch (err) {
        setError("Failed to fetch article.")
      }
    }

    const fetchCategories = async () => {
      try {
        const res = await axios.get("/categories")
        setCategories(res.data.data)
      } catch (err) {
        console.log("Gagal fetch kategori")
      }
    }

    fetchArticle()
    fetchCategories()
  }, [id])

  const handleUpdate = async () => {
    if (!title || !content || !categoryId) {
      setError("Semua field wajib diisi.")
      return
    }

    try {
      await axios.put(`/articles/${id}`, {
        title,
        content,
        imageUrl,
        categoryId
      })
      router.push("/admin/articles")
    } catch (err) {
      setError("Gagal update artikel")
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Articles</h1>

        {error && <p className="text-red-500">{error}</p>}

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnails</label>
          <div className="flex items-center gap-4">
            <img
              src={imageUrl || "/placeholder.jpg"}
              alt="Thumbnail"
              className="w-24 h-24 object-cover rounded border"
            />
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="URL gambar"
                className="border border-gray-300 rounded px-3 py-2 w-64"
              />
              <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                Change
              </div>
              <div className="text-sm text-red-500 hover:underline cursor-pointer">
                Delete
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="Judul artikel"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 min-h-[150px]"
            placeholder="Tuliskan isi artikel di sini..."
          />
          <div className="text-sm text-gray-500 mt-1">{content.length} Words</div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <Link
            href="/admin/articles"
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Link>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}
