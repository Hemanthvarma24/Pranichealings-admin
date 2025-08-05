"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
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
  const role = searchParams.get("role") || "admin";

  return <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with suspense */}
      <Suspense fallback={}>
        <RoleWrapper />
      </Suspense>

      {/* Main Content Area */}
      <main
        className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8">
          {/* Stats Cards */}
          <motion.section
            aria-label="Statistics"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <StatsCards />
          </motion.section>

          {/* Middle Section */}
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
            {/* Appointments List */}
            <motion.section
              aria-label="Appointments"
              className="md:col-span-2 lg:col-span-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <AppointmentsList />
            </motion.section>

            {/* Weekly Overview and Upcoming */}
            <motion.section
              aria-label="Overview"
              className="md:col-span-1 lg:col-span-3 space-y-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <WeeklyOverview />
              <UpcomingAppointment />
            </motion.section>
          </div>

          {/* Bottom Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Recent Activity */}
            <motion.section
              aria-label="Recent Activity"
              className="grid gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              <RecentInvoices />
              <RecentPatients />
            </motion.section>

            {/* Notifications and Availability */}
            <motion.section
              aria-label="Updates"
              className="grid gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <Notifications />
              <ClinicsAvailability />
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}
