"use client"

import { useState, Suspense } from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Footer } from "@/components/dashboard/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  id: z.string().min(2, { message: "ID must be at least 2 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  adminCost: z.number(),
  coordinatorCost: z.number(),
  healerCost: z.number(),
  totalCost: z.number(),
  status: z.boolean().default(true),
});

interface Patient {
  id: string;
  name: string;
  adminCost: number;
  coordinatorCost: number;
  healerCost: number;
  totalCost: number;
  status: boolean;
}

// Client-side only component that uses useSearchParams
function RoleWrapper() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin";
  
  return <Sidebar role={role} />;
}

export default function DiseasesCategoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [patients, setPatients] = useState<Patient[]>([
    { id: "#PT001", name: "Charlene Reed", adminCost: 100, coordinatorCost: 200, healerCost: 300, totalCost: 600, status: true },
    { id: "#PT002", name: "Travis Trimble", adminCost: 150, coordinatorCost: 250, healerCost: 350, totalCost: 750, status: true },
    { id: "#PT003", name: "Carl Kelly", adminCost: 200, coordinatorCost: 300, healerCost: 400, totalCost: 900, status: true },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      adminCost: 0,
      coordinatorCost: 0,
      healerCost: 0,
      totalCost: 0,
    },
  });

  const handleStatusChange = (id: string) => {
    setPatients((prevPatients) =>
      prevPatients.map((patient) =>
        patient.id === id ? { ...patient, status: !patient.status } : patient
      )
    );
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    form.reset({
      id: patient.id,
      name: patient.name,
      adminCost: patient.adminCost,
      coordinatorCost: patient.coordinatorCost,
      healerCost: patient.healerCost,
      totalCost: patient.totalCost,
      status: patient.status,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== id));
    toast({
      title: "Patient Deleted",
      description: `Patient ${id} has been deleted.`,
      variant: "destructive",
    });
  };

  const updateTotalCost = () => {
    const adminCost = form.getValues("adminCost") || 0;
    const coordinatorCost = form.getValues("coordinatorCost") || 0;
    const healerCost = form.getValues("healerCost") || 0;
    const totalCost = adminCost + coordinatorCost + healerCost;
    form.setValue("totalCost", totalCost);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const totalCost = values.adminCost + values.coordinatorCost + values.healerCost;
    const updatedValues = { ...values, totalCost };

    if (editingPatient) {
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient.id === editingPatient.id ? updatedValues : patient
        )
      );
      toast({
        title: "Category Updated",
        description: `Category ${values.id} has been updated.`,
      });
    } else {
      const newId = `#PT${String(patients.length + 1).padStart(3, '0')}`;
      setPatients((prevPatients) => [...prevPatients, { ...updatedValues, id: newId }]);
      toast({
        title: "Category Added",
        description: `Category ${newId} has been added.`,
      });
    }
    setIsAddDialogOpen(false);
    setEditingPatient(null);
    form.reset();
  };
  
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
                  className="bg-[#0D6EFD] hover:bg-red"
                  onClick={() => {
                    setEditingPatient(null);
                    form.reset({ id: "", name: "", adminCost: 0, coordinatorCost: 0, healerCost: 0, totalCost: 0, status: true });
                  }}
                >
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
                    <h2 className="text-lg font-semibold">Pricing Information</h2>
                    <FormField
                      control={form.control}
                      name="adminCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Admin Cost</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter admin cost"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(value);
                                updateTotalCost();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="coordinatorCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coordinator Cost</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter coordinator cost"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(value);
                                updateTotalCost();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="healerCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Healer Cost</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter healer cost"
                              {...field}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                field.onChange(value);
                                updateTotalCost();
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="totalCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Cost</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} readOnly />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Save</Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-white rounded-lg overflow-hidden">
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
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{patient.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${patient.totalCost.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Switch
                          checked={patient.status}
                          onCheckedChange={() => handleStatusChange(patient.id)}
                          className="bg-green-500 data-[state=checked]:bg-green-500"
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}