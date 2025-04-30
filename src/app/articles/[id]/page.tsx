"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import Navbar from "@/components/navbar/page"
import Footer from "@/components/footer/page"
import Link from "next/link"

export default function DetailArticles() {
  const { id } = useParams()
  interface Article {
    id: string
    title: string
    content: string
    imageUrl: string
    createdAt: string
    user?: {
      username?: string
    }
  }

  const [article, setArticle] = useState<Article | null>(null)
  interface RelatedArticle {
    id: string
    title: string
    content: string
    imageUrl: string
    createdAt: string
    category?: {
      name?: string
    }
  }

  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([])

  useEffect(() => {
    if (!id) return

    const fetchDetail = async () => {
      try {
        const res = await axios.get(`/articles/${id}`)
        setArticle(res.data)
      } catch (err) {
        console.log("Gagal fetch detail article:", err)
      }
    }

    const fetchRelated = async () => {
      try {
        const res = await axios.get("/articles", {
          params: {
            limit: 100,
          },
        })
        const allArticles = res.data.data
           // Filter out current article
    const filtered = allArticles.filter((item: any) => item.id !== id)
    // Shuffle & ambil 3
    const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, 3)
    setRelatedArticles(shuffled)
      } catch (err) {
        console.log("Gagal fetch related articles:", err)
      }
    }

    fetchDetail()
    fetchRelated()
  }, [id])

  if (!article) return <div className="text-center p-8">Loading...</div>

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center">

        <p className="text-sm text-gray-500 mb-2">
          {new Date(article.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} • Created by {article.user?.username || "Unknown"}
        </p>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-4 text-center">
          {article.title}
        </h1>
        <img src={article.imageUrl || "/images/cardimg.jpg"} alt={article.title} className="w-full rounded-xl mb-6" />
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">Other articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedArticles.map((item) => (
            <Link
              key={item.id} href={`/articles/${item.id}`}>
                <div className="bg-white rounded-lg min-h-[378px] shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img src={item.imageUrl || "/images/cardimg.jpg"} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <h3 className="font-semibold text-lg mt-1 min-h-10 leading-6 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 min-h-10 line-clamp-2">
                  {item.content}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {item.category?.name || "Uncategorized"}
                  </span>
                </div>
              </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
