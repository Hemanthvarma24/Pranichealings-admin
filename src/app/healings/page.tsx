"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { Calendar, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image, { StaticImageData } from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

type Appointment = {
  id: string;
  patient: string;
  image: StaticImageData | string;
  date: string;
  email: (name: string) => string;
  phone: string;
  type: string;
  mode: string;
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
    type: "General Visit",
    mode: ["Video Call", "Audio Call", "Chat", "Direct Visit"][i % 4],
    isNew: i === 1,
  }));
};

// Component that uses useSearchParams wrapped in its own component
function SidebarWithRole() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin" || "healers" || "coordinators";
  
  return <Sidebar role={role} />;
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
                <Button variant="outline" className="h-9">
                  <Calendar className="mr-2 h-4 w-4" />
                  08/04/2020 - 08/11/2020
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input placeholder="Search" className="w-[300px] pl-9" />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <Select defaultValue="all">
                    <SelectTrigger className="h-9 w-[180px]">
                      <SelectValue placeholder="Filter By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Appointments</SelectItem>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="audio">Audio Call</SelectItem>
                      <SelectItem value="chat">Chat</SelectItem>
                      <SelectItem value="direct">Direct Visit</SelectItem>
                    </SelectContent>
                  </Select>
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
        active ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
      }`}
    >
      {children}
      <span className={`rounded-full px-2 py-0.5 text-xs ${active ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-600"}`}>{count}</span>
    </button>
  );
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image src={appointment.image} alt={appointment.patient} className="h-10 w-10 rounded-full" unoptimized />
          {appointment.isNew && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-green-500 text-[8px] font-bold text-white">
              NEW
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{appointment.patient}</span>
            <span className="text-xs text-blue-500">#{appointment.id}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span>{appointment.type}</span>
            <span>{appointment.mode}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div>
          <div className="font-medium">{appointment.email(appointment.patient)}</div>
          <div className="text-gray-500">{appointment.phone}</div>
        </div>
        <div>
          <div className="font-medium">{appointment.date}</div>
          <div className="text-gray-500">{appointment.mode}</div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            View
          </Button>
          <Button size="sm" variant="outline">
            Chat
          </Button>
          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-600">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}