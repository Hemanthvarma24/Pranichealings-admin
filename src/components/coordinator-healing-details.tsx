"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, ArrowLeft, User, Users, Star } from "lucide-react"
import { useRouter } from "next/navigation"
import Image, { type StaticImageData } from "next/image"
import pasient1 from "@/app/assets/patients/patient4.jpg"

// Define types for our data structures
interface Patient {
  name: string
  email: string
  image: StaticImageData
  phone: string
  address: string
  conditions: string
  allergies: string
  age: number
  gender: string
  bloodGroup: string
  occupation: string
  emergencyContact: string
}

interface Session {
  id: string
  date: string
  dateNumeric: string
  time: string
  amount: number
  status: "request" | "ongoing" | "completed"
  startDate?: string
  endDate?: string
  createdDate?: string
  totalSessions?: number
  feedback?: string
  rating?: number
  assignedHealer?: string
}

interface Healer {
  id: string
  name: string
  specialty: string
  experience: string
}

interface HealingSession {
  id: string
  status: string
  coordinator: string
  startDate: string
  endDate: string
  totalSessions: number
  completedSessions: number
  ongoingSessions: number
  totalAmount: number
  amountPaid: number
  balanceToPay: number
  patient: Patient
  healingPlan: {
    type: string
    frequency: string
    duration: string
  }
}

// Mock data for healing sessions
const healingSession: HealingSession = {
  id: "PH045",
  status: "ongoing",
  coordinator: "Mr. Sathish Kumar",
  startDate: "18 July 2025",
  endDate: "NA",
  totalSessions: 8,
  completedSessions: 3,
  ongoingSessions: 2,
  totalAmount: 4000,
  amountPaid: 2000,
  balanceToPay: 2000,
  patient: {
    name: "Adrian Smith",
    email: "adrian@example.com",
    phone: "+1 555-123-4567",
    image: pasient1,
    address: "123 Healing Street, Wellness City, WC 12345",
    conditions: "Chronic back pain, Anxiety",
    allergies: "None",
    age: 35,
    gender: "Male",
    bloodGroup: "O+",
    occupation: "Software Engineer",
    emergencyContact: "+1 555-987-6543",
  },
  healingPlan: {
    type: "Energy Healing",
    frequency: "Twice weekly",
    duration: "5 sessions",
  },
}

// Mock healers data
const healers: Healer[] = [
  {
    id: "h1",
    name: "Dr. Sarah Johnson",
    specialty: "Energy Healing",
    experience: "8 years",
  },
  {
    id: "h2",
    name: "Dr. Michael Chen",
    specialty: "Pranic Healing",
    experience: "10 years",
  },
  {
    id: "h3",
    name: "Dr. Lisa Rodriguez",
    specialty: "Sound Therapy",
    experience: "6 years",
  },
  {
    id: "h4",
    name: "Dr. David Kim",
    specialty: "Crystal Healing",
    experience: "9 years",
  },
  {
    id: "h5",
    name: "Dr. Amina Patel",
    specialty: "Chakra Balancing",
    experience: "7 years",
  },
]

export default function HealingDetailsSession() {
  const [isAssignHealerDialogOpen, setIsAssignHealerDialogOpen] = useState<boolean>(false)
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState<boolean>(false)
  const [selectedHealer, setSelectedHealer] = useState<string>("")
  const [selectedSessionId, setSelectedSessionId] = useState<string>("")
  const [feedbackRating, setFeedbackRating] = useState<string>("")
  const [feedbackComment, setFeedbackComment] = useState<string>("")
  const [activeTab, setActiveTab] = useState<string>("request")
  const router = useRouter()

  // Initialize state for each tab's sessions
  const [assignedSessions, setAssignedSessions] = useState<Session[]>([
    {
      id: "PHSE003",
      date: "22 July 2025",
      dateNumeric: "22",
      time: "05:00 PM",
      amount: 500,
      status: "request",
      createdDate: "20 July 2025",
    },
    {
      id: "PHSE004",
      date: "24 July 2025",
      dateNumeric: "24",
      time: "06:00 PM",
      amount: 500,
      status: "request",
      createdDate: "21 July 2025",
    },
  ])

  const [ongoingSessions, setOngoingSessions] = useState<Session[]>([
    {
      id: "PHSE002",
      date: "20 July 2025",
      dateNumeric: "20",
      time: "05:00 PM",
      amount: 500,
      status: "ongoing",
      startDate: "20 July 2025",
      assignedHealer: "Dr. Sarah Johnson",
    },
    {
      id: "PHSE005",
      date: "21 July 2025",
      dateNumeric: "21",
      time: "04:00 PM",
      amount: 500,
      status: "ongoing",
      startDate: "21 July 2025",
      assignedHealer: "Dr. Michael Chen",
    },
  ])

  const [completedSessions, setCompletedSessions] = useState<Session[]>([
    {
      id: "PHSE001",
      date: "18 July 2025",
      dateNumeric: "18",
      time: "05:00 PM",
      amount: 500,
      status: "completed",
      startDate: "18 July 2025",
      endDate: "18 July 2025",
      totalSessions: 1,
      feedback: "Great session, patient showed improvement in energy levels and reported reduced anxiety.",
      rating: 9,
      assignedHealer: "Dr. Sarah Johnson",
    },
    {
      id: "PHSE006",
      date: "19 July 2025",
      dateNumeric: "19",
      time: "03:00 PM",
      amount: 500,
      status: "completed",
      startDate: "19 July 2025",
      endDate: "19 July 2025",
      totalSessions: 1,
      feedback: "Patient responded well to treatment, noticeable improvement in back pain.",
      rating: 8,
      assignedHealer: "Dr. Lisa Rodriguez",
    },
    {
      id: "PHSE007",
      date: "20 July 2025",
      dateNumeric: "20",
      time: "02:00 PM",
      amount: 500,
      status: "completed",
      startDate: "20 July 2025",
      endDate: "20 July 2025",
      totalSessions: 1,
      feedback: "Excellent progress, patient feels much more balanced and centered.",
      rating: 10,
      assignedHealer: "Dr. David Kim",
    },
  ])

  // Function to handle assigning healer
  const handleAssignHealer = () => {
    if (!selectedHealer || !selectedSessionId) {
      alert("Please select a healer")
      return
    }

    const healerName = healers.find((h) => h.id === selectedHealer)?.name || ""

    // Move session from request to ongoing
    const sessionToMove = assignedSessions.find((s) => s.id === selectedSessionId)
    if (sessionToMove) {
      const updatedSession: Session = {
        ...sessionToMove,
        status: "ongoing",
        startDate: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        assignedHealer: healerName,
      }

      // Remove from request sessions
      setAssignedSessions((prev) => prev.filter((s) => s.id !== selectedSessionId))

      // Add to ongoing sessions
      setOngoingSessions((prev) => [...prev, updatedSession])

      // Switch to ongoing tab
      setActiveTab("ongoing")
    }

    // Clear selections and close dialog
    setSelectedHealer("")
    setSelectedSessionId("")
    setIsAssignHealerDialogOpen(false)
  }

  // Function to handle feedback submission
  const handleSubmitFeedback = () => {
    if (!feedbackRating || !feedbackComment.trim() || !selectedSessionId) {
      alert("Please provide both rating and comment")
      return
    }

    // Move session from ongoing to completed
    const sessionToMove = ongoingSessions.find((s) => s.id === selectedSessionId)
    if (sessionToMove) {
      const updatedSession: Session = {
        ...sessionToMove,
        status: "completed",
        endDate: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        feedback: feedbackComment,
        rating: Number.parseInt(feedbackRating),
        totalSessions: 1,
      }

      // Remove from ongoing sessions
      setOngoingSessions((prev) => prev.filter((s) => s.id !== selectedSessionId))

      // Add to completed sessions
      setCompletedSessions((prev) => [...prev, updatedSession])

      // Switch to completed tab
      setActiveTab("completed")
    }

    // Clear form and close dialog
    setFeedbackRating("")
    setFeedbackComment("")
    setSelectedSessionId("")
    setIsFeedbackDialogOpen(false)
  }

  // Function to open assign healer dialog
  const openAssignHealerDialog = (sessionId: string) => {
    setSelectedSessionId(sessionId)
    setIsAssignHealerDialogOpen(true)
  }

  // Function to open feedback dialog
  const openFeedbackDialog = (sessionId: string) => {
    setSelectedSessionId(sessionId)
    setIsFeedbackDialogOpen(true)
  }

  // Render assigned session card
  const renderAssignedSessionCard = (session: Session) => (
    <Card key={session.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Top row with ID, Status, and Assign Healer button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[#48c373] text-lg font-semibold">{session.id}</h3>
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-0.5 rounded-full text-xs">Request</Badge>
          </div>
          <Button
            variant="outline"
            className="text-[#48c373] border-[#48c373] hover:bg-[#f0f9f7] px-3 py-1 rounded-md text-sm bg-white"
            onClick={() => openAssignHealerDialog(session.id)}
          >
            <Users className="h-3.5 w-3.5 mr-1" />
            Assigned Healer
          </Button>
        </div>

        {/* Bottom grid with session details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Created Date</p>
            <p className="text-gray-900 text-sm font-semibold">{session.createdDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Time</p>
            <p className="text-gray-900 text-sm font-semibold">{session.time}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Sessions</p>
            <p className="text-gray-900 text-sm font-semibold">1</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Amount</p>
            <p className="text-gray-900 text-sm font-semibold">₹{session.amount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Render ongoing session card
  const renderOngoingSessionCard = (session: Session) => (
    <Card key={session.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Top row with ID, Status, and Submit Feedback button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[#48c373] text-lg font-semibold">{session.id}</h3>
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-0.5 rounded-full text-xs">
              Ongoing
            </Badge>
          </div>
          <Button
            variant="outline"
            className="text-[#48c373] border-[#48c373] hover:bg-[#f0f9f7] px-3 py-1 rounded-md text-sm bg-white"
            onClick={() => openFeedbackDialog(session.id)}
          >
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            Submit Feedback
          </Button>
        </div>

        {/* Assigned Healer Info */}
        {session.assignedHealer && (
          <div className="mb-4 p-3 bg-[#48c373]/5 rounded-lg">
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Assigned Healer</p>
            <p className="text-gray-900 text-sm font-semibold">{session.assignedHealer}</p>
          </div>
        )}

        {/* Bottom grid with session details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Start Date</p>
            <p className="text-gray-900 text-sm font-semibold">{session.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Time</p>
            <p className="text-gray-900 text-sm font-semibold">{session.time}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Session</p>
            <p className="text-gray-900 text-sm font-semibold">1</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Amount</p>
            <p className="text-gray-900 text-sm font-semibold">₹{session.amount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderCompletedSessionCard = (session: Session) => (
    <Card key={session.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow text-sm">
      <CardContent className="p-4">
        {/* Top row with ID and Status */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[#48c373] text-lg font-semibold">{session.id}</h3>
            <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-0.5 rounded-full text-xs">
              Completed
            </Badge>
          </div>
          {session.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{session.rating}/10</span>
            </div>
          )}
        </div>

        {/* Assigned Healer Info */}
        {session.assignedHealer && (
          <div className="mb-4 p-3 bg-[#48c373]/5 rounded-lg">
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Healer</p>
            <p className="text-gray-900 text-sm font-semibold">{session.assignedHealer}</p>
          </div>
        )}

        {/* Bottom grid with session details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Start Date</p>
            <p className="text-gray-900 text-sm font-semibold">{session.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">End Date</p>
            <p className="text-gray-900 text-sm font-semibold">{session.endDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Total Session</p>
            <p className="text-gray-900 text-sm font-semibold">{session.totalSessions}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">Amount</p>
            <p className="text-gray-900 text-sm font-semibold">₹{session.amount}</p>
          </div>
        </div>

        {/* Feedback Section */}
        {session.feedback && (
          <div className="border-t pt-4">
            <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">Feedback</p>
            <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">{session.feedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="max-w-8xl mx-auto p-4">
      {/* Header with Create Session Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => router.back()} />
          <h1 className="text-3xl font-bold text-gray-800">Healing Details</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Patient Photo and Details */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              {/* Patient Photo and Basic Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                      src={healingSession.patient.image || "/placeholder.svg"}
                      alt={healingSession.patient.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#48c373] mb-1">{healingSession.id}</h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{healingSession.patient.name}</h3>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <p className="font-medium text-gray-800">{healingSession.patient.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone</p>
                  <p className="font-medium text-gray-800">{healingSession.patient.phone}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Address</p>
                  <p className="font-medium text-gray-800">{healingSession.patient.address}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Medical Conditions</p>
                  <p className="font-medium text-gray-800">{healingSession.patient.conditions}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Coordinator</p>
                  <p className="font-medium text-gray-800">{healingSession.coordinator}</p>
                </div>
              </div>

              {/* Healing Plan Section */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Healing Plan</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Healing Type</p>
                    <p className="font-medium text-gray-800">{healingSession.healingPlan.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Frequency</p>
                    <p className="font-medium text-gray-800">{healingSession.healingPlan.frequency}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Duration</p>
                    <p className="font-medium text-gray-800">{healingSession.healingPlan.duration}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary Cards and Sessions */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sessions Summary Card */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Session</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Sessions</span>
                    <span className="font-bold text-xl text-gray-800">{healingSession.totalSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed Sessions</span>
                    <span className="font-bold text-xl text-green-600">{completedSessions.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Ongoing Sessions</span>
                    <span className="font-bold text-xl text-orange-600">{ongoingSessions.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary Card */}
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Payment</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="font-bold text-xl text-gray-800">₹{healingSession.totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="font-bold text-xl text-green-600">₹{healingSession.amountPaid}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Balance to Pay</span>
                    <span className="font-bold text-xl text-red-600">₹{healingSession.balanceToPay}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sessions</h2>

            {/* Session Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="request"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
                >
                  Request ({assignedSessions.length})
                </TabsTrigger>
                <TabsTrigger
                  value="ongoing"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
                >
                  Ongoing ({ongoingSessions.length})
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
                >
                  Completed ({completedSessions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="request" className="mt-6 space-y-4">
                {assignedSessions.map(renderAssignedSessionCard)}
              </TabsContent>

              <TabsContent value="ongoing" className="mt-6 space-y-4">
                {ongoingSessions.map(renderOngoingSessionCard)}
              </TabsContent>

              <TabsContent value="completed" className="mt-6 space-y-4">
                {completedSessions.map(renderCompletedSessionCard)}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Assign Healer Dialog */}
      <Dialog open={isAssignHealerDialogOpen} onOpenChange={setIsAssignHealerDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#48c373]">Assigned Healer</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="healer">Select Healer</Label>
              <Select value={selectedHealer} onValueChange={setSelectedHealer}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a healer" />
                </SelectTrigger>
                <SelectContent>
                  {healers.map((healer) => (
                    <SelectItem key={healer.id} value={healer.id}>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#48c373]/10 p-2 rounded-full">
                          <User className="h-4 w-4 text-[#48c373]" />
                        </div>
                        <div>
                          <p className="font-medium">{healer.name}</p>
                          <p className="text-xs text-gray-500">
                            {healer.specialty} • {healer.experience}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedHealer && (
              <div className="bg-[#48c373]/5 p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-[#48c373]/20 p-3 rounded-full">
                    <User className="h-6 w-6 text-[#48c373]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{healers.find((h) => h.id === selectedHealer)?.name}</h3>
                    <p className="text-gray-600">{healers.find((h) => h.id === selectedHealer)?.specialty}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Experience: {healers.find((h) => h.id === selectedHealer)?.experience}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsAssignHealerDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#48c373] hover:bg-[#3d9c80]" onClick={handleAssignHealer} disabled={!selectedHealer}>
              Assigned Healer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submit Feedback Dialog */}
      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#48c373]">Submit Feedback</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-10)</Label>
              <Select value={feedbackRating} onValueChange={setFeedbackRating}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{rating}/10</span>
                        <span className="text-gray-500">
                          {rating >= 9
                            ? "Excellent"
                            : rating >= 7
                              ? "Good"
                              : rating >= 5
                                ? "Average"
                                : rating >= 3
                                  ? "Poor"
                                  : "Very Poor"}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Write your feedback here..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsFeedbackDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#48c373] hover:bg-[#3d9c80]"
              onClick={handleSubmitFeedback}
              disabled={!feedbackRating || !feedbackComment.trim()}
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
