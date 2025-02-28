'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp, Upload } from 'lucide-react'
import Image from 'next/image'

export function ClinicForm() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setGalleryImages(prevImages => [...prevImages, ...newImages])
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setGalleryImages(prevImages => [...prevImages, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setGalleryImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Clinics</h1>
        <Button className="bg-emerald-400 hover:bg-emerald-500 text-black">
          Add New Clinic
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Clinic</h2>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="text-red-500 hover:text-red-600 flex items-center gap-2"
          >
            Delete
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {isExpanded && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg mb-2">Logo</h3>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 border rounded-lg flex items-center justify-center bg-gray-50">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <div className="flex gap-4 mb-1">
                    <button className="text-blue-500 hover:text-blue-600">Upload New</button>
                    <button className="text-red-500 hover:text-red-600">Remove</button>
                  </div>
                  <p className="text-gray-600 text-sm">Your Image should Below 4 MB, Accepted format Jpg,Png,Svg</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-lg mb-2">Clinic Name</label>
              <Input className="w-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-lg mb-2">Location</label>
                <Input className="w-full" />
              </div>
              <div>
                <label className="block text-lg mb-2">Address</label>
                <Input className="w-full" />
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-2">Gallery</h3>
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center mb-4 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <p className="text-gray-500">Drop files or Click to upload</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  multiple 
                  accept="image/*"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      width={200}
                      height={150}
                      className="rounded-lg w-full aspect-video object-cover"
                    />
                    <button 
                      className="absolute bottom-2 left-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-[#00ffa6] hover:bg-[#00df96] text-black">
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6 mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Adrian`&apos;s Dentistry</h2>
          <button className="text-red-500 hover:text-red-600 flex items-center gap-2">
            Delete
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </div>
  )
}

