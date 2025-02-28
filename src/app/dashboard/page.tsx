"use client";

import React, { Suspense } from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { AppointmentsList } from "@/components/dashboard/appointments-list";
import { WeeklyOverview } from "@/components/dashboard/weekly-overview";
import UpcomingAppointment from "@/components/dashboard/upcoming-appointment";
import { RecentInvoices } from "@/components/dashboard/recent-invoices";
import { RecentPatients } from "@/components/dashboard/recent-patients";
import { Notifications } from "@/components/dashboard/notifications";
import { ClinicsAvailability } from "@/components/dashboard/clinics-availability";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useSearchParams } from "next/navigation";


function RoleWrapper() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin" || "healers" || "coordinators";

  return <Sidebar role={role}/>;
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
     
      <Suspense fallback={<div>Loading Sidebar...</div>}>
        <RoleWrapper />
      </Suspense>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8">
          {/* Stats Cards */}
          <section aria-label="Statistics">
            <StatsCards />
          </section>

          {/* Middle Section */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
            {/* Appointments List */}
            <section aria-label="Appointments" className="md:col-span-2 lg:col-span-4">
              <AppointmentsList />
            </section>

            {/* Weekly Overview and Upcoming */}
            <section aria-label="Overview" className="md:col-span-1 lg:col-span-3 space-y-4">
              <WeeklyOverview />
              <UpcomingAppointment />
            </section>
          </div>

          {/* Bottom Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Activity */}
            <section aria-label="Recent Activity" className="grid gap-4">
              <RecentInvoices />
              <RecentPatients />
            </section>

            {/* Notifications and Availability */}
            <section aria-label="Updates" className="grid gap-4">
              <Notifications />
              <ClinicsAvailability />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
