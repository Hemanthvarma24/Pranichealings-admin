import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, X } from 'lucide-react'
import Image from "next/image"
import Patient from "@/app/assets/patients/patient.jpg"
import Patienttwo from "@/app/assets/patients/patient2.jpg"
import Patientthree from "@/app/assets/patients/patient3.jpg"
import Patientfour from "@/app/assets/patients/patient4.jpg"
import Patientfive from "@/app/assets/patients/patient5.jpg"


const appointments = [
  {
    id: "Apt0001",
    patient: "Adrian Marshall",
    date: "11 Nov 2024 10:45 AM",
    status: "General",
    image: Patient,
  },
  {
    id: "Apt0002",
    patient: "Kelly Stevens",
    date: "10 Nov 2024 11:00 AM",
    status: "Post Consultation",
    image: Patienttwo,
  },
  {
    id: "Apt0003",
    patient: "Samuel Anderson",
    date: "03 Nov 2024 02:00 PM",
    status: "General",
    image: Patientthree,
  },
  {
    id: "Apt0004",
    patient: "Catherine Griffin",
    date: "01 Nov 2024 04:00 PM",
    status: "Post Consultation",
    image: Patientfour,
  },
  {
    id: "Apt0005",
    patient: "Robert Hutchinson",
    date: "28 Oct 2024 05:30 PM",
    status: "General",
    image: Patientfive,
  }
]

export function AppointmentsList() {
  return (
    <Card className="col-span-2 p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Appointment</h2>
        <Select defaultValue="7">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 Days</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-4">
              <Image 
                src={appointment.image}
                alt={appointment.patient}
                className="h-10 w-10 rounded-full"
                unoptimized
              />
              <div>
                <p className="font-medium">{appointment.patient}</p>
                <p className="text-sm text-muted-foreground">{appointment.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                ${appointment.status === "General" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}>
                {appointment.status}
              </span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

