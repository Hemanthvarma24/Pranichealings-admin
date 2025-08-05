"use client"

import { Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, User, Heart, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"

// Import patient images
import Patient from "@/app/assets/patients/patient.jpg"

type PatientDetails = {
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
  status?: "pending" | "processing" | "completed"
  phone: string
  email: string
  dob: string
  county: string
  state: string
  city: string
}

type HealingSession = {
  id: string
  title: string
  type: "Reiki" | "Acupuncture" | "Massage" | "Energy Healing" | "Meditation" | "Chakra Balancing"
  date: string
  time: string
  duration: string
  therapist: string
  status: "completed" | "upcoming" | "in-progress"
  notes: string
  rating?: number
  benefits: string[]
}

// Mock data for patient details
const patientData: { [key: string]: PatientDetails } = {
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
    status: "pending",
    phone: "+1 (555) 123-4567",
    email: "sarah.connor@email.com",
    dob: "15 March 1995",
    county: "San Diego County",
    state: "California",
    city: "San Diego",
  },
  // ... (keeping all other patient data as is)
}

// Mock healing sessions data
const healingSessions: { [key: string]: HealingSession[] } = {
  Apt0001: [
    {
      id: "HS001",
      title: "Deep Relaxation Reiki",
      type: "Reiki",
      date: "Dec 28, 2024",
      time: "10:00 AM",
      duration: "60 min",
      therapist: "Dr. Maya Chen",
      status: "upcoming",
      notes: "Focus on stress relief and energy balance",
      benefits: ["Stress Relief", "Energy Balance", "Deep Relaxation"],
    },
    {
      id: "HS002",
      title: "Therapeutic Massage",
      type: "Massage",
      date: "Dec 20, 2024",
      time: "2:30 PM",
      duration: "90 min",
      therapist: "Lisa Rodriguez",
      status: "completed",
      notes: "Excellent session, patient reported significant pain relief",
      rating: 5,
      benefits: ["Pain Relief", "Muscle Tension", "Circulation"],
    },
    {
      id: "HS003",
      title: "Chakra Alignment",
      type: "Chakra Balancing",
      date: "Dec 15, 2024",
      time: "11:00 AM",
      duration: "75 min",
      therapist: "Michael Thompson",
      status: "completed",
      notes: "Root and heart chakras needed attention",
      rating: 4,
      benefits: ["Energy Flow", "Emotional Balance", "Spiritual Wellness"],
    },
    {
      id: "HS004",
      title: "Acupuncture Treatment",
      type: "Acupuncture",
      date: "Dec 10, 2024",
      time: "9:15 AM",
      duration: "45 min",
      therapist: "Dr. James Liu",
      status: "completed",
      notes: "Targeted treatment for lower back pain",
      rating: 5,
      benefits: ["Pain Management", "Improved Sleep", "Stress Reduction"],
    },
    {
      id: "HS005",
      title: "Guided Meditation",
      type: "Meditation",
      date: "Jan 5, 2025",
      time: "6:00 PM",
      duration: "30 min",
      therapist: "Sarah Williams",
      status: "upcoming",
      notes: "Mindfulness and breathing techniques",
      benefits: ["Mental Clarity", "Anxiety Relief", "Inner Peace"],
    },
  ],
}

const getSessionIcon = (type: HealingSession["type"]) => {
  switch (type) {
    case "Reiki":
      return <Heart className="h-5 w-5" />
    case "Acupuncture":
      return <Zap className="h-5 w-5" />
    case "Massage":
      return <Activity className="h-5 w-5" />
    case "Energy Healing":
      return <Heart className="h-5 w-5" />
    case "Meditation":
      return <User className="h-5 w-5" />
    case "Chakra Balancing":
      return <Zap className="h-5 w-5" />
    default:
      return <Heart className="h-5 w-5" />
  }
}

const getStatusColor = (status: HealingSession["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "upcoming":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "in-progress":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function PatientDetailContent() {
  const searchParams = useSearchParams()
  const patientId = searchParams.get("id")
  const router = useRouter()

  const patient = patientId ? patientData[patientId] : null
  const sessions = patientId ? healingSessions[patientId] || [] : []

  if (!patient) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Not Found</h2>
          <p className="text-gray-600 mb-4">The patient you're looking for doesn't exist.</p>
          <Button onClick={() => router.back()}>Back to Patients</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4">
        <Button variant="outline" className="flex items-center gap-2 bg-transparent" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back 
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Patient Information */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Profile Image and Name */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative h-20 w-20">
              <Image
                src={typeof patient.image === "string" ? patient.image : patient.image.src}
                alt={patient.fullName || "Patient"}
                fill
                className="object-cover border border-gray-300 rounded-full"
                unoptimized
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">{patient.fullName}</h1>
          </div>

          {/* Patient Details */}
          <div className="space-y-3 text-sm">
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">ID:</span>
              <span className="text-gray-700">#{patient.id}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Full Name:</span>
              <span className="text-gray-700">{patient.fullName}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Phone:</span>
              <span className="text-gray-700">{patient.phone}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Email:</span>
              <span className="text-gray-700">{patient.email}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Date of Birth:</span>
              <span className="text-gray-700">{patient.dob}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Age:</span>
              <span className="text-gray-700">{patient.age} years</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Gender:</span>
              <span className="text-gray-700">{patient.gender}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Blood Type:</span>
              <span className="text-gray-700">{patient.bloodType}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">County:</span>
              <span className="text-gray-700">{patient.county}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">State:</span>
              <span className="text-gray-700">{patient.state}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">City:</span>
              <span className="text-gray-700">{patient.city}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Next Appointment:</span>
              <span className="text-gray-700">
                {patient.appointmentDate} at {patient.appointmentTime}
              </span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Last Booking:</span>
              <span className="text-gray-700">{patient.lastBooking}</span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 w-40">Status:</span>
              <span className="text-gray-700 capitalize">{patient.status || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Healing Session Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Healing Sessions</h2>

          {sessions.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No healing sessions found for this patient.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none"}}>
              {sessions.map((session) => (
                <Card key={session.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">{getSessionIcon(session.type)}</div>
                        <div>
                          <CardTitle className="text-lg font-medium">{session.title}</CardTitle>
                          <p className="text-sm text-gray-600">{session.type}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(session.status)} capitalize`}>
                        {session.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Session Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{session.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>Therapist: {session.therapist}</span>
                      </div>

                      <div className="text-sm">
                        <span className="font-medium">Duration: </span>
                        <span className="text-gray-600">{session.duration}</span>
                      </div>

                      {/* Benefits */}
                      <div>
                        <p className="text-sm font-medium mb-2">Benefits:</p>
                        <div className="flex flex-wrap gap-1">
                          {session.benefits.map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Notes */}
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium mb-1">Notes:</p>
                        <p className="text-sm text-gray-600">{session.notes}</p>
                      </div>

                      {/* Rating (for completed sessions) */}
                      {session.rating && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Rating:</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${i < session.rating! ? "text-yellow-400" : "text-gray-300"}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SidebarWithRole() {
  return <Sidebar />
}

function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse h-screen"></div>
}

export default function PatientDetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex m-8">
        <Suspense fallback={<SidebarFallback />}>
          <SidebarWithRole />
        </Suspense>
        <main
          className="flex-1 p-6 h-screen overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none"}}
        >
          <Suspense fallback={<div>Loading patient details...</div>}>
            <PatientDetailContent />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
