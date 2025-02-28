'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Calendar } from 'lucide-react'

export  function AwardsPage() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isSurgeonExpanded, setIsSurgeonExpanded] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Awards</h1>
          <Button size="lg" className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium">
            Add New Award
          </Button>
        </div>

        <Card className="mb-6 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-5">
            <CardTitle className="text-lg font-medium">Awards</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-transparent px-0"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Delete
              {isExpanded ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          
          {isExpanded && (
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="award-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Award Name
                  </label>
                  <Input 
                    id="award-name"
                    type="text" 
                    placeholder="Enter award name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="award-year" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Year <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Input 
                      id="award-year"
                      type="text" 
                      value="11-12-2024"
                      className="pr-10"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  id="description"
                  placeholder="Enter description" 
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  className="text-red-500 hover:text-red-600 hover:bg-transparent"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="mb-8 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-5">
            <CardTitle className="text-lg font-medium">Best Surgeon</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-transparent px-0"
              onClick={() => setIsSurgeonExpanded(!isSurgeonExpanded)}
            >
              Delete
              {isSurgeonExpanded ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </Button>
          </CardHeader>
        </Card>

        <div className="flex justify-end gap-4">
          <Button 
            variant="outline"
            size="lg"
          >
            Cancel
          </Button>
          <Button 
            size="lg"
            className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </main>
  )
}

