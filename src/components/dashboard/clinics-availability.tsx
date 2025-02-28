import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Client from "@/app/assets/features/feature-01.jpg"
import Clienttwo from "@/app/assets/features/feature-02.jpg"

const clinics = [
  {
    name: "Sofi's Clinic",
    image: Client,
    price: "$900",
    schedule: [
      { day: "Tue", hours: "07:00 AM - 09:00 PM" },
      { day: "Wed", hours: "07:00 AM - 09:00 PM" }
    ]
  },
  {
    name: "The Family Dentistry Clinic",
    image: Clienttwo,
    price: "$600",
    schedule: [
      { day: "Sat", hours: "07:00 AM - 09:00 PM" },
      { day: "Tue", hours: "07:00 AM - 09:00 PM" }
    ]
  }
]

export function ClinicsAvailability() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-6">Clinics & Availability</h2>
      <div className="space-y-6">
        {clinics.map((clinic) => (
          <div key={clinic.name} className="flex items-start gap-4 pb-6 border-b last:border-0">
            <Image
              src={clinic.image}
              alt={clinic.name}
              className="h-12 w-12 rounded-lg"
              unoptimized
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{clinic.name}</h3>
                <p className="font-medium">{clinic.price}</p>
              </div>
              {clinic.schedule.map((time, index) => (
                <div key={index} className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{time.day}:</span>
                  <span>{time.hours}</span>
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

