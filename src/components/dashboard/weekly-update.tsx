import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye } from 'lucide-react'

export default function WeeklyOverview() {
  return (
    <div className="p-6 space-y-6">
      {/* Weekly Overview Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Weekly Overview</h2>
            <span className="text-muted-foreground">Mar 14 - Mar 21</span>
          </div>
          <div className="flex gap-8 mb-8">
            <button className="text-blue-500 font-medium relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-blue-500">Revenue</button>
            <button className="text-muted-foreground">Appointments</button>
          </div>
          <div className="relative h-[240px] flex items-end gap-4 border-b border-l">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              {[70, 60, 50, 40, 30, 20, 10, 0].map((value) => (
                <div key={value} className="w-full border-t border-gray-100 flex items-center h-0">
                  <span className="text-xs text-muted-foreground -translate-x-6">{value}</span>
                </div>
              ))}
            </div>
            
            {/* Bars */}
            <div className="flex-1 flex items-end gap-4 px-4">
              {[
                { day: "M", height: 45 },
                { day: "T", height: 35 },
                { day: "W", height: 12 },
                { day: "T", height: 40 },
                { day: "F", height: 32 },
                { day: "S", height: 45 },
                { day: "S", height: 60 },
              ].map((item, index) => (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className={`w-full ${index === 3 ? "bg-yellow-400" : "bg-blue-500"} rounded-sm`} 
                    style={{ height: `${item.height}%` }}
                  />
                  <span className="text-sm text-muted-foreground">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-muted-foreground">0</div>
            <div className="text-sm text-muted-foreground">20</div>
            <div className="text-sm text-muted-foreground">40</div>
            <div className="text-sm text-muted-foreground">60</div>
            <div className="text-sm text-muted-foreground">80</div>
          </div>
        </Card>

        {/* Upcoming Appointment */}
        <Card className="bg-blue-500 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6">Upcoming Appointment</h2>
          <div className="flex gap-4 items-center mb-6">
            <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Adrian Marshall"
              width={48}
              height={48}
              className="rounded-full bg-yellow-300"
            />
            <div>
              <div className="text-sm opacity-90">#Apt0001</div>
              <div className="font-semibold">Adrian Marshall</div>
            </div>
            <div className="ml-auto text-right">
              <div>General visit</div>
              <div>Today, 10:45 AM</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Video Appointment</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30">Chat Now</Button>
            <Button variant="secondary" className="flex-1 bg-white/20 hover:bg-white/30">Start Appointment</Button>
          </div>
        </Card>
      </div>

      {/* Recent Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Patients */}
        <Card className="p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Patients</h2>
            <Button variant="link" className="text-blue-500">View All</Button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Adrian Marshall", id: "P0001", date: "15 Mar 2024", image: "/placeholder.svg?height=48&width=48" },
              { name: "Kelly Stevens", id: "P0002", date: "13 Mar 2024", image: "/placeholder.svg?height=48&width=48" },
            ].map((patient) => (
              <div key={patient.id} className="flex items-center gap-4 p-4 border rounded-xl">
                <Image
                  src={patient.image}
                  alt={patient.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-blue-500">Patient ID: {patient.id}</div>
                  <div className="text-sm text-muted-foreground">Last Appointment {patient.date}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Invoices */}
        <Card className="p-6 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Recent Invoices</h2>
            <Button variant="link" className="text-blue-500">View All</Button>
          </div>
          <div className="space-y-4">
            {[
              { name: "Adrian", id: "#Apt0001", amount: 450, paidOn: "11 Nov 2024", image: "/placeholder.svg?height=40&width=40" },
              { name: "Kelly", id: "#Apt0002", paidOn: "10 Nov 2024", amount: 500, image: "/placeholder.svg?height=40&width=40" },
              { name: "Samuel", id: "#Apt0003", paidOn: "03 Nov 2024", amount: 320, image: "/placeholder.svg?height=40&width=40" },
              { name: "Catherine", id: "#Apt0004", paidOn: "01 Nov 2024", amount: 240, image: "/placeholder.svg?height=40&width=40" },
              { name: "Robert", id: "#Apt0005", paidOn: "28 Oct 2024", amount: 380, image: "/placeholder.svg?height=40&width=40" },
            ].map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-xl">
                <div className="flex items-center gap-4">
                  <Image
                    src={invoice.image}
                    alt={invoice.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <div className="font-medium">{invoice.name}</div>
                    <div className="text-sm text-blue-500">{invoice.id}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Amount</div>
                  <div className="font-medium text-green-600">${invoice.amount}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Paid On</div>
                  <div className="font-medium">{invoice.paidOn}</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-4">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

