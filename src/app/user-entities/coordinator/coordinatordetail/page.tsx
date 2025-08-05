"use client"

import type React from "react"
import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, MapPin, Users, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"

// Import images
import noappointments from "@/app/assets/no-appointments.png"
import Patient from "@/app/assets/patients/patient.jpg"
import Patienttwo from "@/app/assets/patients/patient2.jpg"
import Patientthree from "@/app/assets/patients/patient3.jpg"
import Patientfour from "@/app/assets/patients/patient4.jpg"

type CoordinatorDetails = {
  id: string
  fullName: string
  age: number
  gender: string
  bloodType: string
  appointmentDate: string
  appointmentTime: string
  location: string
  lastBooking: string
  image: string | { src: string }
  phone: string
  email: string
  dob: string
  county: string
  state: string
  city: string
}

type Session = {
  id: string
  title: string
  date: string
  time: string
  location: string
  participants: number
  status: "upcoming" | "completed"
}

// Mock data for coordinator details
const coordinatorData: { [key: string]: CoordinatorDetails } = {
  Apt0001: {
    id: "Apt0001",
    fullName: "Sarah Connor",
    age: 29,
    gender: "Female",
    bloodType: "O+",
    appointmentDate: "15 Jan 2024",
    appointmentTime: "09:30 AM",
    location: "San Diego, USA",
    lastBooking: "20 Mar 2023",
    image: Patient,
    phone: "+1 (555) 123-4567",
    email: "sarah.connor@email.com",
    dob: "15 March 1995",
    county: "San Diego County",
    state: "California",
    city: "San Diego",
  },
  Apt0002: {
    id: "Apt0002",
    fullName: "John Reese",
    age: 32,
    gender: "Male",
    bloodType: "A-",
    appointmentDate: "18 Feb 2024",
    appointmentTime: "10:00 AM",
    location: "Las Vegas, USA",
    lastBooking: "25 Apr 2023",
    image: Patienttwo,
    phone: "+1 (555) 987-6543",
    email: "john.reese@email.com",
    dob: "22 August 1992",
    county: "Clark County",
    state: "Nevada",
    city: "Las Vegas",
  },
  Apt0003: {
    id: "Apt0003",
    fullName: "Kyle Smith",
    age: 45,
    gender: "Male",
    bloodType: "B+",
    appointmentDate: "20 Mar 2024",
    appointmentTime: "11:00 AM",
    location: "Phoenix, USA",
    lastBooking: "30 May 2023",
    image: Patientthree,
    phone: "+1 (555) 456-7890",
    email: "kyle.smith@email.com",
    dob: "10 December 1978",
    county: "Maricopa County",
    state: "Arizona",
    city: "Phoenix",
  },
  Apt0004: {
    id: "Apt0004",
    fullName: "Ellen Ripley",
    age: 40,
    gender: "Female",
    bloodType: "AB-",
    appointmentDate: "22 Apr 2024",
    appointmentTime: "01:30 PM",
    location: "Dallas, USA",
    lastBooking: "05 Jun 2023",
    image: Patientfour,
    phone: "+1 (555) 321-0987",
    email: "ellen.ripley@email.com",
    dob: "05 July 1984",
    county: "Dallas County",
    state: "Texas",
    city: "Dallas",
  },
  Apt0005: {
    id: "Apt0005",
    fullName: "Anderea Kearns",
    age: 40,
    gender: "Female",
    bloodType: "B-",
    appointmentDate: "26 Sep 2024",
    appointmentTime: "10:20 AM",
    location: "San Francisco, USA",
    lastBooking: "11 Feb 2024",
    image: Patient,
    phone: "+1 (555) 654-3210",
    email: "anderea.kearns@email.com",
    dob: "18 November 1983",
    county: "San Francisco County",
    state: "California",
    city: "San Francisco",
  },
  Apt0006: {
    id: "Apt0006",
    fullName: "Darrell Tan",
    age: 31,
    gender: "Male",
    bloodType: "AB+",
    appointmentDate: "25 Aug 2024",
    appointmentTime: "10:45 AM",
    location: "San Antonio, USA",
    lastBooking: "03 Jan 2024",
    image: Patienttwo,
    phone: "+1 (555) 789-0123",
    email: "darrell.tan@email.com",
    dob: "30 September 1993",
    county: "Bexar County",
    state: "Texas",
    city: "San Antonio",
  },
}

// Mock sessions data with healing-focused names
const sessionsData: Session[] = [
  {
    id: "1",
    title: "Head Healing Energy Session",
    date: "2024-01-15",
    time: "09:00 AM",
    location: "Las Vegas Medical Center",
    participants: 25,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Back & Spine Healing Therapy",
    date: "2024-01-20",
    time: "02:00 PM",
    location: "Community Health Center",
    participants: 18,
    status: "completed",
  },
  {
    id: "3",
    title: "Heart Healing Pranic Session",
    date: "2024-01-25",
    time: "10:30 AM",
    location: "Las Vegas Convention Center",
    participants: 42,
    status: "upcoming",
  },
  {
    id: "4",
    title: "Leg Healing & Energy Alignment",
    date: "2024-02-01",
    time: "08:30 AM",
    location: "Central Medical Plaza",
    participants: 35,
    status: "upcoming",
  },
];


// Session Card Component
const SessionCard = ({ session }: { session: Session }) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{session.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span>{new Date(session.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-500" />
                <span className="truncate">{session.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                <span>{session.participants} participants</span>
              </div>
            </div>
          </div>
          <Badge
            variant={session.status === "upcoming" ? "default" : "secondary"}
            className={`ml-4 ${
              session.status === "upcoming"
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
          >
            {session.status}
          </Badge>
        </div>
        <div className="text-sm text-gray-500">Time: {session.time}</div>
      </CardContent>
    </Card>
  )
}

// Profile Information Component
const ProfileInfo = ({ coordinator }: { coordinator: CoordinatorDetails }) => {
  const personalInfo = [
    { label: "ID", value: `#${coordinator.id}` },
    { label: "Full Name", value: coordinator.fullName },
    { label: "Age", value: `${coordinator.age} years` },
    { label: "Gender", value: coordinator.gender },
    { label: "Blood Type", value: coordinator.bloodType },
    { label: "Date of Birth", value: coordinator.dob },
  ]

  const contactInfo = [
    { label: "Phone", value: coordinator.phone },
    { label: "Email", value: coordinator.email },
  ]

  const locationInfo = [
    { label: "City", value: coordinator.city },
    { label: "County", value: coordinator.county },
    { label: "State", value: coordinator.state },
  ]

  const InfoSection = ({ title, items }: { title: string; items: { label: string; value: string }[] }) => (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">{title}</h3>
      <div className="space-y-2">
        {items.map(({ label, value }) => (
          <div key={label} className="flex flex-col sm:flex-row sm:justify-between">
            <span className="text-sm font-medium text-gray-600 min-w-0 sm:w-1/3">{label}:</span>
            <span className="text-sm text-gray-900 font-medium sm:w-2/3 sm:text-right break-words">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <Card className="h-fit sticky top-6 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 flex-shrink-0">
            <Image
              src={typeof coordinator.image === "string" ? coordinator.image : coordinator.image.src}
              alt={coordinator.fullName || "Coordinator"}
              fill
              className="object-cover rounded-full border-4 border-white shadow-md"
              unoptimized
            />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-xl text-gray-900 truncate">{coordinator.fullName}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Coordinator Profile</p>
            <Badge variant="outline" className="mt-2 text-xs">
              {coordinator.bloodType}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <InfoSection title="Personal Information" items={personalInfo} />
        <Separator />
        <InfoSection title="Contact Information" items={contactInfo} />
        <Separator />
        <InfoSection title="Location" items={locationInfo} />
        <Separator />
      </CardContent>
    </Card>
  )
}

// Empty State Component
const EmptyState = ({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}) => (
  <Card className="p-8 shadow-md">
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      <div className="flex items-center justify-center">{icon}</div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <p className="text-gray-500 max-w-md">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  </Card>
)

function CoordinatorDetailContent() {
  const searchParams = useSearchParams()
  const coordinatorId = searchParams.get("id")
  const currentTab = searchParams.get("tab") || "requests"
  const router = useRouter()

  const [acceptState, setAcceptState] = useState<"idle" | "loading" | "accepted">("idle")

  const handleAcceptRequest = async () => {
    setAcceptState("loading")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setAcceptState("accepted")
  }

  const coordinator = coordinatorId ? coordinatorData[coordinatorId] : null

  if (!coordinator) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <EmptyState
          icon={<div className="text-6xl mb-4">🔍</div>}
          title="Coordinator Not Found"
          description="The coordinator you're looking for doesn't exist or may have been removed."
          action={
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          }
        />
      </div>
    )
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case "requests":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-end">
              <Button
                onClick={handleAcceptRequest}
                disabled={acceptState !== "idle"}
                className={`transition-colors duration-300 shadow-md ${
                  acceptState === "accepted"
                    ? "bg-green-600 hover:bg-green-700"
                    : acceptState === "loading"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {acceptState === "loading" && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                )}
                {acceptState === "accepted" && <Check className="h-4 w-4 mr-2" />}
                {acceptState === "idle" && "Accept Request"}
                {acceptState === "loading" && "Processing..."}
                {acceptState === "accepted" && "Accepted"}
              </Button>
            </div>
            <EmptyState
              icon={
                <div className="mb-4">
                  <Image
                    src={noappointments || "/placeholder.svg"}
                    alt="No appointments"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
              }
              title="Request Pending"
              description="This coordinator request is awaiting approval. Review the profile information and accept or decline the request."
            />
          </div>
        )
      case "active":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Session Management</h2>
              <Badge variant="outline" className="text-green-600 border-green-600 px-3 py-1">
                {sessionsData.length} Active Sessions
              </Badge>
            </div>
            <div className="grid gap-4">
              {sessionsData.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          </div>
        )
      case "inactive":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Inactive Status</h2>
            <EmptyState
              icon={<div className="text-6xl mb-4">😴</div>}
              title="Inactive Coordinator"
              description="This coordinator is currently inactive and not managing any sessions. You can reactivate them at any time."
              action={
                <Button variant="outline" className="shadow-sm bg-transparent">
                  Reactivate Coordinator
                </Button>
              }
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Profile Card - Left Side */}
        <div className="xl:col-span-1">
          <ProfileInfo coordinator={coordinator} />
        </div>

        {/* Tab Content - Right Side */}
        <div className="xl:col-span-2">{renderTabContent()}</div>
      </div>
    </div>
  )
}

function SidebarWithRole() {
  return <Sidebar />
}

function SidebarFallback() {
  return (
    <div className="w-full min-h-screen animate-pulse">
      <div className="p-4 space-y-4">
        <div className="h-8 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CoordinatorDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex m-9">
        <Suspense fallback={<SidebarFallback />}>
          <SidebarWithRole />
        </Suspense>
        <main
          className="flex-1 p-6 min-h-screen overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <Suspense fallback={<div>Loading coordinator details...</div>}>
            <CoordinatorDetailContent />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
