'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Upload } from 'lucide-react'

export  function InsurancePage() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isStarExpanded, setIsStarExpanded] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <div className="container py-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Insurance</h1>
          <Button size="lg" className="bg-emerald-400 hover:bg-emerald-500 text-white font-medium">
            Add New Insurance
          </Button>
        </div>

        <Card className="mb-6 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 py-5">
            <CardTitle className="text-lg font-medium">Insurance</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-transparent px-0 flex items-center gap-1"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Delete
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </CardHeader>
          
          {isExpanded && (
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-medium mb-4">Logo</h3>
                  <div className="flex items-start gap-6">
                    <div className="w-32 h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex gap-3">
                        <Button variant="link" className="text-blue-500 hover:text-blue-600 px-0 h-auto font-normal">
                          Upload New
                        </Button>
                        <Button variant="link" className="text-red-500 hover:text-red-600 px-0 h-auto font-normal">
                          Remove
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">
                        Your Image should Below 4 MB, Accepted format Jpg,Png,Svg
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="insurance-name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Insurance Name
                  </label>
                  <Input 
                    id="insurance-name"
                    type="text" 
                    placeholder="Enter insurance name"
                  />
                </div>
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
            <CardTitle className="text-lg font-medium">Star health</CardTitle>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-500 hover:text-red-600 hover:bg-transparent px-0 flex items-center gap-1"
              onClick={() => setIsStarExpanded(!isStarExpanded)}
            >
              Delete
              {isStarExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
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

