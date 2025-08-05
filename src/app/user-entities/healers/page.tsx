"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Calendar, MapPin, Check, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Footer } from "@/components/dashboard/footer";
import { Badge } from "@/components/ui/badge";

// Import patient images
import Patient from "@/app/assets/patients/patient.jpg";
import Patienttwo from "@/app/assets/patients/patient2.jpg";
import Patientthree from "@/app/assets/patients/patient3.jpg";
import Patientfour from "@/app/assets/patients/patient4.jpg";
import Patientfive from "@/app/assets/patients/patient5.jpg";
import Patientsix from "@/app/assets/patients/patient6.jpg";

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
  image: string | { src: string };
  status?: "pending" | "processing" | "completed";
};

// EntityCard component with navigation
const EntityCard = ({ entity }: { entity: Entity }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`healers/healers-details?id=${entity.id}`);
  };

  const getStatusBadge = () => {
    if (!entity.status) return null;

    switch (entity.status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <Check className="h-3 w-3" /> Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
            <Loader2 className="h-3 w-3 animate-spin" /> Processing
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={
                typeof entity.image === "string"
                  ? entity.image
                  : entity.image.src
              }
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
              <div className="min-w-[100px] flex justify-end">
                {entity.status && getStatusBadge()}
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
};

// Component that uses useSearchParams wrapped in its own component
function SidebarWithRole() {
  return <Sidebar />;
}

// Fallback component to show while loading
function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse h-screen"></div>;
}

// Main page component
export default function HealersPage() {
  const [activeTab, setActiveTab] = useState<
    "requests" | "active" | "inactive"
  >("requests");

  const [searchQuery, setSearchQuery] = useState("");

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

  const entities =
    activeTab === "requests"
      ? requests
      : activeTab === "active"
      ? activePatients
      : inactivePatients;

  // Filter entities based on search query
  const filteredEntities = entities.filter(
    (entity) =>
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex m-8">
        <Suspense fallback={<SidebarFallback />}>
          <SidebarWithRole />
        </Suspense>
        <main
          className="flex-1 p-6 h-screen overflow-y-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Healers</h1>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "requests" ? "default" : "outline"}
                  onClick={() => setActiveTab("requests")}
                  className="relative"
                  style={
                    activeTab === "requests"
                      ? { backgroundColor: "#48c373" }
                      : {}
                  }
                >
                  Requests
                  <span className="ml-2 bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                    {requests.length}
                  </span>
                </Button>
                <Button
                  variant={activeTab === "active" ? "default" : "outline"}
                  onClick={() => setActiveTab("active")}
                  className="relative"
                  style={
                    activeTab === "active" ? { backgroundColor: "#48c373" } : {}
                  }
                >
                  Active
                  <span className="ml-2 bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                    {activePatients.length}
                  </span>
                </Button>
                <Button
                  variant={activeTab === "inactive" ? "default" : "outline"}
                  onClick={() => setActiveTab("inactive")}
                  className="relative"
                  style={
                    activeTab === "inactive"
                      ? { backgroundColor: "#48c373" }
                      : {}
                  }
                >
                  Inactive
                  <span className="ml-2 bg-primary-foreground text-primary px-2 py-0.5 rounded-full text-xs">
                    {inactivePatients.length}
                  </span>
                </Button>
              </div>
              <div className="flex items-center gap-0">
                <div className="relative w-full sm:w-64 mr-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search healers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEntities.map((entity) => (
                <EntityCard key={entity.id} entity={entity} />
              ))}
            </div>

            {filteredEntities.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">
                  No healers found matching your search criteria.
                </p>
              </div>
            )}

            {filteredEntities.length > 0 && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  style={{ borderColor: "#48c373", color: "#48c373" }}
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
