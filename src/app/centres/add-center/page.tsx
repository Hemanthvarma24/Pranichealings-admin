"use client"

import type React from "react"

import { useState, useEffect, Suspense, useCallback } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Upload, X } from "lucide-react"
import * as z from "zod"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Footer } from "@/components/dashboard/footer"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Mock location data - replace with your actual location data
const countries = ["United States", "United Kingdom", "Canada", "Australia", "India"]
const states: Record<string, string[]> = {
  "United States": ["California", "New York", "Texas", "Florida"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
  Australia: ["New South Wales", "Victoria", "Queensland", "Western Australia"],
  India: ["Karnataka", "Maharashtra", "Delhi", "Tamil Nadu"],
}
const cities: Record<string, string[]> = {
  "United States-California": ["San Francisco", "Los Angeles", "San Diego"],
  "United States-New York": ["New York City", "Buffalo", "Albany"],
  "United Kingdom-England": ["London", "Manchester", "Birmingham"],
  "Canada-Ontario": ["Toronto", "Ottawa", "Hamilton"],
  "India-Karnataka": ["Bangalore", "Mysore", "Hubli"],
  "India-Maharashtra": ["Mumbai", "Pune", "Nagpur"],
}

const centerFormSchema = z.object({
  centerId: z.string().min(1, { message: "Center ID is required" }),
  centerName: z.string().min(2, { message: "Center name is required" }),
  countryCode: z.string().min(1, { message: "Country code is required" }),
  phoneNumber: z.string().min(10, { message: "Valid phone number is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  website: z.string().optional(),
  yearEstablished: z.string().regex(/^\d{4}$/, { message: "Please enter a valid year (YYYY)" }),
  country: z.string().min(2, { message: "Country is required" }),
  state: z.string().min(2, { message: "State is required" }),
  city: z.string().min(2, { message: "City is required" }),
  street: z.string().min(2, { message: "Street address is required" }),
  nearby: z.string().optional(),
  pincode: z.string().min(4, { message: "Valid postal/ZIP code is required" }),
  description: z.string().optional(),
})

type CenterFormValues = z.infer<typeof centerFormSchema>

interface CenterData extends CenterFormValues {
  id: string
  image: string
  location: string
  lastBooking: string
  appointmentDate: string
  appointmentTime: string
}

function AddCenterPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "admin"
  const isEditMode = searchParams.get("edit") === "true"
  const centerId = searchParams.get("id")

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [availableStates, setAvailableStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  const form = useForm<CenterFormValues>({
    resolver: zodResolver(centerFormSchema),
    defaultValues: {
      centerId: "",
      centerName: "",
      countryCode: "+1",
      phoneNumber: "",
      email: "",
      website: "",
      yearEstablished: "",
      country: "",
      state: "",
      city: "",
      street: "",
      nearby: "",
      pincode: "",
      description: "",
    },
  })

  // Load center data if in edit mode - only run once
  useEffect(() => {
    if (isEditMode && centerId && !dataLoaded) {
      setIsLoading(true)
      try {
        const defaultCenters = [
          {
            id: "CTR0005",
            centerName: "Apollo Medical Center",
            appointmentDate: "26 Sep 2024",
            appointmentTime: "10:20 AM",
            location: "Bangalore, Karnataka",
            lastBooking: "11 Feb 2024",
            image: "/placeholder.svg?height=200&width=200",
            centerId: "CTR0005",
            countryCode: "+1",
            phoneNumber: "9876543210",
            email: "apollo@example.com",
            website: "https://www.apollo.com",
            yearEstablished: "2010",
            country: "United States",
            state: "California",
            city: "San Francisco",
            street: "123 Medical Avenue",
            nearby: "Near Central Park",
            pincode: "94105",
            description: "A leading medical center with state-of-the-art facilities.",
          },
          {
            id: "CTR0006",
            centerName: "Fortis Healthcare",
            appointmentDate: "25 Aug 2024",
            appointmentTime: "10:45 AM",
            location: "Mumbai, Maharashtra",
            lastBooking: "03 Jan 2024",
            image: "/placeholder.svg?height=200&width=200",
            centerId: "CTR0006",
            countryCode: "+44",
            phoneNumber: "8765432109",
            email: "fortis@example.com",
            website: "https://www.fortis.com",
            yearEstablished: "2005",
            country: "United Kingdom",
            state: "England",
            city: "London",
            street: "456 Health Street",
            nearby: "Near Victoria Station",
            pincode: "EC1A 1BB",
            description: "Comprehensive healthcare services for all age groups.",
          },
          {
            id: "CTR0007",
            centerName: "Max Super Speciality Hospital",
            appointmentDate: "27 Aug 2024",
            appointmentTime: "10:45 AM",
            location: "Delhi, Delhi",
            lastBooking: "03 Jan 2024",
            image: "/placeholder.svg?height=200&width=200",
            centerId: "CTR0007",
            countryCode: "+1",
            phoneNumber: "7654321098",
            email: "max@example.com",
            website: "https://www.maxhospital.com",
            yearEstablished: "2008",
            country: "Canada",
            state: "Ontario",
            city: "Toronto",
            street: "789 Hospital Road",
            nearby: "Near City Hall",
            pincode: "M5V 2H1",
            description: "Specialized medical care with advanced technology.",
          },
        ]

        const storedCenters = JSON.parse(localStorage.getItem("medicalCenters") || "[]")
        const allCenters = [...defaultCenters, ...storedCenters]
        const centerToEdit = allCenters.find((center) => center.id === decodeURIComponent(centerId))

        if (centerToEdit) {
          // Set initial states and cities based on loaded data
          if (centerToEdit.country) {
            const statesForCountry = states[centerToEdit.country] || []
            setAvailableStates(statesForCountry)

            if (centerToEdit.state) {
              const citiesForState = cities[`${centerToEdit.country}-${centerToEdit.state}`] || []
              setAvailableCities(citiesForState)
            }
          }

          form.reset({
            centerId: centerToEdit.centerId || centerToEdit.id,
            centerName: centerToEdit.centerName || "",
            countryCode: centerToEdit.countryCode || "+1",
            phoneNumber: centerToEdit.phoneNumber || "",
            email: centerToEdit.email || "",
            website: centerToEdit.website || "",
            yearEstablished: centerToEdit.yearEstablished || "",
            country: centerToEdit.country || "",
            state: centerToEdit.state || "",
            city: centerToEdit.city || "",
            street: centerToEdit.street || "",
            nearby: centerToEdit.nearby || "",
            pincode: centerToEdit.pincode || "",
            description: centerToEdit.description || "",
          })

          setImagePreview(centerToEdit.image || null)
          setDataLoaded(true)
        } else {
          console.error("Center not found for editing:", centerId)
          router.push(`/centres?role=${role}`)
          return
        }
      } catch (error) {
        console.error("Error loading center data:", error)
        router.push(`/centres?role=${role}`)
        return
      } finally {
        setIsLoading(false)
      }
    } else if (!isEditMode) {
      setDataLoaded(true)
    }
  }, [isEditMode, centerId, dataLoaded, form, router, role])

  // Handle country change
  const handleCountryChange = useCallback(
    (country: string) => {
      const statesForCountry = states[country] || []
      setAvailableStates(statesForCountry)
      setAvailableCities([])

      // Only reset if not loading initial data
      if (dataLoaded) {
        form.setValue("state", "")
        form.setValue("city", "")
      }
    },
    [form, dataLoaded],
  )

  // Handle state change
  const handleStateChange = useCallback(
    (country: string, state: string) => {
      const citiesForState = cities[`${country}-${state}`] || []
      setAvailableCities(citiesForState)

      // Only reset if not loading initial data
      if (dataLoaded) {
        form.setValue("city", "")
      }
    },
    [form, dataLoaded],
  )

  // Watch for country changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "country" && value.country && dataLoaded) {
        handleCountryChange(value.country)
      } else if (name === "state" && value.country && value.state && dataLoaded) {
        handleStateChange(value.country, value.state)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, handleCountryChange, handleStateChange, dataLoaded])

  function onSubmit(data: CenterFormValues) {
    const centerData: CenterData = {
      ...data,
      id: data.centerId,
      image: imagePreview || "/placeholder.svg?height=200&width=200",
      location: `${data.city}, ${data.state}`,
      lastBooking: isEditMode ? "Updated" : "New Center",
      appointmentDate: new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      appointmentTime: "Available",
    }

    try {
      const existingCenters = JSON.parse(localStorage.getItem("medicalCenters") || "[]")

      if (isEditMode) {
        const centerIndex = existingCenters.findIndex((center: CenterData) => center.id === centerData.id)
        if (centerIndex !== -1) {
          existingCenters[centerIndex] = centerData
        } else {
          existingCenters.push(centerData)
        }
        localStorage.setItem("medicalCenters", JSON.stringify(existingCenters))
      } else {
        localStorage.setItem("medicalCenters", JSON.stringify([...existingCenters, centerData]))
      }

      router.push(`/centres?role=${role}`)
    } catch (error) {
      console.error("Error saving center data:", error)
      alert("Error saving center data. Please try again.")
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      event.target.value = ""
    }
  }

  const removeImage = () => {
    setImagePreview(null)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex m-8 justify-center items-center">
          <div className="text-center">
            <p className="text-lg">Loading center data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 m-8">
        <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />

        <main className="flex-1 p-6 h-screen overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="container mx-auto max-w-5xl">
            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => router.push(`/centres?role=${role}`)}
                className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h1 className="text-2xl font-semibold">{isEditMode ? "Edit Center Details" : "Add Center Details"}</h1>
            </div>

            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Center Basic Information */}
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium border-b pb-2">Center Information</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="centerId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Center ID *</FormLabel>
                              <FormControl>
                                <Input placeholder="CTR001" {...field} disabled={isEditMode} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="centerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Center Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Apollo Medical Center" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex space-x-2">
                          <FormField
                            control={form.control}
                            name="countryCode"
                            render={({ field }) => (
                              <FormItem className="w-24">
                                <FormLabel>Code *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="+1" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="+1">+1</SelectItem>
                                    <SelectItem value="+44">+44</SelectItem>
                                    <SelectItem value="+61">+61</SelectItem>
                                    <SelectItem value="+65">+65</SelectItem>
                                    <SelectItem value="+91">+91</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem className="flex-1">
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input placeholder="9876543210" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="center@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="https://www.example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="yearEstablished"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year Established *</FormLabel>
                              <FormControl>
                                <Input placeholder="2020" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium border-b pb-2">Address Information</h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {countries.map((country) => (
                                    <SelectItem key={country} value={country}>
                                      {country}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Province *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={!availableStates.length}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select state" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableStates.map((state) => (
                                    <SelectItem key={state} value={state}>
                                      {state}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                disabled={!availableCities.length}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select city" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {availableCities.map((city) => (
                                    <SelectItem key={city} value={city}>
                                      {city}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel>Street Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main Street" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pincode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal/ZIP Code *</FormLabel>
                              <FormControl>
                                <Input placeholder="10001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="nearby"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nearby Landmark</FormLabel>
                            <FormControl>
                              <Input placeholder="Near City Mall" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Center Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Brief description of the medical center"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Image Upload Section */}
                    <div className="space-y-4">
                      <h2 className="text-lg font-medium border-b pb-2">Center Image</h2>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px]"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                      >
                        {imagePreview ? (
                          <div className="relative w-full max-w-md">
                            <div className="w-full rounded-lg max-h-64 relative">
                              <Image
                                src={imagePreview || "/placeholder.svg"}
                                alt="Center preview"
                                width={400}
                                height={300}
                                className="rounded-lg object-cover max-h-64 w-full"
                                unoptimized
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
                              onClick={removeImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <label
                            htmlFor="center-image"
                            className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                          >
                            <Upload className="h-12 w-12 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Drag and drop an image, or click to browse</p>
                            <Button type="button" variant="outline" className="mt-2">
                              Upload Image
                            </Button>
                          </label>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="center-image"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                      <Button type="button" variant="outline" onClick={() => router.push(`/centres?role=${role}`)}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-[#48c373] hover:bg-[#3c9a7f] text-white px-8">
                        {isEditMode ? "Update Center" : "Add Center"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function AddCenterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AddCenterPageContent />
    </Suspense>
  )
}
