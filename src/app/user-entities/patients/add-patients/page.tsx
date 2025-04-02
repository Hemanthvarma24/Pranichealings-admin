"use client"

import type React from "react"
import { Suspense } from "react"
import { useState, useEffect } from "react"
import { useRouter} from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Upload, X } from "lucide-react"
import * as z from "zod"
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
import { countries, states, cities } from "@/lib/location-data"

// Coordinator form schema validation
const coordinatorFormSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  dob: z.string().min(1, { message: "Date of birth is required" }),
  age: z.coerce.number().min(18, { message: "Age must be at least 18" }),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  state: z.string().min(2, { message: "State is required" }),
  city: z.string().min(2, { message: "City is required" }),
  street: z.string().min(2, { message: "Street address is required" }),
  nearby: z.string().optional(),
  pincode: z.string().min(4, { message: "Valid postal/ZIP code is required" }),
  profession: z.string().min(1, { message: "Profession is required" }),
  test: z.string().optional(),
  facebookLink: z.string().optional(),
  twitterLink: z.string().optional(),
  linkedinLink: z.string().optional(),
  remarks: z.string().optional(),
  centers: z.string().min(1, { message: "Please select at least one center" }),
  status: z.string().min(1, { message: "Status is required" }),
})

type CoordinatorFormValues = z.infer<typeof coordinatorFormSchema>

export default function AddCoordinatorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <AddCoordinatorContent />
    </Suspense>
  )
}

function AddCoordinatorContent() {
  const router = useRouter()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [availableStates, setAvailableStates] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])

  const form = useForm<CoordinatorFormValues>({
    resolver: zodResolver(coordinatorFormSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      dob: "",
      age: 0,
      bloodGroup: "",
      country: "",
      state: "",
      city: "",
      street: "",
      nearby: "",
      pincode: "",
      profession: "",
      test: "",
      facebookLink: "",
      twitterLink: "",
      linkedinLink: "",
      remarks: "",
      centers: "",
      status: "",
    },
  })

  // Watch the country and state fields to update dependent dropdowns
  const selectedCountry = form.watch("country")
  const selectedState = form.watch("state")

  // Update states when country changes
  useEffect(() => {
    if (selectedCountry) {
      const statesForCountry = states[selectedCountry] || []
      setAvailableStates(statesForCountry)

      // Reset state and city if country changes
      const currentState = form.getValues("state")
      const isStateValid = statesForCountry.includes(currentState)

      if (currentState && !isStateValid) {
        form.setValue("state", "", { shouldValidate: false })
        form.setValue("city", "", { shouldValidate: false })
        setAvailableCities([])
      }
    } else {
      setAvailableStates([])
      setAvailableCities([])
    }
  }, [selectedCountry, form])

  // Update cities when state changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      const citiesForState = cities[`${selectedCountry}-${selectedState}`] || []
      setAvailableCities(citiesForState)

      // Reset city if state changes and current city is not valid
      const currentCity = form.getValues("city")
      const isCityValid = citiesForState.includes(currentCity)

      if (currentCity && !isCityValid) {
        form.setValue("city", "", { shouldValidate: false })
      }
    } else {
      setAvailableCities([])
    }
  }, [selectedCountry, selectedState, form])

  // Calculate age from date of birth
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return age
  }

  // Update age when date of birth changes
  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value
    form.setValue("dob", dob)

    if (dob) {
      const age = calculateAge(dob)
      form.setValue("age", age)
    }
  }

  function onSubmit(data: CoordinatorFormValues) {
    // Generate ID if not provided
    if (!data.id) {
      data.id = `COORD${Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0")}`
    }

    // Create coordinator object with all data
    const coordinatorData = {
      ...data,
      image: imagePreview || "/placeholder.svg?height=200&width=200",
      address: {
        country: data.country,
        state: data.state,
        city: data.city,
        street: data.street,
        nearby: data.nearby,
        pincode: data.pincode,
      },
      socialLinks: {
        facebook: data.facebookLink,
        twitter: data.twitterLink,
        linkedin: data.linkedinLink,
      },
      appointmentDate: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
      appointmentTime: "Available",
      location: `${data.city}, ${data.state}`,
      lastBooking: "New Coordinator",
    }

    try {
      // Get existing coordinators
      const existingCoordinators = JSON.parse(localStorage.getItem("coordinators") || "[]")

      // Add new coordinator
      localStorage.setItem("coordinators", JSON.stringify([...existingCoordinators, coordinatorData]))

      // Redirect to coordinators list
      router.push("/user-entities/coordinators")
    } catch (error) {
      console.error("Error saving coordinator data:", error)
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
      // Reset the input value so the same file can be selected again if removed
      event.target.value = ""
    }
  }

  const removeImage = () => {
    setImagePreview(null)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 m-8">
        <Sidebar/>

        <main className="flex-1 p-6">
          <div className="container mx-auto max-w-5xl">
            <h1 className="mb-6 text-2xl font-semibold">Add Patients</h1>

            <Card>
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium border-b pb-2">Basic Information</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address *</FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@example.com" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="dob"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth *</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} onChange={handleDobChange} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  disabled
                                  value={field.value || 0}
                                  onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="bloodGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Blood Group *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select blood group" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="A+">A+</SelectItem>
                                  <SelectItem value="A-">A-</SelectItem>
                                  <SelectItem value="B+">B+</SelectItem>
                                  <SelectItem value="B-">B-</SelectItem>
                                  <SelectItem value="AB+">AB+</SelectItem>
                                  <SelectItem value="AB-">AB-</SelectItem>
                                  <SelectItem value="O+">O+</SelectItem>
                                  <SelectItem value="O-">O-</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="profession"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Profession *</FormLabel>
                              <FormControl>
                                <Input placeholder="Medical Coordinator" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="test"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Test</FormLabel>
                              <FormControl>
                                <Input placeholder="Test information" {...field} />
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
                              <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCountry}>
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
                              <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState}>
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
                    </div>

                    {/* Social Links */}
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium border-b pb-2">Social Links</h2>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="facebookLink"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Facebook</FormLabel>
                              <FormControl>
                                <Input placeholder="https://facebook.com/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="twitterLink"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter</FormLabel>
                              <FormControl>
                                <Input placeholder="https://twitter.com/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="linkedinLink"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>LinkedIn</FormLabel>
                              <FormControl>
                                <Input placeholder="https://linkedin.com/in/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-6">
                      <h2 className="text-lg font-medium border-b pb-2">Additional Information</h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="centers"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assigned Centers *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select center" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Apollo Medical Center">Apollo Medical Center</SelectItem>
                                  <SelectItem value="Fortis Healthcare">Fortis Healthcare</SelectItem>
                                  <SelectItem value="Max Super Speciality Hospital">
                                    Max Super Speciality Hospital
                                  </SelectItem>
                                  <SelectItem value="All Centers">All Centers</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="processing">Processing</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="remarks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Remarks</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Additional notes or remarks about the coordinator"
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
                      <h2 className="text-lg font-medium border-b pb-2">Profile Image</h2>
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                      >
                        {imagePreview ? (
                          <div className="relative w-full max-w-md">
                            <Image
                              src={imagePreview || "/placeholder.svg"}
                              alt="Profile preview"
                              className="w-full h-auto rounded-lg object-cover max-h-64"
                            />
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
                            htmlFor="profile-image"
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
                          id="profile-image"
                          onChange={handleImageUpload}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                      <Button type="button" variant="outline" onClick={() => router.push("/user-entities/patients")}>
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-[#4ead91] hover:bg-[#3c9a7f] text-white px-8">
                        Add Patients
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

