"use client"
import { useEffect, useState } from "react"
import axios from "@/lib/axios"

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([])
  const [name, setName] = useState("")

  const fetchCategories = async () => {
    const res = await axios.get("/categories")
    setCategories(res.data.data)
  }

  const handleAdd = async () => {
    if (!name.trim()) return
    await axios.post("/categories", { name })
    setName("")
    fetchCategories()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure to delete this category?")) return
    await axios.delete(`/categories/${id}`)
    fetchCategories()
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="mb-4 flex gap-2">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="New category name"
        />
        <button onClick={handleAdd} className="bg-blue-600 text-white px-4 rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {categories.map(cat => (
          <li key={cat.id} className="flex justify-between bg-white p-2 rounded border">
            <span>{cat.name}</span>
            <button onClick={() => handleDelete(cat.id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}