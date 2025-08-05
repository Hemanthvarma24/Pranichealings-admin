"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  FileText,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Header } from "@/components/dashboard/header";
import { Footer } from "@/components/dashboard/footer";
import { Sidebar } from "@/components/dashboard/sidebar";

// Sidebar loading fallback
function SidebarFallback() {
  return <div className="w-64 bg-gray-200 animate-pulse h-screen rounded-lg" />;
}

// Session mock data
const sessions = [
  {
    id: "S001",
    date: "Apr 15, 2024",
    time: "10:00 AM - 11:00 AM",
    type: "Energy Healing",
    healer: "Dr. Sarah Johnson",
    status: "completed",
    notes:
      "Patient reported significant improvement in sleep quality. Energy blockages in the lower back area were addressed.",
    feedback:
      "Patient rated session 9/10. Mentioned feeling more energetic after the session.",
  },
  {
    id: "S002",
    date: "Apr 22, 2024",
    time: "2:00 PM - 3:00 PM",
    type: "Meditation Guidance",
    healer: "Dr. Michael Chen",
    status: "completed",
    notes:
      "Introduced patient to mindfulness techniques. Patient was receptive and practiced breathing exercises.",
    feedback:
      "Patient rated session 8/10. Found the breathing techniques helpful for anxiety management.",
  },
  {
    id: "S003",
    date: "Apr 29, 2024",
    time: "11:30 AM - 12:30 PM",
    type: "Energy Healing",
    healer: "Dr. Sarah Johnson",
    status: "upcoming",
    notes: "Follow-up session to address remaining energy imbalances.",
    feedback: "",
  },
  {
    id: "S004",
    date: "May 6, 2024",
    time: "3:30 PM - 4:30 PM",
    type: "Nutritional Consultation",
    healer: "Dr. Lisa Wong",
    status: "scheduled",
    notes:
      "Initial consultation to discuss dietary changes to support healing.",
    feedback: "",
  },
];

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  const filteredSessions =
    activeTab === "all"
      ? sessions
      : sessions.filter((session) => session.status === activeTab);

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="flex flex-1 px-4 py-6">
        <Suspense fallback={<SidebarFallback />}>
          <Sidebar />
        </Suspense>

        <main className="flex-1 ml-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Heading */}
            <div className="flex items-center gap-3 mb-6">
              <Link href="/healings/healings-details">
                <Button
                  variant="ghost"
                  size="icon"
                  className="shadow-sm hover:bg-gray-100 h-8 w-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Session Information
                </h1>
                <p className="text-sm text-gray-500">
                  Manage and review all healing sessions
                </p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs
              defaultValue="all"
              onValueChange={setActiveTab}
              className="mb-6"
            >
              <TabsList className="bg-gray-100 p-1 rounded-lg shadow-inner">
                {["all", "completed", "upcoming", "scheduled"].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="data-[state=active]:bg-white data-[state=active]:text-emerald-600 data-[state=active]:shadow-sm capitalize text-xs"
                  >
                    {tab === "all" ? "All Sessions" : tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Session Cards */}
            <div className="space-y-3">
              {filteredSessions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 bg-gray-50 border border-dashed rounded-lg">
                  <FileText className="w-8 h-8 text-gray-400 mb-2" />
                  <h3 className="text-base font-semibold text-gray-700">
                    No sessions found
                  </h3>
                  <p className="text-sm text-gray-500">
                    No {activeTab !== "all" ? activeTab : ""} sessions to display.
                  </p>
                </div>
              ) : (
                filteredSessions.map((session) => (
                  <Card
                    key={session.id}
                    className={`shadow-sm transition hover:shadow border-l-4 cursor-pointer ${
                      session.status === "completed"
                        ? "border-green-500"
                        : session.status === "upcoming"
                        ? "border-blue-500"
                        : "border-gray-400"
                    }`}
                    onClick={() => toggleCard(session.id)}
                  >
                    <CardHeader className="py-3 px-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base font-semibold flex items-center gap-1">
                            #{session.id}
                            <span className="text-xs font-normal text-gray-500 ml-1">
                              ({session.type})
                            </span>
                          </CardTitle>
                          <Badge
                            className={`text-xs px-2 py-0.5 ${
                              session.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : session.status === "upcoming"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {session.status.charAt(0).toUpperCase() +
                              session.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="h-6 w-6 flex items-center justify-center">
                          {expandedCards[session.id] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className={`px-4 pt-0 pb-3 ${expandedCards[session.id] ? "" : "hidden"}`}>
                      <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                        <InfoItem
                          icon={<Calendar className="text-emerald-600 h-3 w-3" />}
                          label={session.date}
                        />
                        <InfoItem
                          icon={<Clock className="text-emerald-600 h-3 w-3" />}
                          label={session.time}
                        />
                        <InfoItem
                          icon={<User className="text-emerald-600 h-3 w-3" />}
                          label={session.healer.split(' ')[1]}
                        />
                      </div>

                      <div className="bg-gray-50 p-2 rounded-md mb-2 text-xs">
                        <p className="text-gray-700">{session.notes}</p>
                      </div>

                      {session.feedback && (
                        <div className="bg-emerald-50 p-2 rounded-md mb-3 text-xs">
                          <div className="flex items-start gap-1">
                            <MessageCircle className="w-3 h-3 text-emerald-600 mt-0.5" />
                            <p className="text-gray-700">{session.feedback}</p>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex justify-end space-x-2">
                        <TooltipProvider>
                          {session.status === "upcoming" ||
                          session.status === "scheduled" ? (
                            <>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="text-xs h-7"
                                    onClick={(e) => e.stopPropagation()} // Prevent card toggle
                                  >
                                    Reschedule
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="text-xs">
                                  <p>Change date & time</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button 
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7 px-3"
                                    onClick={(e) => e.stopPropagation()} // Prevent card toggle
                                  >
                                    Confirm
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent className="text-xs">
                                  <p>Confirm appointment</p>
                                </TooltipContent>
                              </Tooltip>
                            </>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs h-7"
                                  onClick={(e) => e.stopPropagation()} // Prevent card toggle
                                >
                                  View Report
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="text-xs">
                                <p>See session details</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </TooltipProvider>
                      </div>
                    </CardContent>
                    
                    {/* Always visible summary line when card is collapsed */}
                    {!expandedCards[session.id] && (
                      <CardContent className="py-0 px-4 pb-3">
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-emerald-600" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-emerald-600" />
                              <span>{session.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3 text-emerald-600" />
                              <span>{session.healer.split(' ')[1]}</span>
                            </div>
                          </div>
                          {(session.status === "upcoming" || session.status === "scheduled") && (
                            <Button 
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-6 px-2"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent card toggle
                              }}
                            >
                              Confirm
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// InfoItem reusable component
function InfoItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className="p-1 bg-emerald-100 rounded-full">{icon}</div>
      <span className="text-gray-700 text-xs">{label}</span>
    </div>
  );
}