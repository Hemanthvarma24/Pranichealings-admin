"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  Calendar,
  Phone,
  Mail,
  User,
  MapPin,
  ArrowLeft,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/dashboard/header";
import { Footer } from "@/components/dashboard/footer";
import Link from "next/link";
import { Suspense } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";

// Mock data - in a real app, you would fetch this from an API
import Adrian from "@/app/assets/patients/patient1.jpg";
import kelly from "@/app/assets/patients/patient2.jpg";
import samuel from "@/app/assets/patients/patient4.jpg";
import catherine from "@/app/assets/patients/patient3.jpg";
import robert from "@/app/assets/patients/patient5.jpg";
import andreea from "@/app/assets/patients/patient6.jpg";
import peter from "@/app/assets/patients/patient7.jpg";
import emily from "@/app/assets/patients/patient8.jpg";

const patientImages = {
  Adrian: Adrian,
  Kelly: kelly,
  Samuel: samuel,
  Catherine: catherine,
  Robert: robert,
  Andreea: andreea,
  Peter: peter,
  Emily: emily,
};

type Appointment = {
  id: string;
  patient: string;
  image: import("next/image").StaticImageData;
  date: string;
  email: string;
  phone: string;
  isNew: boolean;
  address: string;
  dob: string;
  medicalHistory: string[];
  visits: Visit[];
  coordinators: Coordinator[];
};

type Visit = {
  date: string;
  type: string;
  notes: string;
  healer: string;
};

type Coordinator = {
  name: string;
  role: string;
  image: import("next/image").StaticImageData;
};

// Component that uses useSearchParams wrapped in its own component
function SidebarWithRole() {
  return <Sidebar />;
}

// Fallback component to show while loading
function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse h-screen"></div>;
}

export default function HealingDetailsPage() {
  const params = useParams();
  const id = (params?.id as string) || "Apt001";
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // Mock data for the specific appointment
      const mockAppointment: Appointment = {
        id: id,
        patient: [
          "Adrian",
          "Kelly",
          "Samuel",
          "Catherine",
          "Robert",
          "Andreea",
          "Peter",
          "Emily",
        ][Number.parseInt(id.replace("Apt", "")) % 8],
        image:
          patientImages[
            [
              "Adrian",
              "Kelly",
              "Samuel",
              "Catherine",
              "Robert",
              "Andreea",
              "Peter",
              "Emily",
            ][
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
          [
            "adrian",
            "kelly",
            "samuel",
            "catherine",
            "robert",
            "andreea",
            "peter",
            "emily",
          ][Number.parseInt(id.replace("Apt", "")) % 8]
        }@example.com`,
        phone: `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(
          Math.random() * 900 + 100
        )}-${Math.floor(Math.random() * 10000)}`,
        isNew: Number.parseInt(id.replace("Apt", "")) % 3 === 0,
        address: "123 Healing Street, Wellness City, WC 12345",
        dob: "Jan 15, 1985",
        medicalHistory: [
          "Chronic back pain",
          "Anxiety",
          "Insomnia",
          "Migraine headaches",
        ],
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
            notes:
              "Patient showed improvement in sleep quality. Continuing with the treatment plan.",
            healer: "Dr. Sarah Johnson",
          },
          {
            date: "Mar 29, 2024",
            type: "Follow-up",
            notes:
              "Significant reduction in pain levels. Adjusted healing frequency to once a week.",
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
      };

      setAppointment(mockAppointment);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-1 p-8 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-t-[#4ead91] border-b-[#4ead91] border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
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
    );
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
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Back to Healings</span>
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Healing Details</h1>
              <Badge className="ml-2 bg-[#4ead91] hover:bg-[#3d9c80]">
                #{appointment.id}
              </Badge>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Patient Info Sidebar (30%) */}
              <div className="w-full lg:w-[30%] space-y-6">
                <Card className="overflow-hidden border-t-4 border-t-[#4ead91]">
                  <CardHeader className="text-center pb-2 relative">
                    <div className="mx-auto relative mb-2">
                      <Image
                        src={appointment.image || "/placeholder.svg"}
                        alt={appointment.patient}
                        className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                        unoptimized
                      />
                      {appointment.isNew && (
                        <Badge className="absolute -right-1 top-0 bg-green-500 hover:bg-green-600">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-2xl">
                      {appointment.patient}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Phone className="h-4 w-4 text-[#4ead91]" />
                        </div>
                        <span>{appointment.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Mail className="h-4 w-4 text-[#4ead91]" />
                        </div>
                        <span className="truncate">{appointment.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <User className="h-4 w-4 text-[#4ead91]" />
                        </div>
                        <span>DOB: {appointment.dob}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <MapPin className="h-4 w-4 text-[#4ead91]" />
                        </div>
                        <span>{appointment.address}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-700">
                        Appointment Details
                      </h3>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <Calendar className="h-4 w-4 text-[#4ead91]" />
                        </div>
                        <span>{appointment.date}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-2 gap-3">
                      <Button className="w-full bg-[#4ead91] hover:bg-[#3d9c80]">
                        Assign Healing
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#4ead91] text-[#4ead91] hover:bg-[#f0f9f7] hover:text-[#3d9c80]"
                      >
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#4ead91] text-[#4ead91] hover:bg-[#f0f9f7]"
                    >
                      <Link href="/healings/sessions">View All Sessions</Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <Phone className="mr-2 h-4 w-4 text-[#4ead91]" />
                      Call Patient
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left"
                    >
                      <Mail className="mr-2 h-4 w-4 text-[#4ead91]" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content (70%) */}
              <div className="w-full lg:w-[70%] space-y-6">
                <Tabs defaultValue="patient" className="w-full">
                  <TabsList className="mb-4 w-full justify-start bg-gray-100 p-1">
                    <TabsTrigger
                      value="patient"
                      className="data-[state=active]:bg-white data-[state=active]:text-[#4ead91] data-[state=active]:shadow-sm"
                    >
                      Patient Information
                    </TabsTrigger>
                    <TabsTrigger
                      value="coordinator"
                      className="data-[state=active]:bg-white data-[state=active]:text-[#4ead91] data-[state=active]:shadow-sm"
                    >
                      Coordinator
                    </TabsTrigger>
                    <TabsTrigger
                      value="healer"
                      className="data-[state=active]:bg-white data-[state=active]:text-[#4ead91] data-[state=active]:shadow-sm"
                    >
                      Healer
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="patient" className="space-y-6 mt-0">
                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle>Medical History</CardTitle>
                          <Link href="/healings/sessions">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#4ead91] border-[#4ead91] hover:bg-[#f0f9f7]"
                            >
                              Sessions Info
                            </Button>
                          </Link>
                        </div>
                        <CardDescription>
                          Patient&apos;s medical background and conditions
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {appointment.medicalHistory.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 bg-gray-50 p-3 rounded-md"
                            >
                              <div className="h-2 w-2 rounded-full bg-[#4ead91]"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Treatment Plan</CardTitle>
                        <CardDescription>
                          Current healing approach and recommendations
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 text-gray-700">
                          Based on the patient&apos;s condition and previous
                          visits, we recommend a comprehensive healing plan
                          focusing on energy balancing and stress reduction
                          techniques.
                        </p>
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">
                            Recommended Sessions:
                          </h4>
                          <div className="grid gap-3">
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                              <div className="bg-[#4ead91] p-2 rounded-full">
                                <Clock className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <span className="font-medium">
                                  Energy healing
                                </span>
                                <p className="text-sm text-gray-500">
                                  Twice weekly for 4 weeks
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                              <div className="bg-[#4ead91] p-2 rounded-full">
                                <Clock className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <span className="font-medium">
                                  Meditation guidance
                                </span>
                                <p className="text-sm text-gray-500">
                                  Once weekly
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                              <div className="bg-[#4ead91] p-2 rounded-full">
                                <Clock className="h-4 w-4 text-white" />
                              </div>
                              <div>
                                <span className="font-medium">
                                  Nutritional consultation
                                </span>
                                <p className="text-sm text-gray-500">
                                  Monthly follow-up
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="coordinator" className="space-y-6 mt-0">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Coordination Team</CardTitle>
                        <CardDescription>
                          Team members assigned to this patient
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {appointment.coordinators.map((coordinator, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Image
                              src={coordinator.image || "/placeholder.svg"}
                              alt={coordinator.name}
                              className="h-16 w-16 rounded-full object-cover border-2 border-[#4ead91]"
                              unoptimized
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">
                                {coordinator.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {coordinator.role}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-4">
                                <p className="text-sm flex items-center">
                                  <Mail className="h-4 w-4 mr-2 text-[#4ead91]" />
                                  {coordinator.name
                                    .toLowerCase()
                                    .replace(" ", ".")}
                                  @healingcenter.com
                                </p>
                                <p className="text-sm flex items-center">
                                  <Phone className="h-4 w-4 mr-2 text-[#4ead91]" />
                                  +1 (555) 123-4567
                                </p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              className="text-[#4ead91] border-[#4ead91] hover:bg-[#f0f9f7]"
                            >
                              Contact
                            </Button>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Coordination Notes</CardTitle>
                        <CardDescription>
                          Important information for the coordination team
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-gray-700">
                            Patient has been assigned to our primary
                            coordination team. Regular follow-ups are scheduled
                            every two weeks to ensure treatment plan adherence.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-900">
                            Coordination Tasks:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                              <div className="h-2 w-2 rounded-full bg-[#4ead91]"></div>
                              <span>Schedule follow-up appointments</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                              <div className="h-2 w-2 rounded-full bg-[#4ead91]"></div>
                              <span>
                                Coordinate between healers and patient
                              </span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                              <div className="h-2 w-2 rounded-full bg-[#4ead91]"></div>
                              <span>Manage treatment documentation</span>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md">
                              <div className="h-2 w-2 rounded-full bg-[#4ead91]"></div>
                              <span>
                                Handle insurance and billing inquiries
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="healer" className="space-y-6 mt-0">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Assigned Healers</CardTitle>
                        <CardDescription>
                          Healthcare professionals working with this patient
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-3">
                          {appointment.visits.map((visit, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="h-14 w-14 rounded-full bg-[#4ead91] flex items-center justify-center text-white font-bold text-lg">
                                {visit.healer
                                  .split(" ")
                                  .map((name) => name[0])
                                  .join("")}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-lg">
                                  {visit.healer}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Specializes in {visit.type}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="mt-1 text-xs"
                                >
                                  Last visit: {visit.date}
                                </Badge>
                              </div>
                              <Button
                                variant="outline"
                                className="text-[#4ead91] border-[#4ead91] hover:bg-[#f0f9f7]"
                              >
                                Profile
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle>Visit History</CardTitle>
                        <CardDescription>
                          Previous healing sessions and notes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
                          {appointment.visits.map((visit, index) => (
                            <div key={index} className="relative">
                              <div className="absolute -left-[25px] h-6 w-6 rounded-full bg-[#4ead91] flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white"></div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                  <h4 className="font-medium text-[#4ead91]">
                                    {visit.type}
                                  </h4>
                                  <Badge variant="outline" className="bg-white">
                                    {visit.date}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">
                                  Healer:{" "}
                                  <span className="font-medium">
                                    {visit.healer}
                                  </span>
                                </p>
                                <p className="text-sm text-gray-700">
                                  {visit.notes}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
