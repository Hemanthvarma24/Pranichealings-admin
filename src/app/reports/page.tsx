"use client";

import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RoleWrapper() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin"; // Fixed incorrect OR condition

  return <Sidebar role={role} />;
}

export default function ReportsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen m-6">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <RoleWrapper />
        </Suspense>
        <main className="flex-1 p-6">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <p>View and generate various reports for your medical practice.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
