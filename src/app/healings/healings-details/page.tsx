"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Calendar, Phone, Mail, User, MapPin, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/dashboard/header"
import { Footer } from "@/components/dashboard/footer"
import Link from "next/link"
import { Suspense } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

// Mock data - in a real app, you would fetch this from an API
import Adrian from "@/app/assets/patients/patient1.jpg"
import kelly from "@/app/assets/patients/patient2.jpg"
import samuel from "@/app/assets/patients/patient4.jpg"
import catherine from "@/app/assets/patients/patient3.jpg"
import robert from "@/app/assets/patients/patient5.jpg"
import andreea from "@/app/assets/patients/patient6.jpg"
import peter from "@/app/assets/patients/patient7.jpg"
import emily from "@/app/assets/patients/patient8.jpg"

const patientImages = {
  Adrian: Adrian,
  Kelly: kelly,
  Samuel: samuel,
  Catherine: catherine,
  Robert: robert,
  Andreea: andreea,
  Peter: peter,
  Emily: emily,
}

type Appointment = {
  id: string
  patient: string
  image: import("next/image").StaticImageData
  date: string
  email: string
  phone: string
  isNew: boolean
  address: string
  dob: string
  medicalHistory: string[]
  visits: Visit[]
  coordinators: Coordinator[]
}

type Visit = {
  date: string
  type: string
  notes: string
  healer: string
}

type Coordinator = {
  name: string
  role: string
  image: import("next/image").StaticImageData
}

// Component that uses useSearchParams wrapped in its own component
function SidebarWithRole() {
  return <Sidebar />
}

// Fallback component to show while loading
function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse h-screen"></div>
}

export default function HealingDetailsPage() {
  const params = useParams()
  const id = (params?.id as string) || "Apt001"
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Mock data for the specific appointment
      const mockAppointment: Appointment = {
        id: id,
        patient: ["Adrian", "Kelly", "Samuel", "Catherine", "Robert", "Andreea", "Peter", "Emily"][
          Number.parseInt(id.replace("Apt", "")) % 8
        ],
        image:
          patientImages[
            ["Adrian", "Kelly", "Samuel", "Catherine", "Robert", "Andreea", "Peter", "Emily"][
              Number.parseInt(id.replace("Apt", "")) % 8
            ] as keyof typeof patientImages
          ],
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        email: `${
          ["adrian", "kelly", "samuel", "catherine", "robert", "andreea", "peter", "emily"][
            Number.parseInt(id.replace("Apt", "")) % 8
          ]
        }@example.com`,
        phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(
          Math.random() * 10000,
        )}`,
        isNew: Number.parseInt(id.replace("Apt", "")) % 3 === 0,
        address: "123 Healing Street, Wellness City, WC 12345",
        dob: "Jan 15, 1985",
        medicalHistory: ["Chronic back pain", "Anxiety", "Insomnia", "Migraine headaches"],
        visits: [
          {
            date: "Mar 15, 2024",
            type: "Initial Consultation",
            notes:
              "Patient reported chronic back pain and sleep issues. Recommended energy healing sessions twice a week.",
            healer: "Dr. Sarah Johnson",
          },
          {
            date: "Mar 22, 2024",
            type: "Energy Healing",
            notes: "Patient showed improvement in sleep quality. Continuing with the treatment plan.",
            healer: "Dr. Sarah Johnson",
          },
          {
            date: "Mar 29, 2024",
            type: "Follow-up",
            notes: "Significant reduction in pain levels. Adjusted healing frequency to once a week.",
            healer: "Dr. Michael Chen",
          },
        ],
        coordinators: [
          {
            name: "Emma Wilson",
            role: "Primary Coordinator",
            image: andreea,
          },
          {
            name: "James Taylor",
            role: "Assistant Coordinator",
            image: samuel,
          },
        ],
      }

      setAppointment(mockAppointment)
      setLoading(false)
    }, 500)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 p-8 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-t-[#4ead91] border-b-[#4ead91] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Healing not found</h1>
            <Link href="/healings">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Healings
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 m-8">
        <Suspense fallback={<SidebarFallback />}>
          <SidebarWithRole />
        </Suspense>
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/healings">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Healing Details</h1>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Patient Info Sidebar (30%) */}
              <div className="w-full lg:w-[30%] space-y-6">
                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto relative mb-2">
                      <Image
                        src={appointment.image || "/placeholder.svg"}
                        alt={appointment.patient}
                        className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                        unoptimized
                      />
                      {appointment.isNew && (
                        <Badge className="absolute -right-1 top-0 bg-green-500 hover:bg-green-600">NEW</Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm font-medium text-blue-500 mb-1">
                      #{appointment.id}
                    </CardDescription>
                    <CardTitle className="text-2xl">{appointment.patient}</CardTitle>
                    <CardDescription className="text-sm font-medium text-blue-500 mt-1">
                      #{appointment.id}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{appointment.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{appointment.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>DOB: {appointment.dob}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{appointment.address}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <h3 className="font-medium">Appointment Details</h3>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>{appointment.date}</span>
                      </div>
                    </div>

                    <Separator />

                    <Button className="w-full bg-[#4ead91] hover:bg-[#3d9c80]">Assign Healing</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content (70%) */}
              <div className="w-full lg:w-[70%] space-y-6">
                <Tabs defaultValue="details">
                  <TabsList className="mb-4">
                    <TabsTrigger value="details">Patient Details</TabsTrigger>
                    <TabsTrigger value="visits">Visit History</TabsTrigger>
                    <TabsTrigger value="coordinators">Coordinators</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Medical History</CardTitle>
                        <CardDescription>Patient&apos;s medical background and conditions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-5 space-y-2">
                          {appointment.medicalHistory.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Treatment Plan</CardTitle>
                        <CardDescription>Current healing approach and recommendations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          Based on the patient&apos;s condition and previous visits, we recommend a comprehensive healing
                          plan focusing on energy balancing and stress reduction techniques.
                        </p>
                        <div className="space-y-2">
                          <h4 className="font-medium">Recommended Sessions:</h4>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Energy healing - twice weekly for 4 weeks</li>
                            <li>Meditation guidance - once weekly</li>
                            <li>Nutritional consultation - monthly follow-up</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Patient
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="visits" className="space-y-4">
                    {appointment.visits.map((visit, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">{visit.type}</CardTitle>
                            <Badge variant="outline">{visit.date}</Badge>
                          </div>
                          <CardDescription>Healer: {visit.healer}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{visit.notes}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="coordinators" className="space-y-4">
                    {appointment.coordinators.map((coordinator, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <Image
                              src={coordinator.image || "/placeholder.svg"}
                              alt={coordinator.name}
                              className="h-16 w-16 rounded-full object-cover"
                              unoptimized
                            />
                            <div>
                              <h3 className="font-medium text-lg">{coordinator.name}</h3>
                              <p className="text-sm text-gray-500">{coordinator.role}</p>
                              <Button variant="link" className="p-0 h-auto text-[#4ead91]">
                                Contact
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}