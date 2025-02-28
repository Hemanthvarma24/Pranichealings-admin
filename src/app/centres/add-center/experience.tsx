"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CalendarIcon, ChevronDown, Upload } from 'lucide-react'
import * as z from "zod"
import Image from "next/image";

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const experienceFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  hospital: z.string().min(1, { message: "Hospital is required" }),
  yearOfExperience: z.string().min(1, { message: "Year of Experience is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  employment: z.string().min(1, { message: "Employment type is required" }),
  jobDescription: z.string().min(1, { message: "Job Description is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date().optional(),
  currentlyWorking: z.boolean().default(false),
})

type ExperienceFormValues = z.infer<typeof experienceFormSchema>

export function ExperienceForm() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [logoPreview] = useState<string | null>(null)

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      currentlyWorking: false,
    },
  })

  function onSubmit(data: ExperienceFormValues) {
    console.log(data)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experience</h1>
        <Button className="bg-emerald-400 hover:bg-emerald-500 text-white">
        Add New Experience
        </Button>
      </div>

      <div className="rounded-lg border bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-medium">Experience</h2>
          <Button variant="ghost" className="text-red-500 hover:text-red-600">
            Delete
          </Button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-medium">Hospital Logo</h3>
            <div className="flex items-start space-x-4">
              <div className="flex h-32 w-32 items-center justify-center rounded-lg border bg-gray-50">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Hospital logo"
                    className="h-full w-full rounded-lg object-cover"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant="link"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Upload New
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Your Image should Below 4 MB, Accepted format jpg,png,svg
                </p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hospital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hospital <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year of Experience <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employment type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                field.value.toLocaleDateString()
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={form.watch("currentlyWorking")}
                            >
                              {field.value ? (
                                field.value.toLocaleDateString()
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="currentlyWorking"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>I Currently Working Here</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button">
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="rounded-lg border bg-white">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-4"
        >
          <span className="text-lg font-medium">
            Hill Medical Hospital, Newcastle (15 Mar 2021 - 24 Jan 2023)
          </span>
          <ChevronDown className={cn("h-5 w-5 transform transition-transform", isExpanded && "rotate-180")} />
        </button>
        {isExpanded && (
          <div className="border-t p-4">
            <div className="flex justify-end">
              <Button variant="ghost" className="text-red-500 hover:text-red-600">
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-emerald-400 hover:bg-emerald-500">Save Changes</Button>
      </div>
    </div>
  )
}

