// app/settings/courses/page.tsx
import { Suspense } from "react";
import CoursesClient from "@/app/settings/courses/CoursesClient";

function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CoursesClient />
    </Suspense>
  );
}