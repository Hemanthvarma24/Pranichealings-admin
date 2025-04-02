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
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger, 
  DialogTitle 
} from "@/components/ui/dialog"
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
  totalCost: z.number().min(0),
  adminPercent: z.number().min(0).max(100),
  coordinatorPercent: z.number().min(0).max(100),
  healerPercent: z.number().min(0).max(100),
  status: z.boolean().default(true),
})

interface Patient {
  id: string
  name: string
  adminCost: number
  coordinatorCost: number
  healerCost: number
  totalCost: number
  adminPercent?: number
  coordinatorPercent?: number
  healerPercent?: number
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
      totalCost: 600,
      adminPercent: 16.67,
      coordinatorPercent: 33.33,
      healerPercent: 50,
      status: true,
    },
    {
      id: "#PT002",
      name: "Travis Trimble",
      adminCost: 150,
      coordinatorCost: 250,
      healerCost: 350,
      totalCost: 750,
      adminPercent: 20,
      coordinatorPercent: 33.33,
      healerPercent: 46.67,
      status: true,
    },
    {
      id: "#PT003",
      name: "Carl Kelly",
      adminCost: 200,
      coordinatorCost: 300,
      healerCost: 400,
      totalCost: 900,
      adminPercent: 22.22,
      coordinatorPercent: 33.33,
      healerPercent: 44.44,
      status: true,
    },
  ])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(patients)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      adminCost: 0,
      coordinatorCost: 0,
      healerCost: 0,
      totalCost: 0,
      adminPercent: 0,
      coordinatorPercent: 0,
      healerPercent: 0,
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
            patient.id.toLowerCase().includes(lowercaseSearch) ||
            patient.name.toLowerCase().includes(lowercaseSearch)
        )
      )
    }
  }, [searchTerm, patients])

  const handleStatusChange = (id: string) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) => (patient.id === id ? { ...patient, status: !patient.status } : patient))
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
      totalCost: patient.totalCost,
      adminPercent: patient.adminPercent || 0,
      coordinatorPercent: patient.coordinatorPercent || 0,
      healerPercent: patient.healerPercent || 0,
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

  const validatePercentages = () => {
    const adminPercent = form.getValues("adminPercent") || 0
    const coordinatorPercent = form.getValues("coordinatorPercent") || 0
    const healerPercent = form.getValues("healerPercent") || 0
    
    const total = adminPercent + coordinatorPercent + healerPercent
    return total <= 100
  }

  const resetForm = () => {
    form.reset({
      name: "",
      adminCost: 0,
      coordinatorCost: 0,
      healerCost: 0,
      totalCost: 0,
      adminPercent: 0,
      coordinatorPercent: 0,
      healerPercent: 0,
      status: true,
    })
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!validatePercentages()) {
      toast({
        title: "Validation Error",
        description: "The sum of percentages cannot exceed 100%.",
        variant: "destructive",
      })
      return
    }

    const totalCost = values.totalCost
    const adminCost = (totalCost * values.adminPercent) / 100
    const coordinatorCost = (totalCost * values.coordinatorPercent) / 100
    const healerCost = (totalCost * values.healerPercent) / 100

    // Round to 2 decimal places
    const updatedValues = { 
      ...values, 
      totalCost,
      adminCost: parseFloat(adminCost.toFixed(2)),
      coordinatorCost: parseFloat(coordinatorCost.toFixed(2)),
      healerCost: parseFloat(healerCost.toFixed(2)),
      adminPercent: parseFloat(values.adminPercent.toFixed(2)),
      coordinatorPercent: parseFloat(values.coordinatorPercent.toFixed(2)),
      healerPercent: parseFloat(values.healerPercent.toFixed(2))
    }

    if (editingPatient) {
      setPatients((prevPatients) =>
        prevPatients.map((patient) => (patient.id === editingPatient.id ? updatedValues as Patient : patient))
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
        <main className="flex-1 p-6">
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
                  className="bg-[#4ead91] hover:bg-[#3d9c80]"
                  onClick={() => {
                    setEditingPatient(null)
                    resetForm()
                  }}
                >
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogTitle>
                  {editingPatient ? "Edit Category" : "Add New Category"}
                </DialogTitle>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <h2 className="text-xl font-semibold">Category</h2>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <h2 className="text-xl font-semibold mt-6">Pricing Info</h2>
                    <FormField
                      control={form.control}
                      name="totalCost"
                      render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                          <FormLabel>Total Cost (in Rs)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter total cost"
                              value={value || ""}
                              onChange={(e) => {
                                const inputValue = e.target.value;
                                const value = inputValue ? parseFloat(inputValue) : 0;
                                onChange(value);

                                // Update amounts based on percentages
                                const adminPercent = form.getValues("adminPercent") || 0;
                                const coordinatorPercent = form.getValues("coordinatorPercent") || 0;
                                const healerPercent = form.getValues("healerPercent") || 0;

                                form.setValue("adminCost", (value * adminPercent) / 100);
                                form.setValue("coordinatorCost", (value * coordinatorPercent) / 100);
                                form.setValue("healerCost", (value * healerPercent) / 100);
                              }}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="coordinatorPercent"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Coordinator Cost (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter percentage"
                                min="0"
                                max="100"
                                step="0.01"
                                value={value || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const value = inputValue ? parseFloat(inputValue) : 0;
                                  onChange(value);
                                  const totalCost = form.getValues("totalCost") || 0;
                                  form.setValue("coordinatorCost", (totalCost * value) / 100);
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="coordinatorCost"
                        render={({ field: { value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                value={value || ""} 
                                placeholder="Amount"
                                readOnly 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="healerPercent"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Healer Cost (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter percentage"
                                min="0"
                                max="100"
                                step="0.01"
                                value={value || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const value = inputValue ? parseFloat(inputValue) : 0;
                                  onChange(value);
                                  const totalCost = form.getValues("totalCost") || 0;
                                  form.setValue("healerCost", (totalCost * value) / 100);
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="healerCost"
                        render={({ field: { value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                value={value || ""} 
                                placeholder="Amount"
                                readOnly 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="adminPercent"
                        render={({ field: { value, onChange, ...field } }) => (
                          <FormItem>
                            <FormLabel>Admin Cost (%)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter percentage"
                                min="0"
                                max="100"
                                step="0.01"
                                value={value || ""}
                                onChange={(e) => {
                                  const inputValue = e.target.value;
                                  const value = inputValue ? parseFloat(inputValue) : 0;
                                  onChange(value);
                                  const totalCost = form.getValues("totalCost") || 0;
                                  form.setValue("adminCost", (totalCost * value) / 100);
                                }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="adminCost"
                        render={({ field: { value, ...field } }) => (
                          <FormItem>
                            <FormLabel>Amount</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                value={value || ""} 
                                placeholder="Amount"
                                readOnly 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button type="submit" className="w-full mt-6 bg-[#4ead91] hover:bg-[#3d9c80]">
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
      <Footer />
      <Toaster />
    </div>
  )
}