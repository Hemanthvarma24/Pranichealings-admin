"use client";

import { useState, Suspense } from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Search, Filter, Star, Users, Clock, PlayCircle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import img1 from "@/app/assets/img1.jpg";
import img2 from "@/app/assets/img2.jpg";
import img3 from "@/app/assets/img3.webp";

const courses = [
  {
    id: 1,
    title: "Introduction to Healthcare Technology",
    description:
      "Start your journey in healthcare tech with this beginner-friendly course. Learn the basics of digital health, medical devices, and how technology is transforming patient care.",
    image: img1,
    featured: true,
    author: "Dr. Emily Chen",
    date: "Updated Jan 2025",
    readTime: "6 hours",
    category: "Fundamentals",
    level: "Beginner",
    students: 2150,
    rating: 4.9,
    modules: 8,
    certificate: true,
  },
  {
    id: 2,
    title: "Patient Data Management Made Simple",
    description:
      "Learn how to safely handle patient information, understand HIPAA compliance, and work with basic electronic health records. Perfect for healthcare staff.",
    image: img2,
    featured: true,
    author: "Sarah Johnson, RN",
    date: "Updated Dec 2024",
    readTime: "4 hours",
    category: "Data Management",
    level: "Beginner",
    students: 1890,
    rating: 4.8,
    modules: 6,
    certificate: true,
  },
  {
    id: 3,
    title: "Telemedicine Basics for Healthcare Workers",
    description:
      "Discover how to provide quality care through video consultations. Learn platform basics, patient communication skills, and remote care best practices.",
    image: img3,
    featured: false,
    author: "Dr. Michael Torres",
    date: "Updated Jan 2025",
    readTime: "5 hours",
    category: "Telemedicine",
    level: "Beginner",
    students: 1567,
    rating: 4.7,
    modules: 7,
    certificate: true,
  },
];

function CourseCard({ course }) {
  return (
    <div className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-white rounded-lg border border-gray-200 hover:border-blue-300">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-white/90 text-gray-700"
        >
          {course.category}
        </Badge>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <PlayCircle className="h-12 w-12 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-gray-800">
              {course.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({course.students.toLocaleString()} students)
            </span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{course.readTime}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3" />
            <span>{course.author}</span>
          </div>
          <span>{course.modules} modules</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500">{course.date}</span>
          {course.certificate && (
            <Badge
              variant="outline"
              className="text-xs text-blue-600 border-blue-200"
            >
              Certificate
            </Badge>
          )}
        </div>

        <Button
          className={`w-full font-semibold ${
            course.featured
              ? "bg-gradient-to-r from-[#6fc7ae] to-[#48c373] hover:from-[#5cbfa4] hover:to-[#3f967c]"
              : ""
          }`}
          variant={course.featured ? "default" : "outline"}
        >
          {course.featured ? "Start Learning" : "Enroll Now"}
        </Button>
      </div>
    </div>
  );
}

function CoursesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredCourses = filteredCourses.filter((course) => course.featured);

  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <div className="flex-1 flex m-8">
        <Sidebar />
        <main
          className="flex-1 h-screen overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="container mx-auto p-6">
            {/* Page Header with Add Button */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Left Section: Heading and Search */}
              <div className="flex flex-col gap-4 flex-1">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-1">
                    Healthcare Technology Courses
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    Learn healthcare technology at your own pace with our
                    practical, easy-to-follow courses designed for healthcare
                    professionals.
                  </p>
                </div>
                {/* Search */}
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search courses, instructors, or topics..."
                    className="pl-10 h-12 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Right Section: Add Course Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-12 px-6 bg-[#48c272] text-white hover:bg-green-400 self-start sm:self-center">
                    + Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                  </DialogHeader>
                  <form className="space-y-4">
                    <div>
                      <Label htmlFor="courseImage">Upload Image</Label>
                      <Input type="file" id="courseImage" />
                    </div>
                    <div>
                      <Label htmlFor="courseTitle">Title</Label>
                      <Input
                        type="text"
                        id="courseTitle"
                        placeholder="Enter course title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="courseDescription">Description</Label>
                      <Textarea
                        id="courseDescription"
                        placeholder="Brief course summary"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="courseContent">Content</Label>
                      <Textarea
                        id="courseContent"
                        placeholder="Detailed course content"
                        rows={6}
                      />
                    </div>
                    <div className="text-right">
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Featured Courses */}
            {featuredCourses.length > 0 && (
              <div className="mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {featuredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}

            {/* All Courses */}
            <div className="mb-12">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  All Courses
                </h2>
                <p className="text-gray-600">
                  Browse all available healthcare technology courses
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    </div>
  );
}

export default function CoursesClient() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CoursesContent />
    </Suspense>
  );
}
