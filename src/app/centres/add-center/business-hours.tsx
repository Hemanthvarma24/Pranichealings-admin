"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, Clock } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface TimeInputProps {
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
}

function TimeInput({ label, required, value, onChange }: TimeInputProps) {
  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        <Input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-10"
        />
        <Clock className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
      </div>
    </div>
  )
}

export function BusinessHours() {
  const [selectedDays, setSelectedDays] = React.useState<string[]>(["Tuesday"])
  const [expandedDays, setExpandedDays] = React.useState<string[]>(["Monday"])
  const [hours, setHours] = React.useState<Record<string, { from: string; to: string }>>(
    DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: { from: "09:00", to: "17:00" }
    }), {})
  )

  const toggleDay = (day: string) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const toggleExpanded = (day: string) => {
    setExpandedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const updateHours = (day: string, field: 'from' | 'to', value: string) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }))
  }

  return (
    <div className="w-full max-w-6xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Business Hours</h1>
      
      <div className="rounded-lg border border-gray-200 p-6">
        <h2 className="mb-4 text-lg font-semibold">Select Business days</h2>
        
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                selectedDays.includes(day)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-900 hover:bg-gray-100"
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {DAYS.map((day) => (
          <div key={day} className="rounded-lg border border-gray-200">
            <div className="flex items-center justify-between p-4">
              <span className="text-base font-medium">{day}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleExpanded(day)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Edit
                  {expandedDays.includes(day) ? (
                    <ChevronUp className="ml-1 inline-block h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 inline-block h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            {expandedDays.includes(day) && (
              <div className="border-t border-gray-200 p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TimeInput
                    label="From"
                    required
                    value={hours[day].from}
                    onChange={(value) => updateHours(day, 'from', value)}
                  />
                  <TimeInput
                    label="To"
                    required
                    value={hours[day].to}
                    onChange={(value) => updateHours(day, 'to', value)}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

