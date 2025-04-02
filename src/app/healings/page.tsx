"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image, { StaticImageData } from "next/image";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Footer } from "@/components/dashboard/footer";
import Adrian from "@/app/assets/patients/patient1.jpg";
import kelly from "@/app/assets/patients/patient2.jpg";
import samuel from "@/app/assets/patients/patient4.jpg";
import catherine from "@/app/assets/patients/patient3.jpg";
import robert from "@/app/assets/patients/patient5.jpg";
import andreea from "@/app/assets/patients/patient6.jpg";
import peter from "@/app/assets/patients/patient7.jpg";
import emily from "@/app/assets/patients/patient8.jpg";
import Link from "next/link";

type Appointment = {
  id: string;
  patient: string;
  image: StaticImageData | string;
  date: string;
  email: (name: string) => string;
  phone: string;
  isNew: boolean;
};

const generateAppointments = (count: number): Appointment[] => {
  const patientImages = [Adrian, kelly, samuel, catherine, robert, andreea, peter, emily];


  return Array.from({ length: count }, (_, i) => ({
    id: `Apt${(i + 1).toString().padStart(3, "0")}`,
    patient: ["Adrian", "Kelly", "Samuel", "Catherine", "Robert", "Andreea", "Peter", "Emily"][i % 8],
    image: patientImages[i % 8],
    date: new Date(2024, 0, i + 1, 9, 0).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
    email: (name: string) => `${name.toLowerCase()}@example.com`,
    phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(
      Math.random() * 10000
    )}`,
    isNew: i === 1,
  }));
};

// Component that uses useSearchParams wrapped in its own component
function SidebarWithRole() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin" || "healers" || "coordinators";
  
  return <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />;
}

// Fallback component to show while loading
function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse h-screen"></div>;
}

export default function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const appointments: Appointment[] = generateAppointments(8);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1 m-8">
        <Suspense fallback={<SidebarFallback />}>
          <SidebarWithRole />
        </Suspense>
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Healings</h1>
            {/* Tabs */}
            <div className="mb-6 border-b">
              <div className="flex gap-4">
                <TabButton active={activeTab === "upcoming"} onClick={() => setActiveTab("upcoming")} count={21}>
                  Requests
                </TabButton>
                <TabButton active={activeTab === "cancelled"} onClick={() => setActiveTab("cancelled")} count={16}>
                  Ongoing
                </TabButton>
                <TabButton active={activeTab === "completed"} onClick={() => setActiveTab("completed")} count={214}>
                  Completed
                </TabButton>
              </div>
            </div>
            {/* Filters */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search" className="w-[300px] pl-9" />
                </div>
              </div>
            </div>
            {/* Appointments List */}
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentRow key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function TabButton({ children, active, count, onClick }: { children: React.ReactNode; active: boolean; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-4 py-2 font-medium ${
        active ? "border-[#4ead91] text-[#4ead91]" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
    >
      {children}
      <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-blue-50 text-black" : "bg-gray-100 text-gray-600"}`}>{count}</span>
    </button>
  );
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
    <div className="flex items-center w-1/6">
      <div className="relative mr-4">
        <Image src={appointment.image} alt={appointment.patient} className="h-10 w-10 rounded-full" unoptimized />
        {appointment.isNew && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-green-500 text-[8px] font-bold text-white">
            NEW
          </span>
        )}
      </div>
      <div>
      <div className="flex flex-col">
  <span className="text-sm text-blue-500">#{appointment.id}</span>
  <span className="font-medium">{appointment.patient}</span>
</div>
      
      </div>
    </div>
    
    <div className="w-1/6 text-center">
      <div className="font-medium">{appointment.date}</div>
    </div>
    
    <div className="w-1/6 text-center">
      <div className="font-medium">{appointment.email(appointment.patient)}</div>
    </div>
    <div className="w-1/6 text-center">
    <div className="text-gray-500">{appointment.phone}</div>
    </div>
    
    <div className="w-1/6 flex justify-end">
    <Link href="/healings/healings-details">
          <Button size="lg" variant="outline">
            View
          </Button>
        </Link>
    </div>
  </div>
  );
}