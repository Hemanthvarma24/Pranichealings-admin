"use client"

import { Suspense } from "react"
import Image from "next/image"
import { Star, MapPin, Phone, Mail, Globe, Calendar, Award, Users, Building, ArrowLeft } from "lucide-react"
import { Header } from "@/components/dashboard/header"
import { Footer } from "@/components/dashboard/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useSearchParams, useRouter } from "next/navigation"

// Import images (you'll need to add these to your assets)
import CenterImage from "@/app/assets/Apollo.jpeg"
import MapImage from "@/app/assets/centers/map.png"

function SidebarWrapper() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "admin"

  return <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />
}

function RoleWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarWrapper />
    </Suspense>
  )
}

export default function CenterDetail() {
  const centerData = {
    name: "Apollo Medical Center",
    id: "CTR0005",
    status: "Active",
    location: "Bangalore, Karnataka, India",
    established: "2010",
    rating: 4.8,
    totalReviews: 156,
    phone: "+91 9876543210",
    email: "contact@apollomedical.com",
    website: "www.apollomedical.com",
    description:
      "Apollo Medical Center is a leading healthcare facility providing comprehensive medical services with state-of-the-art technology and experienced medical professionals. We are committed to delivering exceptional patient care across various medical specialties.",
    address: {
      street: "123 Medical Avenue",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      pincode: "560001",
      nearby: "Near Central Business District",
    },
    businessHours: [
      { day: "Monday", hours: "08:00 AM - 10:00 PM" },
      { day: "Tuesday", hours: "08:00 AM - 10:00 PM" },
      { day: "Wednesday", hours: "08:00 AM - 10:00 PM" },
      { day: "Thursday", hours: "08:00 AM - 10:00 PM" },
      { day: "Friday", hours: "08:00 AM - 10:00 PM" },
      { day: "Saturday", hours: "08:00 AM - 08:00 PM" },
      { day: "Sunday", hours: "09:00 AM - 06:00 PM" },
    ],
    specialties: [
      "Cardiology",
      "Neurology",
      "Orthopedics",
      "Pediatrics",
      "Oncology",
      "Emergency Medicine",
      "Radiology",
      "Laboratory Services",
    ],
    facilities: [
      "24/7 Emergency Services",
      "ICU & CCU",
      "Operation Theaters",
      "Diagnostic Center",
      "Pharmacy",
      "Blood Bank",
      "Ambulance Services",
      "Parking Facility",
    ],
    certifications: ["NABH Accredited", "ISO 9001:2015 Certified", "NABL Accredited Lab", "Green OT Certification"],
    stats: {
      totalDoctors: 45,
      totalBeds: 120,
      yearsOfService: 14,
      patientsServed: "50,000+",
    },
  }

  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex m-8">
        <RoleWrapper />
        <main className="flex-1 p-8 h-screen overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {/* Page Header with Back Button and Title */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Centers Details</h1>
          </div>

          {/* Center Header Section */}
          <Card className="mb-8 bg-white shadow-sm">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/4">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={CenterImage || "/placeholder.svg"}
                      alt={centerData.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="lg:w-3/4 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold text-gray-900">{centerData.name}</h2>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {centerData.status}
                        </Badge>
                      </div>
                      <p className="text-lg text-gray-600 mb-4">Center ID: {centerData.id}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="h-5 w-5 text-blue-600" />
                        <span>{centerData.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span>Established: {centerData.established}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="h-5 w-5 text-blue-600" />
                        <span>{centerData.phone}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <span>{centerData.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Globe className="h-5 w-5 text-blue-600" />
                        <span>{centerData.website}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          {Array(5)
                            .fill(null)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(centerData.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                        </div>
                        <span className="text-gray-700">
                          {centerData.rating} ({centerData.totalReviews} Reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{centerData.stats.totalDoctors}</div>
                      <div className="text-sm text-gray-600">Doctors</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <Building className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{centerData.stats.totalBeds}</div>
                      <div className="text-sm text-gray-600">Beds</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <Calendar className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{centerData.stats.yearsOfService}</div>
                      <div className="text-sm text-gray-600">Years</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 text-center">
                      <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">{centerData.stats.patientsServed}</div>
                      <div className="text-sm text-gray-600">Patients</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-white p-2 rounded-lg shadow-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="specialties"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Specialties
              </TabsTrigger>
              <TabsTrigger
                value="facilities"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Facilities
              </TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Location
              </TabsTrigger>
              <TabsTrigger value="hours" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Business Hours
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Certifications
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About {centerData.name}</h2>
                  <p className="text-gray-700 leading-relaxed">{centerData.description}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specialties" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Medical Specialties</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {centerData.specialties.map((specialty, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="font-medium text-gray-800">{specialty}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="facilities" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Available Facilities</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {centerData.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span className="text-gray-800">{facility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Location & Address</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="aspect-video relative rounded-lg overflow-hidden">
                        <Image
                          src={MapImage || "/placeholder.svg"}
                          alt="Location Map"
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">Complete Address</h3>
                        <div className="space-y-2 text-gray-700">
                          <p>{centerData.address.street}</p>
                          <p>
                            {centerData.address.city}, {centerData.address.state}
                          </p>
                          <p>
                            {centerData.address.country} - {centerData.address.pincode}
                          </p>
                          <p className="text-sm text-gray-600">{centerData.address.nearby}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2">Contact Information</h4>
                        <div className="space-y-2 text-sm text-gray-700">
                          <p>Phone: {centerData.phone}</p>
                          <p>Email: {centerData.email}</p>
                          <p>Website: {centerData.website}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="hours" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Business Hours</h2>
                  <div className="space-y-3">
                    {centerData.businessHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
                        <span className="font-medium text-gray-800">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="certifications" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Certifications & Accreditations</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {centerData.certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Award className="h-6 w-6 text-green-600" />
                        <span className="font-medium text-green-800">{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
