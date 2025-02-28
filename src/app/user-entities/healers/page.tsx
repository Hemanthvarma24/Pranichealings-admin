'use client';

import { Suspense, useState } from 'react';
import Image from 'next/image';
import { Search, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Footer } from "@/components/dashboard/footer";
import Patient from "@/app/assets/patients/patient.jpg";
import Patienttwo from "@/app/assets/patients/patient2.jpg";
import Patientthree from "@/app/assets/patients/patient3.jpg";
import Patientfour from "@/app/assets/patients/patient4.jpg";
import Patientfive from "@/app/assets/patients/patient5.jpg";
import Patientsix from "@/app/assets/patients/patient6.jpg";
import { useSearchParams } from 'next/dist/client/components/navigation';


type Entity = {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  appointmentDate: string;
  appointmentTime: string;
  location: string;
  lastBooking: string;
  image: string | {src: string};
};

// EntityCard component
const EntityCard = ({ entity }: { entity: Entity }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-6">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
           src={typeof entity.image === 'string' ? entity.image : entity.image.src}
            alt={entity.name}
            fill
            className="rounded-lg object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-blue-600">#{entity.id}</p>
              <h3 className="font-semibold truncate">{entity.name}</h3>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-600">
            <span>Age: {entity.age}</span>
            <span>•</span>
            <span>{entity.gender}</span>
            <span>•</span>
            <span>{entity.bloodType}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>{entity.appointmentDate}</span>
          <span>{entity.appointmentTime}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{entity.location}</span>
        </div>
        <div className="text-sm text-gray-600">
          Last Booking: {entity.lastBooking}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Main page component
export default function UserEntitiesPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "active" | "inactive">("requests");
  const [dateRange, setDateRange] = useState("08/04/2020 - 08/11/2020");

  // Sample patient data
  const requests: Entity[] = [
    {
      id: "Apt0001",
      name: "Sarah Connor",
      age: 29,
      gender: "Female",
      bloodType: "O+",
      appointmentDate: "15 Jan 2024",
      appointmentTime: "09:30 AM",
      location: "San Diego, USA",
      lastBooking: "20 Mar 2023",
      image: Patient,
    },
    {
      id: "Apt0002",
      name: "John Reese",
      age: 32,
      gender: "Male",
      bloodType: "A-",
      appointmentDate: "18 Feb 2024",
      appointmentTime: "10:00 AM",
      location: "Las Vegas, USA",
      lastBooking: "25 Apr 2023",
      image: Patienttwo,
    },
    {
      id: "Apt0003",
      name: "Kyle Smith",
      age: 45,
      gender: "Male",
      bloodType: "B+",
      appointmentDate: "20 Mar 2024",
      appointmentTime: "11:00 AM",
      location: "Phoenix, USA",
      lastBooking: "30 May 2023",
      image: Patientthree,
    },
    {
      id: "Apt0004",
      name: "Ellen Ripley",
      age: 40,
      gender: "Female",
      bloodType: "AB-",
      appointmentDate: "22 Apr 2024",
      appointmentTime: "01:30 PM",
      location: "Dallas, USA",
      lastBooking: "05 Jun 2023",
      image: Patientfour,
    },
  ];

  const activePatients: Entity[] = [
    {
      id: "Apt0005",
      name: "Anderea Kearns",
      age: 40,
      gender: "Female",
      bloodType: "B-",
      appointmentDate: "26 Sep 2024",
      appointmentTime: "10:20 AM",
      location: "San Francisco, USA",
      lastBooking: "11 Feb 2024",
      image: Patient,
    },
    {
      id: "Apt0006",
      name: "Darrell Tan",
      age: 31,
      gender: "Male",
      bloodType: "AB+",
      appointmentDate: "25 Aug 2024",
      appointmentTime: "10:45 AM",
      location: "San Antonio, USA",
      lastBooking: "03 Jan 2024",
      image: Patienttwo,
    },
    {
      id: "Apt0007",
      name: "Catherine Gracey",
      age: 36,
      gender: "Female",
      bloodType: "AB-",
      appointmentDate: "18 Oct 2024",
      appointmentTime: "12:20 PM",
      location: "Los Angeles, USA",
      lastBooking: "27 Feb 2024",
      image: Patientthree,
    },
    {
      id: "Apt0008",
      name: "Michael Chan",
      age: 45,
      gender: "Male",
      bloodType: "O+",
      appointmentDate: "12 Nov 2024",
      appointmentTime: "09:15 AM",
      location: "Seattle, USA",
      lastBooking: "05 Mar 2024",
      image: Patientfour,
    },
    {
      id: "Apt0009",
      name: "Lisa Ray",
      age: 50,
      gender: "Female",
      bloodType: "A+",
      appointmentDate: "22 Dec 2024",
      appointmentTime: "11:00 AM",
      location: "Chicago, USA",
      lastBooking: "14 Apr 2024",
      image: Patientfive,
    },
    {
      id: "Apt0010",
      name: "John Doe",
      age: 28,
      gender: "Male",
      bloodType: "O-",
      appointmentDate: "05 Jan 2025",
      appointmentTime: "02:30 PM",
      location: "Boston, USA",
      lastBooking: "18 May 2024",
      image: Patientsix,
    },
  ];

  const inactivePatients: Entity[] = [
    {
      id: "Apt0011",
      name: "Jane Smith",
      age: 34,
      gender: "Female",
      bloodType: "B+",
      appointmentDate: "10 Feb 2024",
      appointmentTime: "09:00 AM",
      location: "New York, USA",
      lastBooking: "15 Jun 2023",
      image: Patientthree,
    },
    {
      id: "Apt0012",
      name: "Robert Brown",
      age: 29,
      gender: "Male",
      bloodType: "A-",
      appointmentDate: "03 Mar 2024",
      appointmentTime: "11:30 AM",
      location: "Denver, USA",
      lastBooking: "22 Jul 2023",
      image: Patientfour,
    },
    {
      id: "Apt0013",
      name: "Emily Clark",
      age: 42,
      gender: "Female",
      bloodType: "AB+",
      appointmentDate: "15 Apr 2024",
      appointmentTime: "01:00 PM",
      location: "Miami, USA",
      lastBooking: "08 Aug 2023",
      image: Patient,
    },
  ];

  const entities = activeTab === "requests" ? requests : activeTab === "active" ? activePatients : inactivePatients;
  function RoleWrapper() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "admin" || "coordinators";
        
          return <Sidebar role={role}/>;
        }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex m-8">
      <Suspense fallback={<div>Loading Sidebar...</div>}>
  <RoleWrapper />
</Suspense>
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Healers</h1>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "requests" ? "default" : "outline"}
                  onClick={() => setActiveTab("requests")}
                  className="relative"
                >
                  Requests
                  <span className="ml-2 bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                    4
                  </span>
                </Button>
                <Button
                  variant={activeTab === "active" ? "default" : "outline"}
                  onClick={() => setActiveTab("active")}
                  className="relative"
                >
                  Active
                  <span className="ml-2 bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                    6
                  </span>
                </Button>
                <Button
                  variant={activeTab === "inactive" ? "default" : "outline"}
                  onClick={() => setActiveTab("inactive")}
                  className="relative"
                >
                  Inactive
                  <span className="ml-2 bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                    3
                  </span>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative w-full sm:w-auto">
                  <Input
                    type="text"
                    placeholder="Search"
                    className="pl-10 w-full sm:w-[300px]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                </div>
                <Input
                  type="text"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full sm:w-[200px]"
                />
                <Button variant="outline" className="w-full sm:w-auto">
                  Filter By <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entities.map((entity) => (
                <EntityCard key={entity.id} entity={entity} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
