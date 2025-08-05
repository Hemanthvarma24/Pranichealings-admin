"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import AdminHealingDetails from "@/components/admin-healing-details"
import CoordinatorHealingDetails from "@/components/coordinator-healing-details"
import HealerHealingDetails from "@/components/healer-healing-details"

// Component that uses useSearchParams wrapped in its own component
function SidebarWithRole({ role }: { role: string }) {
  return <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />
}

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-t-[#48c373] border-b-[#48c373] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// Inner component that uses useSearchParams
function HealingDetailsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Get role from URL parameter or localStorage
    const roleFromUrl = searchParams.get("role")
    const roleFromStorage = localStorage.getItem("userRole")
    
    // Prioritize URL parameter, fallback to localStorage
    const role = roleFromUrl || roleFromStorage
    
    if (role) {
      // Save role to localStorage for persistence
      localStorage.setItem("userRole", role)
      setUserRole(role)
    } else {
      // If no role is found, redirect to login
      router.push("/")
    }
    
    setIsLoading(false)
  }, [searchParams, router])
  
  if (isLoading) {
    return <LoadingSpinner />
  }
  
  return (
    <div className="min-h-screen  flex flex-col">
      <Header />
      <div className="flex flex-1 m-8">
        {userRole && <SidebarWithRole role={userRole} />}
        <main className="flex-1 p-6 h-screen overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="max-w-7xl mx-auto h-screen overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Render different components based on user role */}
            {userRole === "admin" && <AdminHealingDetails />}
            {userRole === "coordinators" && <CoordinatorHealingDetails />}
            {userRole === "healers" && <HealerHealingDetails />}
            
            {/* Show error message if role is invalid */}
            {userRole && !["admin", "coordinators", "healers"].includes(userRole) && (
              <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
                <p className="text-red-600 font-medium">Invalid user role. Please log in again.</p>
                <Button className="mt-4 bg-[#48c373] hover:bg-[#3d9c80]" onClick={() => router.push("/")}>
                  Return to Login
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function HealingDetailsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HealingDetailsContent />
    </Suspense>
  )
}