"use client";

import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RoleWrapper() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin"; // Fix the incorrect OR condition

  return <Sidebar role={role} />;
}

export default function InfoSettingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen m-6">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <RoleWrapper />
        </Suspense>
        <main className="flex-1 p-6">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Info Settings</h1>
            <p>Manage general information settings.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
