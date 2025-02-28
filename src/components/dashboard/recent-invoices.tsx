import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Patient from "@/app/assets/patients/patient.jpg"
import Patienttwo from "@/app/assets/patients/patient2.jpg"
import Patientthree from "@/app/assets/patients/patient3.jpg"
import Patientfour from "@/app/assets/patients/patient4.jpg"
import Patientfive from "@/app/assets/patients/patient6.jpg"
import { Eye } from "lucide-react"




const invoices = [
  {
    patient: "Adrian",
    id: "#apt0001",
    amount: "$450",
    date: "11 Nov 2024",
    image: Patient,
  },
  {
    patient: "Kelly",
    id: "#apt0002",
    amount: "$500",
    date: "10 Nov 2024",
    image: Patienttwo,
  },
  {
    patient: "Samuel",
    id: "#apt0003",
    amount: "$320",
    date: "03 Nov 2024",
    image: Patientthree,
  },
  {
    patient: "Catherine",
    id: "#apt0004",
    amount: "$240",
    date: "01 Nov 2024",
    image: Patientfour,
  },
  {
    patient: "Robert",
    id: "#apt0005",
    amount: "$380",
    date: "28 Oct 2024",
    image: Patientfive,
  }
]

export function RecentInvoices() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Recent Invoices</h2>
        <Button variant="link" className="text-blue-500">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Image
                src={invoice.image}
                alt={invoice.patient}
                className="h-10 w-10 rounded-full"
                unoptimized
              />
              <div>
                <p className="font-medium">{invoice.patient}</p>
                <p className="text-sm text-muted-foreground">{invoice.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-right font-medium">{invoice.amount}</p>
                <p className="text-sm text-muted-foreground">Paid On {invoice.date}</p>
              </div>
              <Button size="icon" variant="ghost">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

