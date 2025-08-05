"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  MessageSquare,
  ArrowLeft,
  Edit,
  Users,
  CheckCircle,
  Clock,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image, { type StaticImageData } from "next/image";
import pasient1 from "@/app/assets/patients/patient2.jpg";

// Define types for our data structures

interface Patient {
  name: string;
  email: string;
  phone: string;
  image: StaticImageData;
  address: string;
  conditions: string;
  allergies: string;
}

interface Session {
  id: string;
  date: string;
  dateNumeric: string;
  time: string;
  amount: number;
  status: "assigned" | "ongoing" | "completed";
  startDate?: string;
  endDate?: string;
  createdDate?: string;
  totalSessions?: number;
  feedback?: string;
  rating?: number;
}

interface HealingSession {
  id: string;
  status: string;
  coordinator: string;
  startDate: string;
  endDate: string;
  totalSessions: number;
  completedSessions: number;
  ongoingSessions: number;
  totalAmount: number;
  amountPaid: number;
  balanceToPay: number;
  patient: Patient;
  healingPlan: {
    type: string;
    frequency: string;
    duration: string;
  };
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
    allergies: "",
  },
  healingPlan: {
    type: "Energy Healing",
    frequency: "Twice weekly",
    duration: "5 sessions",
  },
};

export default function HealerHealingDetails() {
  const [isCreateSessionDialogOpen, setIsCreateSessionDialogOpen] =
    useState<boolean>(false);
  const [sessionDate, setSessionDate] = useState<string>("");
  const [sessionTime, setSessionTime] = useState<string>("");
  const [sessionNotes, setSessionNotes] = useState<string>("");
  const router = useRouter();

  // Initialize state for each tab's sessions
  const [assignedSessions, setAssignedSessions] = useState<Session[]>([
    {
      id: "PHSE003",
      date: "22 July 2025",
      dateNumeric: "22",
      time: "05:00 PM",
      amount: 500,
      status: "assigned",
      createdDate: "20 July 2025",
    },
    {
      id: "PHSE004",
      date: "24 July 2025",
      dateNumeric: "24",
      time: "06:00 PM",
      amount: 500,
      status: "assigned",
      createdDate: "21 July 2025",
    },
  ]);

  const [ongoingSessions, setOngoingSessions] = useState<Session[]>([
    {
      id: "PHSE002",
      date: "20 July 2025",
      dateNumeric: "20",
      time: "05:00 PM",
      amount: 500,
      status: "ongoing",
      startDate: "20 July 2025",
    },
    {
      id: "PHSE005",
      date: "21 July 2025",
      dateNumeric: "21",
      time: "04:00 PM",
      amount: 500,
      status: "ongoing",
      startDate: "21 July 2025",
    },
  ]);

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
      feedback: "Great session, patient showed improvement",
      rating: 5,
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
      feedback: "Patient responded well to treatment",
      rating: 4,
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
    },
  ]);

  // Function to handle creating a new session
  const handleCreateSession = () => {
    if (!sessionDate || !sessionTime) {
      alert("Please fill in all required fields");
      return;
    }

    // Format the date
    const dateObj = new Date(sessionDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const formattedDate = `${dateObj.getDate()} ${
      monthNames[dateObj.getMonth()]
    } ${dateObj.getFullYear()}`;
    const dateNumeric = dateObj.getDate().toString();

    // Format the time (convert 24h to 12h format)
    const timeArr = sessionTime.split(":");
    const hours = Number.parseInt(timeArr[0]);
    const minutes = timeArr[1];
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    // Create a new session object
    const newSession: Session = {
      id: `PHSE00${
        assignedSessions.length +
        ongoingSessions.length +
        completedSessions.length +
        8
      }`,
      date: formattedDate,
      dateNumeric: dateNumeric,
      time: formattedTime,
      amount: 500,
      status: "assigned",
      createdDate: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    // Add the new session to assigned sessions
    setAssignedSessions([...assignedSessions, newSession]);

    // Clear input fields
    setSessionDate("");
    setSessionTime("");
    setSessionNotes("");

    // Close the dialog
    setIsCreateSessionDialogOpen(false);
  };

  // Function to get badge color based on status

  // Navigate to healing form
  const navigateToHealingForm = () => {
    router.push("/healingform");
  };

  // Render assigned session card
  const renderAssignedSessionCard = (session: Session) => (
    <Card
      key={session.id}
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="p-4">
        {/* Top row with ID and Status */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[#48c373] text-lg font-semibold">{session.id}</h3>
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-0.5 rounded-full text-xs">
            Assigned
          </Badge>
        </div>

        {/* Bottom grid with session details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Created Date
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {session.createdDate}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Time
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {session.time}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Sessions
            </p>
            <p className="text-gray-900 text-sm font-semibold">1</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Amount
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              ₹{session.amount}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Render ongoing session card
  const renderOngoingSessionCard = (session: Session) => (
    <Card
      key={session.id}
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <CardContent className="p-4">
        {/* Top row with ID, Status, and Submit Feedback button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[#48c373] text-lg font-semibold">
              {session.id}
            </h3>
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-0.5 rounded-full text-xs">
              Ongoing
            </Badge>
          </div>
          <Button
            variant="outline"
            className="text-[#48c373] border-[#48c373] hover:bg-[#f0f9f7] px-3 py-1 rounded-md text-sm bg-transparent"
            onClick={navigateToHealingForm}
          >
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            Submit Results
          </Button>
        </div>

        {/* Bottom grid with session details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Start Date
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {session.startDate}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Time
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {session.time}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Session
            </p>
            <p className="text-gray-900 text-sm font-semibold">1</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Amount
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              ₹{session.amount}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderCompletedSessionCard = (session: Session) => (
    <Card
      key={session.id}
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow text-sm"
    >
      <CardContent className="p-4">
        {/* Top row with ID, Status, and Edit Feedback button */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-[#48c373] text-lg font-semibold">
              {session.id}
            </h3>
            <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-0.5 rounded-full text-xs">
              Completed
            </Badge>
          </div>
          <Button
            variant="outline"
            className="text-[#48c373] border-[#48c373] hover:bg-[#f0f9f7] px-3 py-1 rounded-md text-sm bg-transparent"
            onClick={navigateToHealingForm}
          >
            <Edit className="h-3.5 w-3.5 mr-1" />
            Edit Results
          </Button>
        </div>

        {/* Bottom grid with session details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Start Date
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {session.startDate}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              End Date
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {session.endDate}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Total Session
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              {session.totalSessions}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs font-medium mb-1 uppercase tracking-wide">
              Amount
            </p>
            <p className="text-gray-900 text-sm font-semibold">
              ₹{session.amount}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with Create Session Button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 bg-transparent"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Healing Details</h1>
        </div>
        <Button
          className="bg-[#48c373] hover:bg-[#3d9c80] text-white px-6 py-2"
          onClick={() => setIsCreateSessionDialogOpen(true)}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Create Session
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Patient Photo and Details */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              {/* Patient Photo and Basic Info */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={healingSession.patient.image || "/placeholder.svg"}
                    alt={healingSession.patient.name}
                    fill
                    className="rounded-full object-cover border-3 border-[#48c373]"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#48c373] mb-1">
                    {healingSession.id}
                  </h2>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {healingSession.patient.name}
                  </h3>
                </div>
              </div>

              {/* Patient Details */}
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <p className="font-medium text-gray-800">
                    {healingSession.patient.email}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone</p>
                  <p className="font-medium text-gray-800">
                    {healingSession.patient.phone}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Address</p>
                  <p className="font-medium text-gray-800">
                    {healingSession.patient.address}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">
                    Medical Conditions
                  </p>
                  <p className="font-medium text-gray-800">
                    {healingSession.patient.conditions}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">Coordinator</p>
                  <p className="font-medium text-gray-800">
                    {healingSession.coordinator}
                  </p>
                </div>
              </div>

              {/* Healing Plan Section */}
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Healing Plan
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Type</p>
                    <p className="font-medium text-gray-800">
                      {healingSession.healingPlan.type}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Frequency</p>
                    <p className="font-medium text-gray-800">
                      {healingSession.healingPlan.frequency}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Duration</p>
                    <p className="font-medium text-gray-800">
                      {healingSession.healingPlan.duration}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-2/3 space-y-6">
          {/* Enhanced Session Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Sessions Card */}
            <Card className="shadow-lg border-0  hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-700">
                      {healingSession.totalSessions}
                    </p>
                    <p className="text-xs text-blue-600 font-medium">
                      Sessions
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-1">
                    Total Sessions
                  </h3>
                </div>
              </CardContent>
            </Card>

            {/* Completed Sessions Card */}
            <Card className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-500 rounded-full">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-700">
                      {healingSession.completedSessions}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      Completed
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-green-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (healingSession.completedSessions /
                              healingSession.totalSessions) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-green-600 font-medium">
                      {Math.round(
                        (healingSession.completedSessions /
                          healingSession.totalSessions) *
                          100
                      )}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ongoing Sessions Card */}
            <Card className="shadow-lg border-0  hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-500 rounded-full">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-orange-700">
                      {healingSession.ongoingSessions}
                    </p>
                    <p className="text-xs text-orange-600 font-medium">
                      Active
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-orange-600" />
                    <p className="text-sm text-orange-600">
                      Currently in progress
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sessions Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sessions</h2>
            {/* Session Tabs */}
            <Tabs defaultValue="assigned" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger
                  value="assigned"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#48c373] data-[state=active]:shadow-sm rounded-md font-medium"
                >
                  Assigned ({assignedSessions.length})
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

              <TabsContent value="assigned" className="mt-6 space-y-4">
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

      {/* Create Session Dialog */}
      <Dialog
        open={isCreateSessionDialogOpen}
        onOpenChange={setIsCreateSessionDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#48c373]">
              Create Healing Session
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Session Notes</Label>
              <Textarea
                id="notes"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder="Add session notes here"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsCreateSessionDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#48c373] hover:bg-[#3d9c80]"
              onClick={handleCreateSession}
            >
              Create Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
