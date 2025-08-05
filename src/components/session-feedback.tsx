"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Star, User, Calendar, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

interface Feedback {
  id: string
  author: string
  role: string
  rating: number
  comment: string
  date: string
  sessionId: string
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

export default function SessionFeedback() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("patient")

  const renderFeedbackCard = (feedback: Feedback) => (
    <Card key={feedback.id} className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-[#48c373]/10 p-2 rounded-full">
              <User className="h-5 w-5 text-[#48c373]" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">{feedback.author}</CardTitle>
              <p className="text-sm text-gray-500">{feedback.role}</p>
            </div>
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
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{feedback.date}</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
              <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const getRatingStats = (feedbacks: Feedback[]) => {
    if (feedbacks.length === 0) return { average: 0, total: 0 }
    const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0)
    const average = (total / feedbacks.length).toFixed(1)
    return { average: Number.parseFloat(average), total: feedbacks.length }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <ArrowLeft className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-800" onClick={() => router.back()} />
        <h1 className="text-3xl font-bold text-gray-800">Session Feedback</h1>
      </div>

      {/* Feedback Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg mb-8">
          <TabsTrigger
            value="patient"
            className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
          >
            Patient Feedback ({feedbackData.patient.length})
          </TabsTrigger>
          <TabsTrigger
            value="coordinator"
            className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
          >
            Coordinator Feedback ({feedbackData.coordinator.length})
          </TabsTrigger>
          <TabsTrigger
            value="healer"
            className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
          >
            Healer Feedback ({feedbackData.healer.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patient" className="space-y-6">
          {/* Stats Card */}
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
                      {getRatingStats(feedbackData.patient).average}
                    </span>
                    <span className="text-gray-500">/10</span>
                  </div>
                  <p className="text-sm text-gray-500">Based on {getRatingStats(feedbackData.patient).total} reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Cards */}
          <div className="space-y-6">{feedbackData.patient.map(renderFeedbackCard)}</div>
        </TabsContent>

        <TabsContent value="coordinator" className="space-y-6">
          {/* Stats Card */}
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
                      {getRatingStats(feedbackData.coordinator).average}
                    </span>
                    <span className="text-gray-500">/10</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Based on {getRatingStats(feedbackData.coordinator).total} reviews
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Cards */}
          <div className="space-y-6">{feedbackData.coordinator.map(renderFeedbackCard)}</div>
        </TabsContent>

        <TabsContent value="healer" className="space-y-6">
          {/* Stats Card */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-purple-500/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Healer Feedback</h3>
                  <p className="text-gray-600">Professional feedback from healers about treatment sessions</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold text-gray-800">
                      {getRatingStats(feedbackData.healer).average}
                    </span>
                    <span className="text-gray-500">/10</span>
                  </div>
                  <p className="text-sm text-gray-500">Based on {getRatingStats(feedbackData.healer).total} reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Cards */}
          <div className="space-y-6">{feedbackData.healer.map(renderFeedbackCard)}</div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
