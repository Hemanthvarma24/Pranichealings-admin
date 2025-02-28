import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video } from 'lucide-react'
import Patient from "@/app/assets/patients/patient.jpg"

export default function UpcomingAppointment() {
  return (
    <Card className="bg-[#0066FF] p-4 sm:p-5 text-white max-w-md">
      <div className="space-y-4 sm:space-y-5">
        <h2 className="text-lg sm:text-xl font-semibold">Upcoming Appointment</h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative h-12 w-12 sm:h-14 sm:w-14 shrink-0">
              <Image
                src={Patient}
                alt="Patient photo"
                className="rounded-full object-cover"
                fill
                sizes="(max-width: 768px) 48px, 56px"
                priority
                unoptimized
              />
            </div>
            <div className="flex flex-col">
              <div className="text-sm text-blue-100 font-medium">#Apt0001</div>
              <div className="text-base sm:text-lg font-semibold">Adrian Marshall</div>
            </div>
          </div>
          <div className="sm:ml-auto text-left sm:text-right">
            <div className="text-base sm:text-lg font-medium">General visit</div>
            <div className="text-sm text-blue-100">Today, 10:45 AM</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Video className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Video Appointment</span>
          </div>
          <div className="flex sm:ml-auto gap-2 sm:gap-3">
            <Button 
              variant="secondary" 
              size="sm"
              className="flex-1 sm:flex-none bg-white/10 hover:bg-white/20 text-white text-sm font-medium h-9"
            >
              Chat Now
            </Button>
            <Button 
              variant="secondary"
              size="sm"
              className="flex-1 sm:flex-none bg-white text-[#0066FF] hover:bg-white/90 text-sm font-medium h-9"
            >
              Start Appointment
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

