"use client"

import { useState, Suspense } from "react"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus } from "lucide-react"
import { ContentCard } from "@/components/content-card"
import blog1 from "@/app/assets/blog1.jpg"
import blog2 from "@/app/assets/blog2.jpg"
import blog3 from "@/app/assets/blog3.jpg"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Breakthroughs in Modern Healthcare (2025 Edition)",
    description:
      "From gene editing to AI-powered diagnostics, discover the latest innovations transforming how we detect, treat, and prevent diseases in today's healthcare landscape.",
    image: blog1,
    featured: true,
    author: "Dr. Riya Sharma",
    date: "June 5, 2025",
    readTime: "8 min read",
    category: "Innovation",
  },
  {
    id: 2,
    title: "What Is Preventive Healthcare & Why It’s Crucial Now",
    description:
      "Learn how preventive healthcare—like screenings, vaccines, and healthy habits—can drastically reduce the burden of chronic illness and lower healthcare costs.",
    image: blog2,
    featured: true,
    author: "Dr. Karan Mehta",
    date: "May 30, 2025",
    readTime: "6 min read",
    category: "Preventive Care",
  },
  {
    id: 3,
    title: "Heart Health Tips Every Adult Should Follow",
    description:
      "Heart disease remains a leading killer. Learn the most effective lifestyle changes—from diet to movement—to protect your heart at any age.",
    image: blog3,
    featured: false,
    author: "Dr. Anjali Verma",
    date: "May 15, 2025",
    readTime: "6 min read",
    category: "Cardiology",
  },
]

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showImagePreview, setShowImagePreview] = useState<string | null>(null)

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const featuredPosts = filteredPosts.filter((post) => post.featured)

  return (
    <div className="min-h-screen flex flex-col ">
      <Suspense fallback={<div>Loading header...</div>}>
        <Header />
      </Suspense>

      <div className="flex-1 flex m-8 gap-6">
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <Sidebar />
        </Suspense>

        <main
          className="flex-1 h-screen overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="container mx-auto p-6">
            {/* Page Title + Actions */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Healthcare Blogs
                </h1>
                <p className="text-gray-600">
                  Stay updated with the latest insights, trends, and best practices.
                </p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-[#48c272]">
                    <Plus className="w-4 h-4" />
                    Add Blog
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Blog Post</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <Label>Blog Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setShowImagePreview(reader.result as string)
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    {showImagePreview && (
                      <Image
                        src={showImagePreview}
                        alt="Preview"
                        width={400}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    )}

                    <div>
                      <Label>Title</Label>
                      <Input placeholder="Enter blog title" />
                    </div>

                    <div>
                      <Label>Description</Label>
                      <Textarea placeholder="Enter short description" />
                    </div>

                    <div>
                      <Label>Content</Label>
                      <Textarea placeholder="Full blog content" rows={6} />
                    </div>

                    <Button className="w-full mt-4">Submit Blog</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search + Filter */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Featured Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <ContentCard key={post.id} {...post} type="blog" />
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <ContentCard key={post.id} {...post} type="blog" />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
