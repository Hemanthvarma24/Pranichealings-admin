"use client"

import { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Calendar, Clock, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Footer } from "@/components/dashboard/footer"
import { useSearchParams } from "next/navigation"

type Center = {
  id: string
  centerName: string
  appointmentDate: string
  appointmentTime: string
  location: string
  lastBooking: string
  image: string
  // Additional fields for edit functionality
  countryCode?: string
  phoneNumber?: string
  email?: string
  website?: string
  yearEstablished?: string
  country?: string
  state?: string
  city?: string
  street?: string
  nearby?: string
  pincode?: string
  description?: string
}

const CenterCard = ({ center }: { center: Center }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src={center.image || "/placeholder.svg"}
            alt={center.centerName}
            fill
            className="rounded-lg object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-blue-600 font-medium mb-1">#{center.id}</div>
              <h3 className="font-semibold text-lg">{center.centerName}</h3>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{center.appointmentDate}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{center.appointmentTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{center.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <History className="h-4 w-4" />
              <span>Last Booking: {center.lastBooking}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <Link href="/centres/center-detail">
              <Button variant="link" className="p-0 h-auto font-medium">
                View Details
              </Button>
            </Link>
            <Link href={`/centres/add-center?edit=true&id=${center.id}`}>
              <Button variant="link" className="p-0 h-auto font-medium">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const RoleWrapper = () => {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "admin"
  return <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />
}

export default function CentersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [centers, setCenters] = useState<Center[]>([])

  // Load centers from localStorage on component mount
  useEffect(() => {
    // Default centers - moved inside the useEffect to avoid recreating on every render
    const defaultCenters: Center[] = [
      {
        id: "CTR0005",
        centerName: "Apollo Medical Center",
        appointmentDate: "26 Sep 2024",
        appointmentTime: "10:20 AM",
        location: "Bangalore, Karnataka",
        lastBooking: "11 Feb 2024",
        image: "/placeholder.svg?height=200&width=200",
        country: "United States",
        state: "California",
        city: "San Francisco",
      },
      {
        id: "CTR0006",
        centerName: "Fortis Healthcare",
        appointmentDate: "25 Aug 2024",
        appointmentTime: "10:45 AM",
        location: "Mumbai, Maharashtra",
        lastBooking: "03 Jan 2024",
        image: "/placeholder.svg?height=200&width=200",
        country: "United Kingdom",
        state: "England",
        city: "London",
      },
      {
        id: "CTR0007",
        centerName: "Max Super Speciality Hospital",
        appointmentDate: "27 Aug 2024",
        appointmentTime: "10:45 AM",
        location: "Delhi, Delhi",
        lastBooking: "03 Jan 2024",
        image: "/placeholder.svg?height=200&width=200",
        country: "Canada",
        state: "Ontario",
        city: "Toronto",
      },
    ]

    const storedCenters = localStorage.getItem("medicalCenters")
    if (storedCenters) {
      setCenters([...defaultCenters, ...JSON.parse(storedCenters)])
    } else {
      setCenters(defaultCenters)
    }
  }, []) // Empty dependency array since defaultCenters is now inside the effect

  const filteredCenters = centers.filter(
    (center) =>
      center.centerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex m-8">
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <RoleWrapper />
        </Suspense>
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Centers</h1>
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-full max-w-md">
                <Input
                  type="text"
                  placeholder="Search centers"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              </div>
              <Link href="/centres/add-center">
                <Button className="bg-[#4ead91] hover:bg-[#3c9a7f] text-white">Add Center</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCenters.map((center) => (
                <CenterCard key={center.id} center={center} />
              ))}
            </div>

            {filteredCenters.length === 0 && (
              <p className="text-center text-gray-500 mt-8">No centers found matching your search.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

