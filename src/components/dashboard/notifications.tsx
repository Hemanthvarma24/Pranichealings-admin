import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Star, Calendar, DollarSign } from 'lucide-react'

const notifications = [
  {
    icon: Bell,
    title: "Booking Confirmed on 21 Mar 2024 10:30 AM",
    time: "Just Now",
    color: "blue"
  },
  {
    icon: Star,
    title: "You have a New Review for your Appointment",
    time: "5 Days ago",
    color: "yellow"
  },
  {
    icon: Calendar,
    title: "You have Appointment with Ahmed by 01:20 PM",
    time: "12:55 PM",
    color: "red"
  },
  {
    icon: DollarSign,
    title: "Sent an amount of $200 for an Appointment by 01:20 PM",
    time: "2 Days ago",
    color: "green"
  }
]

export function Notifications() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <Button variant="link" className="text-blue-500">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`rounded-full p-2 bg-${notification.color}-100`}>
              <notification.icon className={`h-4 w-4 text-${notification.color}-500`} />
            </div>
            <div>
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

