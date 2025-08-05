"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "M", revenue: 45, appointments: 35 },
  { name: "T", revenue: 35, appointments: 25 },
  { name: "W", revenue: 15, appointments: 15 },
  { name: "T", revenue: 40, appointments: 35 },
  { name: "F", revenue: 35, appointments: 30 },
  { name: "S", revenue: 45, appointments: 40 },
  { name: "S", revenue: 60, appointments: 50 },
]

export function WeeklyOverview() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Weekly Overview</h2>
        <div className="text-sm text-muted-foreground">Mar 14 - Mar 21</div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#b3d696]" />
            <span className="text-sm">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#ddedce]" />
            <span className="text-sm">Appointments</span>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="revenue" fill="#b3d696" radius={[4, 4, 0, 0]} />
              <Bar dataKey="appointments" fill="#ddedce" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}

