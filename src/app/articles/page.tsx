"use client"
import Navbar from "@/components/navbar/page"
import Image from "next/image"
import axios from "@/lib/axios"
import { useEffect, useState } from "react"
import Footer from "@/components/footer/page"
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import { title } from "process"

  export default function Articles() {
    const [articles, setArticles] = useState<any[]>([]);
    const [categories, setCategories] = useState<{id: number; name: string}[]>([])
    const [SelectedCategory, setSelectedCategory] = useState("")
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 9;

    const fetchArticles = async () => {
            try{
                const res = await axios.get("/articles", {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                        category: SelectedCategory || undefined,
                        title: search || undefined,
                        sortBy: "createdAt",
                        sortOrder: "desc",
                    }
                })
                setArticles(res.data.data)
                setTotalPages(Math.ceil(res.data.total / itemsPerPage))
            } catch (err) {
                console.log("Gagal fetch Articles: ", err)
            }
        }

        useEffect(() => {
            fetchArticles()
        }, [currentPage, SelectedCategory, search])

        useEffect(() => {
            const fetchCategory = async () => {
                try{
                    const res = await axios.get("/categories")
                    setCategories(res.data.data)
                } catch (err) {
                    console.log("Gagal fetch category: ", err)
                }
            }
            fetchCategory()
        }, []);
        

        const handlePaginate = (pageNumber: number) => {
            setCurrentPage(pageNumber)
            window.scrollTo({top: 0, behavior: "smooth"})
        }

        return(
        <>
        <Navbar />
        <div className="w-screen bg-gray-100">
            {/* hero section */}
            <div className="h-[500px] relative w-full">
            {/* img */}
            <img src="/images/hero-section.jpg" alt="hero" className="object-cover h-[500px] w-full -z-10" />
            {/* overlay */}
            <div className="absolute flex justify-center items-center inset-0 bg-[#2563EB]/86">
            <div className="flex flex-col text-center justify-center items-center text-white gap-y-[12px]">
                <h1 className="font-bold text-[1rem]">Blog Genzet</h1>
                <h1 className="text-[3rem] font-medium w-[720px] leading-14">The Journal : Design Resources, Interviews, Industry News</h1>
                <h1 className="text-[1.5rem] ">Your daily close of design insight!</h1>
                {/* search */}
                <div className="w-[608px] h-[60px] bg-[#3B82F6] p-[10px] rounded-[12px] mt-[40px] flex gap-x-4 overflow-hidden">
                {/* dropdown */}
                <div className="w-[40%] bg-white text-gray-600 rounded-[12px]">
                <select
                    className="w-full h-full px-4 py-2 rounded-[12px] outline-none"
                    value={SelectedCategory}
                    onChange={(e) => {
                        setSelectedCategory(e.target.value)
                        setCurrentPage(1)
                    }}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                </div>

                {/* search */}
                <div className="w-[60%] bg-white rounded-[12px] flex">
                <input 
                type="text"
                className="w-full rounded-[12px] text-gray-700 px-4"
                placeholder="Search Articles" 
                value= {search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setCurrentPage(1)
                }}
                />
                    </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className="h-[1728px]">
                <div className="mx-auto container p-12">
                    <p className="mb-6 text-[1rem] font-semibold text-gray-500">Lorem ipsum dolor sit.</p>
                    <div className="grid grid-cols-3 space-y-12">
                        {/* card */}
                        {articles.map((item, index) => (
                            <div key={index} className="transition-all transform hover:scale-105 hover:cursor-pointer  duration-300 w-[400px] h-[432px] rounded-t-xl  space-y-2">
                            {/* img */}
                            <div className="h-[240px] flex justify-center">
                                <img src={item.imageUrl} className="w-full rounded-xl object-cover" alt="" />
                            </div>
                            {/* time */}
                            <p className="text-[#475569]">{item.createdAt}</p>
                            {/* title */}
                            <h1 className="text-lg font-semibold line-clamp-2">{item.title}</h1>
                            {/* desc */}
                            <p className="line-clamp-2">{item.content}</p>
                            {/* category */}
                            {/* <div className="flex gap-2 flex-wrap">
                                {item.category.map((cat, idx) => (
                                    <h1 key={idx} className="px-4 py-1.5 text-[0.8rem] rounded-2xl bg-[#BFDBFE] text-[#1E3A8A] gap-2">{cat}</h1>
                                ))}
                            </div> */}
                        </div>
                    ))}
                </div>
                {/* paginate */}
                <Pagination className="mt-8">
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) handlePaginate(currentPage - 1);
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                        </PaginationItem>

                        {/* Page Number */}
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((number) => (
                        <PaginationItem key={number}>
                            <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePaginate(number);
                            }}
                            isActive={currentPage === number}
                            >
                            {number}
                            </PaginationLink>
                        </PaginationItem>
                        ))}

                        {/* Next */}
                        <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) handlePaginate(currentPage + 1);
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                        </PaginationItem>
                    </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}