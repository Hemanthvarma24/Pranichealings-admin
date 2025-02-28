'use client'

import { useState } from "react"
import { Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function EducationForm() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Education</h1>
        <Button className="bg-emerald-400 hover:bg-emerald-500 text-white">
          Add New Education
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button variant="link" className="text-red-500 hover:text-red-600">
            Delete
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload Section */}
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="space-x-2">
                  <Button variant="link" className="text-blue-500 p-0">Upload New</Button>
                  <Button variant="link" className="text-red-500 p-0">Remove</Button>
                </div>
                <p className="text-sm text-gray-500">
                  Your Image should Below 4 MB, Accepted format Jpg,Png,Svg
                </p>
              </div>
            </div>
          </div>

          {/* Institution and Course */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="institution">Name of the institution</Label>
              <Input id="institution" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input id="course" />
            </div>
          </div>

          {/* Dates and Years */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-1">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input id="startDate" placeholder="11-12-2024" />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-1">
                End Date <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input id="endDate" placeholder="11-12-2024" />
                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="years" className="flex items-center gap-1">
                No of Years <span className="text-red-500">*</span>
              </Label>
              <Input id="years" />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-1">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea id="description" className="min-h-[100px]" />
          </div>

          {/* Cambridge Section */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border p-4">
              <span>Cambridge (MBBS)</span>
              <Button variant="link" className="text-red-500">
                Delete
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              {/* Add Cambridge specific content here */}
            </CollapsibleContent>
          </Collapsible>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-[#00E676] hover:bg-[#00E676]/90">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

