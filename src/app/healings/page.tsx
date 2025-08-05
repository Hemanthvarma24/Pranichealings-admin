"use client"

import type React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image, { type StaticImageData } from "next/image"
import Link from "next/link"

import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"

import patient1 from "@/app/assets/patients/patient1.jpg"
import patient2 from "@/app/assets/patients/patient2.jpg"
import patient3 from "@/app/assets/patients/patient3.jpg"
import patient4 from "@/app/assets/patients/patient4.jpg"
import patient5 from "@/app/assets/patients/patient5.jpg"
import patient6 from "@/app/assets/patients/patient6.jpg"
import patient7 from "@/app/assets/patients/patient7.jpg"

type Appointment = {
  id: string
  patient: string
  image: StaticImageData
  date: string
  email: (name: string) => string
  phone: string
  isNew: boolean
}

const getPatientImage = (name: string): StaticImageData => {
  const imageMap: { [key: string]: StaticImageData } = {
    Adrian: patient1,
    Kelly: patient2,
    Samuel: patient3,
    Catherine: patient4,
    Robert: patient5,
    Andreea: patient6,
    Peter: patient7,
    Emily: patient3,
  }
  return imageMap[name] || patient1
}

const generateAppointments = (count: number): Appointment[] => {
  const names = ["Adrian", "Kelly", "Samuel", "Catherine", "Robert", "Andreea", "Peter", "Emily"]
  return Array.from({ length: count }, (_, i) => {
    const name = names[i % names.length]
    return {
      id: `Apt${(i + 1).toString().padStart(3, "0")}`,
      patient: name,
      image: getPatientImage(name),
      date: new Date(2024, 0, i + 1, 9, 0).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }),
      email: (name) => `${name.toLowerCase()}@example.com`,
      phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 10000)}`,
      isNew: i === 1,
    }
  })
}

function SidebarWithRole() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "admin"
  return <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />
}

function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse h-screen"></div>
}

function RoleManager({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const roleFromUrl = searchParams.get("role")
    const roleFromStorage = localStorage.getItem("userRole")
    const role = roleFromUrl || roleFromStorage

    if (role) {
      localStorage.setItem("userRole", role)
    } else {
      router.push("/")
    }
    setIsLoaded(true)
  }, [searchParams, router])

  if (!isLoaded) {
    return <div className="w-full h-screen bg-gray-50 animate-pulse"></div>
  }

  return <>{children}</>
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "cancelled" | "completed">("upcoming")

  const shuffle = (array: Appointment[]) => array.sort(() => Math.random() - 0.5)
  const allAppointments = shuffle(generateAppointments(24))
  const requests = allAppointments.slice(0, 8)
  const ongoing = allAppointments.slice(8, 16)
  const completed = allAppointments.slice(16, 24)

  const getAppointmentsByTab = () => {
    if (activeTab === "upcoming") return requests
    if (activeTab === "cancelled") return ongoing
    return completed
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 rounded-full border-2 border-t-transparent border-[#48c373]"></div>
        </div>
      }
    >
      <RoleManager>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <div className="flex flex-1 m-8">
            <Suspense fallback={<SidebarFallback />}>
              <SidebarWithRole />
            </Suspense>
            <main
              className="flex-1 p-6 h-screen overflow-y-auto"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div className="max-w-7xl mx-auto">
                {/* Added Healing Heading */}
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Healing</h1>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-4 border-b">
                    <TabButton
                      active={activeTab === "upcoming"}
                      onClick={() => setActiveTab("upcoming")}
                      count={requests.length}
                    >
                      Requests
                    </TabButton>
                    <TabButton
                      active={activeTab === "cancelled"}
                      onClick={() => setActiveTab("cancelled")}
                      count={ongoing.length}
                    >
                      Ongoing
                    </TabButton>
                    <TabButton
                      active={activeTab === "completed"}
                      onClick={() => setActiveTab("completed")}
                      count={completed.length}
                    >
                      Completed
                    </TabButton>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input placeholder="Search" className="w-[300px] pl-9" />
                  </div>
                </div>
                <div className="space-y-4">
                  {getAppointmentsByTab().map((appointment) => (
                    <AppointmentRow key={appointment.id} appointment={appointment} activeTab={activeTab} />
                  ))}
                </div>
              </div>
            </main>
          </div>
        </div>
      </RoleManager>
    </Suspense>
  )
}

function TabButton({
  children,
  active,
  count,
  onClick,
}: { children: React.ReactNode; active: boolean; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-4 py-2 font-medium ${active ? "border-[#48c373] text-[#48c373]" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"}`}
    >
      {children}
      <span
        className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-blue-50 text-black" : "bg-gray-100 text-gray-600"}`}
      >
        {count}
      </span>
    </button>
  )
}

function AppointmentRow({ appointment, activeTab }: { appointment: Appointment; activeTab: string }) {
  return (
    <Suspense fallback={<div className="h-20 animate-pulse bg-gray-100 rounded-lg"></div>}>
      <AppointmentRowContent appointment={appointment} activeTab={activeTab} />
    </Suspense>
  )
}

function AppointmentRowContent({ appointment, activeTab }: { appointment: Appointment; activeTab: string }) {
  const searchParams = useSearchParams()
  const userRole = searchParams.get("role") || localStorage.getItem("userRole") || "admin"
  const [imageError, setImageError] = useState(false)

  const handleAccept = () => {
    // Handle accept logic here
    console.log(`Accepted appointment ${appointment.id}`)
  }

  const renderActionButton = () => {
    // Admin role: View button in all tabs
    if (userRole === "admin") {
      // Pass context parameter to indicate if it's from requests
      const contextParam = activeTab === "upcoming" ? "&context=request" : ""
      return (
        <Link href={`/healings/healings-details?role=${userRole}${contextParam}`}>
          <Button size="lg" variant="outline" className="bg-white text-gray-700 hover:bg-gray-50 border-gray-300">
            View
          </Button>
        </Link>
      )
    }

    // Coordinators and Healers: Accept button in requests tab, View button in other tabs
    if (userRole === "coordinators" || userRole === "healers") {
      if (activeTab === "upcoming") {
        return (
          <Button
            size="lg"
            onClick={handleAccept}
            className="bg-[#48c373] text-white hover:bg-[#3d9574] border-[#48c373]"
          >
            Accept
          </Button>
        )
      }
      return (
        <Link href={`/healings/healings-details?role=${userRole}`}>
          <Button size="lg" variant="outline" className="bg-white text-gray-700 hover:bg-gray-50 border-gray-300">
            View
          </Button>
        </Link>
      )
    }

    // Default case
    return (
      <Link href={`/healings/healings-details?role=${userRole}`}>
        <Button size="lg" variant="outline" className="bg-white text-gray-700 hover:bg-gray-50 border-gray-300">
          View
        </Button>
      </Link>
    )
  }

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center w-1/6">
        <div className="relative mr-4">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-200">
            {!imageError ? (
              <Image
                src={appointment.image || "/placeholder.svg"}
                alt={`${appointment.patient} profile`}
                className="h-full w-full object-cover"
                width={48}
                height={48}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                {appointment.patient.charAt(0)}
              </div>
            )}
          </div>
          {appointment.isNew && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-green-500 text-[10px] font-bold text-white">
              NEW
            </span>
          )}
        </div>
        <div>
          <span className="text-sm text-blue-500 font-medium">#{appointment.id}</span>
          <div className="font-semibold text-gray-900">{appointment.patient}</div>
        </div>
      </div>
      <div className="w-1/6 text-center font-medium text-gray-700">{appointment.date}</div>
      <div className="w-1/6 text-center font-medium text-gray-600">{appointment.email(appointment.patient)}</div>
      <div className="w-1/6 text-center text-gray-500">{appointment.phone}</div>
      <div className="w-1/6 flex justify-end">{renderActionButton()}</div>
    </div>
  )
}
