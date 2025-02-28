"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Calendar, Clock, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Footer } from "@/components/dashboard/footer";
import Patient from "@/app/assets/patients/patient.jpg";
import Patienttwo from "@/app/assets/patients/patient2.jpg";
import Patientthree from "@/app/assets/patients/patient4.jpg";
import { useSearchParams } from "next/navigation";

type Appointment = {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  bloodType?: string;
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  lastBooking: string;
  image: string | { src: string };
};

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src={typeof appointment.image === "string" ? appointment.image : appointment.image.src}
            alt={appointment.name}
            fill
            className="rounded-lg object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-blue-600 font-medium mb-1">#{appointment.id}</div>
              <h3 className="font-semibold text-lg">{appointment.name}</h3>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{appointment.appointmentDate}</span>
              <Clock className="h-4 w-4 ml-2" />
              <span>{appointment.appointmentTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{appointment.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <History className="h-4 w-4" />
              <span>Last Booking: {appointment.lastBooking}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <Link href="/centres/center-detail">
              <Button variant="link" className="p-0 h-auto font-medium">View Details</Button>
            </Link>
            <Link href="/centres/add-center">
              <Button variant="link" className="p-0 h-auto font-medium">Edit</Button>
            </Link>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const RoleWrapper = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin";
  return <Sidebar role={role} />;
};

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const appointments: Appointment[] = [
    {
      id: "Apt0005",
      name: "Anderea Kearns",
      appointmentDate: "26 Sep 2024",
      appointmentTime: "10:20 AM",
      location: "San Francisco, USA",
      lastBooking: "11 Feb 2024",
      image: Patient,
    },
    {
      id: "Apt0006",
      name: "Darrell Tan",
      appointmentDate: "25 Aug 2024",
      appointmentTime: "10:45 AM",
      location: "San Antonio, USA",
      lastBooking: "03 Jan 2024",
      image: Patienttwo,
    },
    {
      id: "Apt004",
      name: "Tan",
      appointmentDate: "27 Aug 2024",
      appointmentTime: "10:45 AM",
      location: "San Antonio, USA",
      lastBooking: "03 Jan 2024",
      image: Patientthree,
    },
  ];

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Add centers</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>

            {filteredAppointments.length === 0 && (
              <p className="text-center text-gray-500 mt-8">No appointments found matching your search.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
