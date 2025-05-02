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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Article</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="space-y-4 max-w-xl">
        <div>
          <label className="font-semibold">Title</label>
          <input
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="font-semibold">Content</label>
          <textarea
            className="w-full p-2 border rounded min-h-[120px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label className="font-semibold">Image URL</label>
          <input
            className="w-full p-2 border rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label className="font-semibold">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <Link
            href="/admin/articles"
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  )
}
