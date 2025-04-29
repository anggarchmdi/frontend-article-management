"use client"
import Navbar from "@/components/navbar/page"
import Image from "next/image"
import axios from "@/lib/axios"
import { useEffect, useState } from "react"


export default function Articles() {
    const [categories, setCategories] = useState<{id: number; name: string}[]>([])
    const [SelectedCategory, setSelectedCategory] = useState("")


    useEffect(() => {
        const fetchCategory = async () => {
            try{
                const res = await axios.get("/categories")
                setCategories(res.data.data);
            } catch (err) {
                console.log("Gagal fetch category: ", err)

            }
        }
        fetchCategory()
    },[]);
    return(
        <>
        <Navbar />
        <div className="w-screen h-screen bg-gray-100">
            {/* hero section */}
            <div className="h-[500px] relative w-full">
            {/* img */}
            <img src="/images/hero-section.jpg" alt="hero" className="object-cover h-[500px] w-full -z-10" />
            {/* overlay */}
            <div className="absolute flex justify-center items-center inset-0 bg-[#2563EB]/86">
            <div className="flex flex-col text-center justify-center items-center text-white gap-y-[12px]">
                <h1 className="font-bold text-[1rem]">Lorem, ipsum.</h1>
                <h1 className="text-[3rem] font-medium w-[720px] leading-14">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</h1>
                <h1 className="text-[1.5rem] ">Lorem ipsum dolor sit amet consectetur.</h1>
                {/* search */}
                <div className="w-[608px] h-[60px] bg-[#3B82F6] p-[10px] rounded-[12px] mt-[40px] flex gap-x-4">
                {/* dropdown */}
                <div className="w-[40%] bg-white text-gray-600 rounded-[12px]">
                <select className="w-full h-full px-4 py-2 rounded-[12px] outline-none"
                value={SelectedCategory}
                onChange={(e) => setSelectedCategory}
                >
                </select>
                    
                </div>
                {/* search */}
                <div className="w-[60%] bg-white rounded-[12px] flex">
                <input type="text" className="w-full rounded-[12px] text-gray-700 px-4" placeholder="Search Articles" />
                </div>
            </div>
            </div>
            </div>
            </div>
            {/* content */}
            <div className="">

                {/* card */}
            </div>
        </div>
        </>
    )
}