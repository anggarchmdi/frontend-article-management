"use client"
import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categories, setCategories] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [newName, setNewName] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCategories, setTotalCategories] = useState(0)
  const [editData, setEditData] = useState<{ id: string; name: string } | null>(null)
  const [error, setError] = useState("")
  const categoryToDelete = categories.find((cat) => cat.id ===deleteId)
  
  const itemsPerPage = 10

  const fetchCategories = async (page: number) => {
    try{
      const params: any ={
        page,
        limit: itemsPerPage,
      }
      if(selectedCategory) params.category = selectedCategory
      if(search) params.title = search

      const res = await axios.get("/categories", { params })
      setCategories(res.data.data)
      setTotalCategories(res.data.total)
      setTotalPages(Math.ceil(res.data.total / itemsPerPage))
    } catch (err) {
      console.log("failed to fetch categories : ", err)
    }
  }

  const handleAdd = async () => {
    if (!newName.trim()) {
      setError("Category field cannot be empty")
      return
    }
    
    try {
      await axios.post("/categories", { name: newName })
      setNewName("")
      setShowAddModal(false)
      setError("")
      fetchCategories(currentPage)
    } catch (err) {
      setError('Failed to add category')
    }  
  }

  const handleEdit = async () => {
    if (!editData?.name.trim()) return
    await axios.put(`/categories/${editData.id}`, { name: editData.name })
    setEditData(null)
    fetchCategories(currentPage)
  }
  

  const handleDelete = async () => {
    if (!deleteId) return
    await axios.delete(`/categories/${deleteId}`)
    setDeleteId(null)
    fetchCategories(currentPage)
  }

  useEffect(() => {
    fetchCategories(currentPage)
  }, [])

  const handlePaginate = (page: number) => {
    setCurrentPage(page)
  }

  const filtered = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className="flex flex-col w-full">
      <h2 className="text-[1rem] font-semibold py-4 border rounded-t-lg px-2">Total Category : {filtered.length}</h2>
      <div className="flex justify-between items-center py-4 px-2 border">
        <Input
          placeholder="🔍 Search Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
        <Button className="hover:cursor-pointer bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-95 duration-300" onClick={() => setShowAddModal(true)}>+ Add Category</Button>
      </div>

      <table className="w-full bg-white rounded-md border border-collapse overflow-hidden">
        <thead className="bg-gray-100 border">
          <tr className="border-2 border-collapse">
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Created at</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((cat) => (
            <tr key={cat.id} className="border border-collapse">
              <td className="p-3">{cat.name}</td>
              <td className="p-3">
                {new Date(cat.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="p-3 space-x-2">
              <button
                  className="text-blue-600 hover:cursor-pointer underline"
                  onClick={() => setEditData({ id: cat.id, name: cat.name })}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 cursor-pointer underline"
                  onClick={() => setDeleteId(cat.id)}
                >
                  Delete
                </button>
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

      {/* Add Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="w-[400px] h-[240px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
          <h1>Category</h1>
          <Input
            placeholder="Input Category"
            className="border-none"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value)
              if (e.target.value.trim()) setError("")
              }}
            />
            {error && <p className="text-red-500 text-sm">{error }</p>}
            </div>
          <DialogFooter>
            <Button variant="outline" className="transition-all transform  hover:scale-95 duration-300 hover:cursor-pointer" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAdd} className="bg-[#2563EB] hover:bg-blue-700 transition-all transform hover:scale-95 duration-300 hover:cursor-pointer">Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      {deleteId && categoryToDelete && (
        <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="w-[400px] h-[180px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
          </DialogHeader>
          <p className="text-slate-500">Delete category “{categoryToDelete.name ?? "unknown"}"? This will remove it from master data permanently.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )}

      <Dialog open={!!editData} onOpenChange={() => setEditData(null)}>
        <DialogContent className="w-[400px] h-[240px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Category"
            value={editData?.name || ""}
            onChange={(e) =>
              setEditData((prev) => (prev ? { ...prev, name: e.target.value } : null))
            }
          />
          <DialogFooter>
            <Button variant="outline" className="transition-all transform hover:scale-95 duration-300 hover:cursor-pointer" onClick={() => setEditData(null)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all transform hover:scale-95 duration-300 hover:cursor-pointer" onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </div>
  )
}
