import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Patient from "@/app/assets/patients/patient.jpg"
import Patienttwo from "@/app/assets/patients/patient2.jpg"

const patients = [
  {
    name: "Adrian Marshall",
    id: "P0001",
    lastAppointment: "Last Appointment 15",
    date: "Mar 2024",
    image: Patient,
  },
  {
    name: "Kelly Stevens",
    id: "P0002",
    lastAppointment: "Last Appointment 13",
    date: "Mar 2024",
    image: Patienttwo,
  }
]

export function RecentPatients() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Patients</h2>
        <Button variant="link" className="text-blue-500">
          View All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="flex flex-col items-center text-center p-4 rounded-lg border"
          >
            <Image
              src={patient.image}
              alt={patient.name}
              className="h-16 w-16 rounded-full mb-2"
              unoptimized
            />
            <h3 className="font-medium">{patient.name}</h3>
            <p className="text-sm text-muted-foreground">Patient ID: {patient.id}</p>
            <p className="text-sm text-muted-foreground">{patient.lastAppointment}</p>
            <p className="text-sm text-muted-foreground">{patient.date}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

