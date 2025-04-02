"use client";

import React, { Suspense } from "react"; // Import Suspense
import Image from "next/image";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Video,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";
import { Header } from "@/components/dashboard/header";
import { Footer } from "@/components/dashboard/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/dashboard/sidebar";

// Import SVGs
import Hospital from "@/app/assets/centers/hospital.svg";
import Hospitaltwo from "@/app/assets/centers/Hospital-2.svg";
import Insurance from "@/app/assets/centers/insurence-1.svg";
import Insurancetwo from "@/app/assets/centers/insurence-2.svg";
import Insurancethree from "@/app/assets/centers/insurence-3.svg";
import Insurancefour from "@/app/assets/centers/insurence-4.svg";
import Insurancefive from "@/app/assets/centers/insurence-5.svg";
import Insurancesix from "@/app/assets/centers/insurence-6.svg";
import Profile from "@/app/assets/doctors/doctor-thumb.jpg";
import Map from "@/app/assets/centers/map.png";
import LeslieImage from "@/app/assets/patients/patient2.jpg";
import DianneImage from "@/app/assets/patients/patient3.jpg";
import DarleneImage from "@/app/assets/patients/patient7.jpg";
import { useSearchParams } from "next/navigation";

// Create a separate component for the part that needs useSearchParams
function SidebarWrapper() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin" || "healers" || "coordinators";
  
  return <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />;
}

// Wrap the component that uses useSearchParams in Suspense
function RoleWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidebarWrapper />
    </Suspense>
  );
}

export default function Centresdetails() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex m-8">
        <RoleWrapper />
        <main className="flex-1 p-8 m-8">
          {/* Doctor Info Section */}
          <Card className="mb-8 bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={Profile}
                      alt="Dr. Martin Adam"
                      width={200}
                      height={200}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="md:w-3/4 space-y-4">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Dr. Martin Adam</h1>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      Available
                    </Badge>
                  </div>
                  <p className="text-gray-600">
                    MBBS, FCPS - Neurology Surgery
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      New York, USA
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      10+ Years Experience
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    <span className="text-sm text-gray-600">
                      5.0 (30 Reviews)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Book Appointment
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Audio Call
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Video Call
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="bio" className="space-y-8">
            <TabsList className="bg-white p-6 rounded-lg shadow-md flex space-x-4">
              <TabsTrigger
                value="bio"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Doctor Bio
              </TabsTrigger>
              <TabsTrigger
                value="experience"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="treatments"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Treatments
              </TabsTrigger>
              <TabsTrigger
                value="specialty"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Specialty
              </TabsTrigger>
              <TabsTrigger
                value="availability"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Availability
              </TabsTrigger>
              <TabsTrigger
                value="clinics"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Clinics
              </TabsTrigger>
              <TabsTrigger
                value="memberships"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Memberships
              </TabsTrigger>
              <TabsTrigger
                value="awards"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Awards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bio" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Doctor Bio</h2>
                  <p className="text-gray-600">
                    Highly motivated and experienced doctor with a passion for
                    providing excellent care to patients. Experienced in a wide
                    variety of medical settings, with particular expertise in
                    diagnostics, primary care and emergency medicine. Skilled in
                    using the latest technology to streamline patient care.
                    Committed to delivering compassionate, personalized care to
                    each patient.
                  </p>
                  <Button variant="link" className="text-blue-500 p-0 mt-2">
                    See More
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 shrink-0">
                        <Image
                          src={Hospital}
                          alt="Hospital Logo"
                          width={48}
                          height={48}
                          className="rounded"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Cambridge University Hospital, NHS Foundation Trust
                          Cambridge
                        </h3>
                        <p className="text-sm text-gray-600">
                          ENT - Consultant
                        </p>
                        <p className="text-sm text-gray-600">
                          Dec 2017 - Jan 2023 • 5 years 2 months
                        </p>
                        <p className="text-sm text-gray-600">
                          Experienced in a wide variety of medical settings,
                          with particular expertise in diagnostics, primary care
                          and emergency medicine.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-12 w-12 shrink-0">
                        <Image
                          src={Hospitaltwo}
                          alt="Hospital Logo"
                          width={48}
                          height={48}
                          className="rounded"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Hill Medical Hospital, Newcastle
                        </h3>
                        <p className="text-sm text-gray-600">
                          ENT - Consultant
                        </p>
                        <p className="text-sm text-gray-600">
                          Dec 2015 - Jan 2017 • 1 years 2 months
                        </p>
                        <p className="text-sm text-gray-600">
                          Experienced in a wide variety of medical settings,
                          with particular expertise in diagnostics, primary care
                          and emergency medicine.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Other tab contents would be similar */}
          </Tabs>

          {/* Insurance Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Insurance Accepted (6)
              </h2>
              <div className="flex flex-wrap gap-4">
                {[
                  { name: "Aetna", image: Insurance },
                  { name: "Blue Cross", image: Insurancetwo },
                  { name: "Cigna", image: Insurancethree },
                  { name: "United", image: Insurancefour },
                  { name: "Humana", image: Insurancefive },
                  { name: "Kaiser", image: Insurancesix },
                ].map((insurance, index) => (
                  <div
                    key={`${insurance.name}-${index}`}
                    className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2"
                  >
                    <Image
                      src={insurance.image}
                      alt={insurance.name}
                      width={50}
                      height={50}
                      className="rounded-full"
                      unoptimized
                    />
                    <span>{insurance.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Specialty Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Specialty</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  "Orthopedic Consultation",
                  "Delivery Blocks",
                  "Ultrasound Injection",
                  "Tooth Bleaching",
                  "Cosmetic",
                  "General Surgery",
                ].map((specialty, index) => (
                  <div
                    key={`${specialty}-${index}`}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{specialty}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Services & Pricing Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Services & Pricing</h2>
              <div className="grid gap-4">
                {[
                  { service: "Orthopedic Consultation", price: "$52" },
                  { service: "Delivery Blocks", price: "$24" },
                  { service: "Ultrasound Injection", price: "$37" },
                  { service: "Tooth Bleaching", price: "$15" },
                  { service: "Cosmetic", price: "$10" },
                ].map(({ service, price }, index) => (
                  <div
                    key={`${service}-${index}`}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span>{service}</span>
                    <span className="font-semibold">{price}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Availability</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-4">
                {["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"].map(
                  (day, index) => (
                    <div key={`${day}-${index}`} className="text-center">
                      <div className="font-medium">{day}</div>
                      <div className="text-sm text-gray-600">
                        Feb {index + 1}
                      </div>
                      <Button variant="outline" className="mt-2 w-full">
                        09:00 PM
                      </Button>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Clinics & Locations Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Clinics & Locations
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={Map}
                      alt="Map"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Hill&apos;s Clinic</h3>
                    <p className="text-sm text-gray-600">
                      4517 Washington Ave&rsquo; Manchester&apos; Kentucky 39495
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Monday</div>
                      <div className="text-gray-600">09:00 AM - 08:00 PM</div>
                    </div>
                    <div>
                      <div className="font-medium">Tuesday</div>
                      <div className="text-gray-600">09:00 AM - 08:00 PM</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={Map}
                      alt="Map"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">The Family Doctors Clinic</h3>
                    <p className="text-sm text-gray-600">
                      2972 Westheimer Rd. Santa Ana, Illinois 85486
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Friday</div>
                      <div className="text-gray-600">09:00 AM - 08:00 PM</div>
                    </div>
                    <div>
                      <div className="font-medium">Saturday</div>
                      <div className="text-gray-600">09:00 AM - 08:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Membership Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Membership</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>
                  Affiliates members include related allied health
                  professionals, evidence based clinicians, Physiotherapists
                  Occupational therapist and Clinical Psychologists who are team
                  up with orthopedic physicians to support the Lifestyle
                  Medicine movement in India through IOAM.
                </li>
                <li>
                  Regular members include the allopathic doctors only (MBBS, MS,
                  MD, DNB, DM) in respective degrees who hold a valid medical
                  license as recognized by the Medical Council of India.
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Awards Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Awards</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    year: 2023,
                    title: "Award Name (2023)",
                    description:
                      "Prestigious award (Certificate, Memento and Citation)",
                  },
                  {
                    year: 2022,
                    title: "Award Name (2022)",
                    description:
                      "Prestigious award (Certificate, Memento and Citation)",
                  },
                  {
                    year: 2021,
                    title: "Award Name (2021)",
                    description:
                      "Prestigious award (Certificate, Memento and Citation)",
                  },
                  {
                    year: 2020,
                    title: "Award Name (2020)",
                    description:
                      "Prestigious award (Certificate, Memento and Citation)",
                  },
                ].map((award) => (
                  <div key={award.year} className="border rounded-lg p-4">
                    <div className="text-sm text-gray-600">{award.year}</div>
                    <h3 className="font-semibold mt-2">{award.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {award.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Business Hours Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
              <div className="grid gap-4">
                {[
                  { day: "Today", hours: "07:00 AM - 08:00 PM" },
                  { day: "Monday", hours: "07:00 AM - 08:00 PM" },
                  { day: "Tuesday", hours: "07:00 AM - 08:00 PM" },
                  { day: "Wednesday", hours: "07:00 AM - 08:00 PM" },
                  { day: "Thursday", hours: "07:00 AM - 08:00 PM" },
                  { day: "Friday", hours: "07:00 AM - 08:00 PM" },
                  { day: "Saturday", hours: "07:00 AM - 08:00 PM" },
                  { day: "Sunday", hours: "07:00 AM - 08:00 PM" },
                ].map(({ day, hours }, index) => (
                  <div
                    key={`${day}-${index}`}
                    className="flex justify-between items-center"
                  >
                    <span className={day === "Today" ? "font-semibold" : ""}>
                      {day}
                    </span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Reviews (200)</h2>
                <Button variant="outline">See All</Button>
              </div>
              <div className="space-y-6">
                {[
                  {
                    name: "Leslie Alexander",
                    rating: 5,
                    time: "1 Day ago",
                    comment:
                      "Dr. Martin is an excellent doctor! I had a great experience during my recent visit. He was very attentive, listened carefully to my concerns, and provided clear explanations. His expertise and professionalism made me feel comfortable and well-cared for. I highly recommend Dr. Martin to anyone looking for a skilled and compassionate physician.",
                    image: LeslieImage,
                  },
                  {
                    name: "Dianne Russell",
                    rating: 5,
                    time: "1 Month ago",
                    comment:
                      "As a first-time patient, I was impressed by Dr. Martin's thoroughness and attention to detail. He took the time to understand my medical history and current symptoms, and his diagnosis was spot-on. The treatment plan he prescribed has been very effective. I appreciate his patient-centered approach and would definitely recommend him to others.",
                    image: DianneImage,
                  },
                  {
                    name: "Darlene Robertson",
                    rating: 5,
                    time: "1 Year ago",
                    comment:
                      "I've been seeing Dr. Martin for several years now, and I can't speak highly enough of him. He's not only knowledgeable and skilled but also genuinely cares about his patients' well-being. He always takes the time to answer my questions and address any concerns I have. His staff is also friendly and efficient, making every visit a pleasant experience.",
                    image: DarleneImage,
                  },
                ].map((review) => (
                  <div key={review.name} className="border-b pb-4">
                    <div className="flex items-center gap-4 mb-2">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                        unoptimized
                      />
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {review.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      <Footer />
    </div>
  );
}