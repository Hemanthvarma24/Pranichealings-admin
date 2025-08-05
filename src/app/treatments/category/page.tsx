"use client"

import { useState, Suspense, useEffect } from "react"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Footer } from "@/components/dashboard/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Pencil, Trash2 } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSearchParams } from "next/navigation"

const formSchema = z.object({
  id: z.string().min(2, { message: "ID must be at least 2 characters." }).optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  adminCost: z.number().min(0),
  coordinatorCost: z.number().min(0),
  healerCost: z.number().min(0),
  centerCost: z.number().min(0),
  totalCost: z.number().min(0),
  status: z.boolean().default(true),
})

interface Patient {
  id: string
  name: string
  adminCost: number
  coordinatorCost: number
  healerCost: number
  centerCost: number
  totalCost: number
  status: boolean
}

// Client-side only component that uses useSearchParams
function RoleWrapper() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || "admin"

  return <Sidebar defaultRole={role as "admin" | "coordinators" | "healers"} />
}

export default function DiseasesCategoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "#PT001",
      name: "Charlene Reed",
      adminCost: 100,
      coordinatorCost: 200,
      healerCost: 300,
      centerCost: 150,
      totalCost: 750,
      status: true,
    },
    {
      id: "#PT002",
      name: "Travis Trimble",
      adminCost: 150,
      coordinatorCost: 250,
      healerCost: 350,
      centerCost: 200,
      totalCost: 950,
      status: true,
    },
    {
      id: "#PT003",
      name: "Carl Kelly",
      adminCost: 200,
      coordinatorCost: 300,
      healerCost: 400,
      centerCost: 250,
      totalCost: 1150,
      status: true,
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients)
  const [activeTab, setActiveTab] = useState("percentage")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      adminCost: 0,
      coordinatorCost: 0,
      healerCost: 0,
      centerCost: 0,
      totalCost: 0,
      status: true,
    },
  })

  // Filter patients when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPatients(patients)
    } else {
      const lowercaseSearch = searchTerm.toLowerCase()
      setFilteredPatients(
        patients.filter(
          (patient) =>
            patient.id.toLowerCase().includes(lowercaseSearch) || patient.name.toLowerCase().includes(lowercaseSearch),
        ),
      )
    }
  }, [searchTerm, patients])

  const handleStatusChange = (id: string) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) => (patient.id === id ? { ...patient, status: !patient.status } : patient)),
    )
  }

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient)
    form.reset({
      id: patient.id,
      name: patient.name,
      adminCost: patient.adminCost,
      coordinatorCost: patient.coordinatorCost,
      healerCost: patient.healerCost,
      centerCost: patient.centerCost,
      totalCost: patient.totalCost,
      status: patient.status,
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id))
    toast({
      title: "Category Deleted",
      description: `Category ${id} has been deleted.`,
      variant: "destructive",
    })
  }

  const updateTotal = () => {
    const adminCost = form.getValues("adminCost") || 0
    const coordinatorCost = form.getValues("coordinatorCost") || 0
    const healerCost = form.getValues("healerCost") || 0
    const centerCost = form.getValues("centerCost") || 0

    const totalCost = adminCost + coordinatorCost + healerCost + centerCost
    form.setValue("totalCost", totalCost)
  }

  const resetForm = () => {
    form.reset({
      name: "",
      adminCost: 0,
      coordinatorCost: 0,
      healerCost: 0,
      centerCost: 0,
      totalCost: 0,
      status: true,
    })
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateTotal()
    const finalValues = form.getValues()

    // Round to 2 decimal places
    const updatedValues = {
      ...finalValues,
      totalCost: Number.parseFloat(finalValues.totalCost.toFixed(2)),
      adminCost: Number.parseFloat(finalValues.adminCost.toFixed(2)),
      coordinatorCost: Number.parseFloat(finalValues.coordinatorCost.toFixed(2)),
      healerCost: Number.parseFloat(finalValues.healerCost.toFixed(2)),
      centerCost: Number.parseFloat(finalValues.centerCost.toFixed(2)),
    }

    if (editingPatient) {
      setPatients((prevPatients) =>
        prevPatients.map((patient) => (patient.id === editingPatient.id ? (updatedValues as Patient) : patient)),
      )
      toast({
        title: "Category Updated",
        description: `Category ${values.id} has been updated.`,
      })
    } else {
      const newId = `#PT${String(patients.length + 1).padStart(3, "0")}`
      setPatients((prevPatients) => [...prevPatients, { ...updatedValues, id: newId } as Patient])
      toast({
        title: "Category Added",
        description: `Category ${newId} has been added.`,
      })
    }
    setIsAddDialogOpen(false)
    setEditingPatient(null)
    resetForm()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen m-6">
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <RoleWrapper />
        </Suspense>
        <main className="flex-1 p-6 h-screen overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-4">Category</h1>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="w-64">
              <Input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#48c373] hover:bg-[#3d9c80]"
                  onClick={() => {
                    setEditingPatient(null)
                    resetForm()
                  }}
                >
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <DialogTitle>{editingPatient ? "Edit Category" : "Add Category"}</DialogTitle>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Category Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter category name"
                              className="h-11 border-gray-300 focus:border-[#48c373] focus:ring-[#48c373]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-t pt-5 mt-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories Cost</h3>
                    </div>

                    <FormField
                      control={form.control}
                      name="adminCost"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Admin Cost</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                ₹
                              </span>
                              <Input
                                type="text"
                                placeholder="0"
                                className="pl-8 h-11 border-gray-300 focus:border-[#48c373] focus:ring-[#48c373]"
                                value={value || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value
                                  const numericValue = inputValue ? Number.parseFloat(inputValue) || 0 : 0
                                  onChange(numericValue)
                                  setTimeout(() => updateTotal(), 0)
                                }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="coordinatorCost"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Coordinator Cost</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                ₹
                              </span>
                              <Input
                                type="text"
                                placeholder="0"
                                className="pl-8 h-11 border-gray-300 focus:border-[#48c373] focus:ring-[#48c373]"
                                value={value || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value
                                  const numericValue = inputValue ? Number.parseFloat(inputValue) || 0 : 0
                                  onChange(numericValue)
                                  setTimeout(() => updateTotal(), 0)
                                }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="healerCost"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Healer Cost</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                ₹
                              </span>
                              <Input
                                type="text"
                                placeholder="0"
                                className="pl-8 h-11 border-gray-300 focus:border-[#48c373] focus:ring-[#48c373]"
                                value={value || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value
                                  const numericValue = inputValue ? Number.parseFloat(inputValue) || 0 : 0
                                  onChange(numericValue)
                                  setTimeout(() => updateTotal(), 0)
                                }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="centerCost"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Center Cost</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                ₹
                              </span>
                              <Input
                                type="text"
                                placeholder="0"
                                className="pl-8 h-11 border-gray-300 focus:border-[#48c373] focus:ring-[#48c373]"
                                value={value || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value
                                  const numericValue = inputValue ? Number.parseFloat(inputValue) || 0 : 0
                                  onChange(numericValue)
                                  setTimeout(() => updateTotal(), 0)
                                }}
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="totalCost"
                      render={({ field: { value, ...field } }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Total Cost</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                ₹
                              </span>
                              <Input
                                type="text"
                                value={value || ""}
                                placeholder="0"
                                readOnly
                                className="pl-8 h-11 bg-gray-50 border-gray-300 text-gray-600 cursor-not-allowed"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full mt-6 bg-[#48c373] hover:bg-[#3d9c80]">
                      Save
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{patient.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{patient.totalCost.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Switch
                            checked={patient.status}
                            onCheckedChange={() => handleStatusChange(patient.id)}
                            className="data-[state=checked]:bg-green-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(patient)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(patient.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    
      <Toaster />
    </div>
  )
}
