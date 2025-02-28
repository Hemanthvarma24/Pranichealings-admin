import { Card } from "@/components/ui/card"
import { Users, UserCheck, Calendar } from 'lucide-react'

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Patient</p>
            <h3 className="text-2xl font-bold">978</h3>
            <p className="text-sm text-green-500">↑ 15% from last Week</p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <Users className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Patients Today</p>
            <h3 className="text-2xl font-bold">80</h3>
            <p className="text-sm text-green-500">↑ 15% from Yesterday</p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <UserCheck className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Appointments Today</p>
            <h3 className="text-2xl font-bold">50</h3>
            <p className="text-sm text-green-500">↑ 20% from Yesterday</p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <Calendar className="h-6 w-6 text-blue-500" />
          </div>
        </div>
      </Card>
    </div>
  )
}

