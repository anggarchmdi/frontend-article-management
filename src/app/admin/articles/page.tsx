"use client"
import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import Link from "next/link"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function AdminArticles() {
  const [articles, setArticles] = useState<any[]>([])
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [search, setSearch] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)

  const itemsPerPage = 10

  const fetchArticles = async (page: number) => {
    try {
      const params: any = {
        page,
        limit: itemsPerPage,
      }
      if (selectedCategory) params.category = selectedCategory
      if (search) params.title = search

      const res = await axios.get("/articles", { params })
      setArticles(res.data.data)
      setTotalArticles(res.data.total)
      setTotalPages(Math.ceil(res.data.total / itemsPerPage))
    } catch (err) {
      console.error("Failed to fetch articles", err)
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories")
      setCategories(res.data.data)
    } catch (err) {
      console.error("Failed to fetch categories", err)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchArticles(currentPage)
  }, [currentPage, selectedCategory, search])

  const handleDelete = async () => {
    if(!deleteId) return setIsDeleting(true)
      try {
        await axios.delete(`/articles/${deleteId}`)
        fetchArticles(currentPage)
        setDeleteId(null)
      } catch (err) {
        alert("failed to delete article")
      } finally {
        setIsDeleting(false)
      }
  }

  const handlePaginate = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div>
      <div className="flex flex-col w-full">
        <h2 className="text-[1rem] font-semibold py-4 border rounded-t-lg px-2">Total Articles : {totalArticles}</h2>
        <div className="flex justify-between items-center w-full border py-4 px-2">
          <div className="flex gap-4 w-full max-w-md">
            {/* Category filter */}
            <select
              className="w-[150px] h-full px-4  py-2 rounded-md border bg-white"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setCurrentPage(1)
              }}
            >
              <option value="" className="">Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Search input */}
            <input
              type="text"
              className="w-full rounded-md bg-white text-gray-700 px-4 border"
              placeholder="Search by title"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
          <Link href="/admin/add-article" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all transform hover:scale-95 duration-300">
            + Add Article
          </Link>
        </div>
      </div>

      <table className="w-full bg-white rounded-b-md border-collapse overflow-hidden">
        <thead className="bg-gray-100">
          <tr className="border">
            <th className="p-3 text-center px-4 min-w-max">Thumbnails</th>
            <th className="p-3 text-center px-4 min-w-max">Title</th>
            <th className="p-3 text-center px-4 min-w-max">Category</th>
            <th className="p-3 text-center px-4 min-w-max">Created</th>
            <th className="p-3 text-center px-4 min-w-max">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border">
              <td className="p-3 px-4 text-center w-20 h-20">
                <img
                  src={article.imageUrl || "/images/cardimg.jpg"}
                  alt={article.title}
                  className="w-full h-full object-cover rounded"
                />
              </td>
              <td className="p-3 text-left px-4">
                <div className="flex items-center w-96 line-clamp-2">  
                {article.title}
                </div>
                </td>
              <td className="p-3 text-center">{article.category?.name}</td>
              <td className="p-3 text-center">
                {new Date(article.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="p-3 space-x-2 text-center">
                <Link href={`/articles/${article.id}`} className="text-blue-600">
                  Preview
                </Link>
                <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-600">
                  Edit
                </Link>
               <button onClick={() => setDeleteId(article.id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination className="mt-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage > 1) handlePaginate(currentPage - 1)
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePaginate(number)
                }}
                isActive={currentPage === number}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                if (currentPage < totalPages) handlePaginate(currentPage + 1)
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Articles</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">Deleting this article is permanent and cannot be undone. All related content will be removed.</p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
