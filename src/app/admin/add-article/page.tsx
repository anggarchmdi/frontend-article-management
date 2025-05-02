"use client"
import { useState, useEffect } from "react"
import axios from "@/lib/axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AddArticle() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [categoryId, setCategoryId] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [categories, setCategories] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    axios.get("/categories").then(res => setCategories(res.data.data))
  }, [])

  const handleSubmit = async () => {
    try {
      await axios.post("/articles", {
        title,
        content,
        categoryId,
        imageUrl,
      })
      router.push("/admin/articles")
    } catch (err) {
      alert("Gagal menambahkan artikel")
    }
  }

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-6">📝 Create Articles</h2>

      {/* Thumbnail upload */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Thumbnails</label>
        <div className="w-64 h-40 border border-dashed rounded-xl flex flex-col justify-center items-center text-center text-gray-400 text-sm p-4 cursor-pointer">
          <p>📁</p>
          <p>Click to select files</p>
          <p className="text-xs mt-1">Support File Type: .jpg or .png</p>
        </div>
        <input
          type="text"
          className="mt-2 w-full border rounded-md px-3 py-2"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      {/* Title input */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Title</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Input title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Category dropdown */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Category</label>
        <select
          className="w-full border px-3 py-2 rounded-md"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <p className="text-sm mt-1 text-gray-500">
          The existing category list can be seen in the{" "}
          <Link href="/admin/categories" className="text-blue-500 underline">
            category
          </Link>{" "}
          menu
        </p>
      </div>

      {/* Content textarea */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Content</label>
        <textarea
          rows={10}
          className="w-full border px-3 py-2 rounded-md"
          placeholder="Type a content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <p className="text-sm text-gray-500 mt-1">{content.trim().split(/\s+/).filter(Boolean).length} Words</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4">
        <Link href="/admin/articles" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</Link>
        <button className="px-4 py-2 border rounded text-blue-600 hover:bg-gray-100">Preview</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Upload</button>
      </div>
    </div>
  )
}
