"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, MessageSquare, Star } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Image, { type StaticImageData } from "next/image"
import pasient1 from "@/app/assets/patients/patient6.jpg"

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
  startDate: string
  numberOfSessions: number
  amount: number
  coordinatorName: string
  healerName: string
  status: "completed" | "ongoing" | "upcoming"
}

interface Feedback {
  id: string
  author: string
  role: string
  rating: number
  comment: string
  date: string
  sessionId: string
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
  sessions: Session[]
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
  sessions: [
    {
      id: "PHSE001",
      startDate: "18 July 2025",
      numberOfSessions: 1,
      amount: 500,
      coordinatorName: "Mr. Sathish Kumar",
      healerName: "Dr. Sarah Johnson",
      status: "completed",
    },
    {
      id: "PHSE002",
      startDate: "19 July 2025",
      numberOfSessions: 1,
      amount: 500,
      coordinatorName: "Mr. Sathish Kumar",
      healerName: "Dr. Lisa Rodriguez",
      status: "completed",
    },
    {
      id: "PHSE003",
      startDate: "20 July 2025",
      numberOfSessions: 1,
      amount: 500,
      coordinatorName: "Mr. Sathish Kumar",
      healerName: "Dr. David Kim",
      status: "completed",
    },
    {
      id: "PHSE004",
      startDate: "21 July 2025",
      numberOfSessions: 1,
      amount: 500,
      coordinatorName: "Mr. Sathish Kumar",
      healerName: "Dr. Michael Chen",
      status: "ongoing",
    },
    {
      id: "PHSE005",
      startDate: "22 July 2025",
      numberOfSessions: 1,
      amount: 500,
      coordinatorName: "Mr. Sathish Kumar",
      healerName: "Dr. Sarah Johnson",
      status: "ongoing",
    },
    {
      id: "PHSE006",
      startDate: "24 July 2025",
      numberOfSessions: 1,
      amount: 500,
      coordinatorName: "Mr. Sathish Kumar",
      healerName: "Dr. Amina Patel",
      status: "upcoming",
    },
  ],
}

// Mock feedback data
const feedbackData: {
  patient: Feedback[]
  coordinator: Feedback[]
  healer: Feedback[]
} = {
  patient: [
    {
      id: "PF001",
      author: "Adrian Smith",
      role: "Patient",
      rating: 9,
      comment:
        "The healing session was incredibly effective. I felt a significant reduction in my back pain and anxiety levels. Dr. Sarah Johnson was very professional and made me feel comfortable throughout the session.",
      date: "18 July 2025",
      sessionId: "PHSE001",
    },
    {
      id: "PF002",
      author: "Adrian Smith",
      role: "Patient",
      rating: 8,
      comment:
        "Another great session with Dr. Lisa Rodriguez. The sound therapy techniques really helped me relax and I noticed improved sleep quality after the session.",
      date: "19 July 2025",
      sessionId: "PHSE002",
    },
    {
      id: "PF003",
      author: "Adrian Smith",
      role: "Patient",
      rating: 10,
      comment:
        "Excellent session with Dr. David Kim. The crystal healing approach was new to me but very effective. I feel much more balanced and centered now.",
      date: "20 July 2025",
      sessionId: "PHSE003",
    },
  ],
  coordinator: [
    {
      id: "CF001",
      author: "Mr. Sathish Kumar",
      role: "Coordinator",
      rating: 9,
      comment:
        "Patient showed excellent cooperation during the session. Dr. Sarah Johnson provided comprehensive care and the patient responded very well to the energy healing techniques. Session completed successfully within the scheduled time.",
      date: "18 July 2025",
      sessionId: "PHSE001",
    },
    {
      id: "CF002",
      author: "Mr. Sathish Kumar",
      role: "Coordinator",
      rating: 8,
      comment:
        "Good session overall. Patient was punctual and engaged well with Dr. Lisa Rodriguez. The sound therapy session went smoothly and patient reported positive effects immediately after treatment.",
      date: "19 July 2025",
      sessionId: "PHSE002",
    },
    {
      id: "CF003",
      author: "Mr. Sathish Kumar",
      role: "Coordinator",
      rating: 10,
      comment:
        "Outstanding session coordination. Dr. David Kim and the patient had excellent rapport. The crystal healing session was conducted professionally and patient showed remarkable improvement in energy levels.",
      date: "20 July 2025",
      sessionId: "PHSE003",
    },
  ],
  healer: [
    {
      id: "HF001",
      author: "Dr. Sarah Johnson",
      role: "Healer",
      rating: 8,
      comment:
        "Patient was very receptive to energy healing techniques. Noticed significant improvement in energy blockages around the back area. Patient reported immediate relief from chronic pain. Recommend continuing with similar sessions.",
      date: "18 July 2025",
      sessionId: "PHSE001",
    },
    {
      id: "HF002",
      author: "Dr. Lisa Rodriguez",
      role: "Healer",
      rating: 9,
      comment:
        "Excellent response to sound therapy. Patient showed deep relaxation during the session and reported reduced anxiety levels. The healing frequencies resonated well with the patient's energy field.",
      date: "19 July 2025",
      sessionId: "PHSE002",
    },
    {
      id: "HF003",
      author: "Dr. David Kim",
      role: "Healer",
      rating: 10,
      comment:
        "Remarkable session with crystal healing. Patient's chakras were significantly balanced after the treatment. Used amethyst and clear quartz which worked perfectly for the patient's condition. Highly recommend continuing this approach.",
      date: "20 July 2025",
      sessionId: "PHSE003",
    },
  ],
}

export default function AdminHealingIntegrated() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("patient")

  // Check if this is accessed from requests context
  const isRequestContext = searchParams.get("context") === "request"

  const handleViewFeedback = (sessionId: string) => {
    setSelectedSessionId(sessionId)
  }

  const closeFeedbackModal = () => {
    setSelectedSessionId(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 hover:bg-green-600"
      case "ongoing":
        return "bg-orange-500 hover:bg-orange-600"
      case "upcoming":
        return "bg-blue-500 hover:bg-blue-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const getSessionFeedback = (sessionId: string) => {
    return {
      patient: feedbackData.patient.filter((f) => f.sessionId === sessionId),
      coordinator: feedbackData.coordinator.filter((f) => f.sessionId === sessionId),
      healer: feedbackData.healer.filter((f) => f.sessionId === sessionId),
    }
  }

  const getRatingStats = (feedbacks: Feedback[]) => {
    if (feedbacks.length === 0) return { average: 0, total: 0 }
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0)
    const average = (total / feedbacks.length).toFixed(1)
    return { average: Number.parseFloat(average), total: feedbacks.length }
  }

  const renderFeedbackCard = (feedback: Feedback) => (
    <Card key={feedback.id} className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">{feedback.author}</CardTitle>
            <p className="text-sm text-gray-500">{feedback.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-800">{feedback.rating}/10</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {feedback.sessionId}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="text-sm text-gray-500">{feedback.date}</div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const renderSessionCard = (session: Session) => (
    <Card key={session.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        {/* Header with Status */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span
              className={`${getStatusColor(session.status)} text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}
            >
              {session.status}
            </span>
          </div>
          {/* Only show feedback button if NOT in request context */}
          {!isRequestContext && (
            <Button
              variant="outline"
              className="text-[#48c373] border-[#48c373] hover:bg-[#f0f9f7] bg-white"
              onClick={() => handleViewFeedback(session.id)}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              View Feedback
            </Button>
          )}
        </div>

        {/* Session Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Session ID</p>
            <p className="text-gray-900 font-semibold">{session.id}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Start Date</p>
            <p className="text-gray-900 font-semibold">{session.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Session Type</p>
            <p className="text-gray-900 font-semibold">Individual Session</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Amount</p>
            <p className="text-gray-900 font-semibold">₹{session.amount}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Coordinator</p>
            <p className="text-gray-900 font-semibold">{session.coordinatorName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Healer Name</p>
            <p className="text-gray-900 font-semibold">{session.healerName}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Filter sessions based on context
  const getSessionsToDisplay = () => {
    if (isRequestContext) {
      // Show only ongoing sessions for requests
      return healingSession.sessions.filter((session) => session.status === "ongoing")
    }
    // Show all sessions for normal view
    return healingSession.sessions
  }

  const sessionsToDisplay = getSessionsToDisplay()
  const sessionFeedback = selectedSessionId ? getSessionFeedback(selectedSessionId) : null

  return (
    <div className="max-w-8xl mx-auto p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <ArrowLeft
            className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => router.back()}
          />
          <h1 className="text-3xl font-bold text-gray-800">
            {isRequestContext ? "Healing Request" : "Healing Details"}
          </h1>
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
          {/* Summary Cards Row - Only show if not in request context */}
          {!isRequestContext && (
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
                      <span className="font-bold text-xl text-green-600">{healingSession.completedSessions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Request Sessions</span>
                      <span className="font-bold text-xl text-orange-600">{healingSession.ongoingSessions}</span>
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
          )}

          {/* Sessions Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {isRequestContext ? "Request Sessions" : "Sessions"}
            </h2>
            {sessionsToDisplay.length > 0 ? (
              <div className="space-y-6">{sessionsToDisplay.map(renderSessionCard)}</div>
            ) : (
              <Card className="shadow-sm">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500 text-lg">No ongoing sessions available</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal - Only show if not in request context */}
      {!isRequestContext && (
        <Dialog open={!!selectedSessionId} onOpenChange={closeFeedbackModal}>
          <DialogContent
            className="max-w-4xl max-h-[90vh] overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Session Feedback - {selectedSessionId}
              </DialogTitle>
            </DialogHeader>
            {sessionFeedback && (
              <div className="mt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg mb-6">
                    <TabsTrigger
                      value="patient"
                      className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
                    >
                      Patient Feedback
                    </TabsTrigger>
                    <TabsTrigger
                      value="coordinator"
                      className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
                    >
                      Coordinator Feedback
                    </TabsTrigger>
                    <TabsTrigger
                      value="healer"
                      className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
                    >
                      Healer Feedback
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="patient" className="space-y-6">
                    {sessionFeedback.patient.length > 0 && (
                      <Card className="bg-gradient-to-r from-[#48c373]/10 to-[#48c373]/5">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">Patient Feedback</h3>
                              <p className="text-gray-600">Feedback from patients about their healing sessions</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-2xl font-bold text-gray-800">
                                  {getRatingStats(sessionFeedback.patient).average}
                                </span>
                                <span className="text-gray-500">/10</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <div className="space-y-4">
                      {sessionFeedback.patient.length > 0 ? (
                        sessionFeedback.patient.map(renderFeedbackCard)
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          No patient feedback available for this session.
                        </p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="coordinator" className="space-y-6">
                    {sessionFeedback.coordinator.length > 0 && (
                      <Card className="bg-gradient-to-r from-blue-500/10 to-blue-500/5">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">Coordinator Feedback</h3>
                              <p className="text-gray-600">Feedback from coordinators about session management</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-2xl font-bold text-gray-800">
                                  {getRatingStats(sessionFeedback.coordinator).average}
                                </span>
                                <span className="text-gray-500">/10</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <div className="space-y-4">
                      {sessionFeedback.coordinator.length > 0 ? (
                        sessionFeedback.coordinator.map(renderFeedbackCard)
                      ) : (
                        <p className="text-center text-gray-500 py-8">
                          No coordinator feedback available for this session.
                        </p>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="healer" className="space-y-6">
                    {sessionFeedback.healer.length > 0 && (
                      <Card className="bg-gradient-to-r from-purple-500/10 to-purple-500/5">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-2">Healer Feedback</h3>
                              <p className="text-gray-600">
                                Professional feedback from healers about treatment sessions
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2 mb-1">
                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-2xl font-bold text-gray-800">
                                  {getRatingStats(sessionFeedback.healer).average}
                                </span>
                                <span className="text-gray-500">/10</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    <div className="space-y-4">
                      {sessionFeedback.healer.length > 0 ? (
                        sessionFeedback.healer.map(renderFeedbackCard)
                      ) : (
                        <p className="text-center text-gray-500 py-8">No healer feedback available for this session.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
