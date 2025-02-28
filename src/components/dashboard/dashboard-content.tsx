import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Users, Check, X } from 'lucide-react'
import Patient from "@/app/assets/patients/patient.jpg"


export function DashboardContent() {
  return (
    <div className="flex-1 p-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Patient</p>
              <h3 className="text-2xl font-bold">978</h3>
              <p className="text-sm text-green-500">+15% from last week</p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>
        
        {/* Similar cards for Patients Today and Appointments Today */}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Appointments</h3>
          <div className="space-y-4">
            {/* Appointment items */}
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center space-x-4">
                <Image
                  src={Patient}
                  alt="Patient"
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized
                />
                <div>
                  <p className="font-medium">Adrian Marshall</p>
                  <p className="text-sm text-gray-500">11 Nov 2024 10:45 AM</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" className="text-green-500">
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-red-500">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {/* More appointment items */}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Recent Invoices</h3>
          <div className="space-y-4">
            {/* Invoice items */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  src={Patient}
                  alt="Patient"
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized
                />
                <div>
                  <p className="font-medium">Adrian Marshall</p>
                  <p className="text-sm text-gray-500">11 Nov 2024</p>
                </div>
              </div>
              <p className="font-medium">$450</p>
            </div>
            {/* More invoice items */}
          </div>
        </Card>
      </div>
    </div>
  )
}

