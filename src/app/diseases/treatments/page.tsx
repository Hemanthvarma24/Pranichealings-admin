"use client"

import { useState, Suspense, useEffect } from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Footer } from "@/components/dashboard/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Pencil, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MultiSelect,
  Option
} from "react-multi-select-component";

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  categories: z.array(z.string()).min(1, { message: "Select at least one category." }),
  disease: z.string().min(1, { message: "Disease is required." }),
});

interface Treatment {
  id: string;
  firstName: string;
  categories: string[];
  disease: string;
}

interface DiseaseOption {
  name: string;
}

// Type definition for diseases data structure
interface DiseasesDataType {
  [key: string]: DiseaseOption[];
}

// Sample disease data structure
const diseasesData: DiseasesDataType = {
  "Cardiac": [
    { name: "Cardiac Arrest" },
    { name: "Heart Failure" }
  ],
  "Respiratory": [
    { name: "Asthma" },
    { name: "COPD" }
  ],
  "Neurological": [
    { name: "Stroke" },
    { name: "Epilepsy" }
  ]
};

// Client-side only component that uses useSearchParams
function RoleWrapper() {
  
  // Pass the role as defaultRole prop instead of role
  return <Sidebar />;
}

// Fallback component to show while loading
function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse"></div>;
}

export default function TreatmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [treatments, setTreatments] = useState<Treatment[]>([
    { id: "#TR001", firstName: "Charlene Reed", categories: ["Cardiac"], disease: "Heart Failure" },
    { id: "#TR002", firstName: "Travis Trimble", categories: ["Respiratory"], disease: "Asthma" },
    { id: "#TR003", firstName: "Carl Kelly", categories: ["Neurological"], disease: "Stroke" },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  const [availableDiseases, setAvailableDiseases] = useState<DiseaseOption[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      categories: [],
      disease: "",
    },
  });

  // Watch for changes in categories to update available disease options
  const selectedCategories = form.watch("categories");

  // Update available diseases when categories change
  useEffect(() => {
    if (selectedCategories && selectedCategories.length > 0) {
      let diseases: DiseaseOption[] = [];
      
      selectedCategories.forEach(category => {
        // Using type guard to check if the category exists in diseasesData
        if (category in diseasesData) {
          diseases = [...diseases, ...diseasesData[category]];
        }
      });
      
      setAvailableDiseases(diseases);
    } else {
      setAvailableDiseases([]);
    }
  }, [selectedCategories]);

  // Reset disease if categories change and current disease is no longer valid
  useEffect(() => {
    const selectedDisease = form.getValues("disease");
    if (selectedDisease && availableDiseases.length > 0) {
      const diseaseNames = availableDiseases.map(d => d.name);
      if (!diseaseNames.includes(selectedDisease)) {
        form.setValue("disease", "");
      }
    }
  }, [availableDiseases, form]);

  const handleEdit = (treatment: Treatment) => {
    setEditingTreatment(treatment);
    form.reset({
      firstName: treatment.firstName,
      categories: treatment.categories,
      disease: treatment.disease,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTreatments((prevTreatments) => prevTreatments.filter((treatment) => treatment.id !== id));
    toast({
      title: "Treatment Deleted",
      description: `Treatment ${id} has been deleted.`,
      variant: "destructive",
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingTreatment) {
      // Update existing treatment
      setTreatments((prevTreatments) =>
        prevTreatments.map((treatment) =>
          treatment.id === editingTreatment.id 
            ? { ...values, id: editingTreatment.id } 
            : treatment
        )
      );
      toast({
        title: "Treatment Updated",
        description: `Treatment ${editingTreatment.id} has been updated.`,
      });
    } else {
      // Generate a new ID for the new treatment
      const nextId = treatments.length + 1;
      const newId = `#TR${String(nextId).padStart(3, '0')}`;
      
      // Add new treatment with the generated ID
      const newTreatment: Treatment = {
        id: newId,
        firstName: values.firstName,
        categories: values.categories,
        disease: values.disease
      };
      
      setTreatments((prevTreatments) => [...prevTreatments, newTreatment]);
      
      toast({
        title: "Treatment Added",
        description: `Treatment ${newId} has been added.`,
      });
    }
    
    // Close dialog and reset form
    setIsAddDialogOpen(false);
    setEditingTreatment(null);
    form.reset({
      firstName: "",
      categories: [],
      disease: "",
    });
  };

  // Handle dialog close - reset form
  const handleDialogChange = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setEditingTreatment(null);
      form.reset({
        firstName: "",
        categories: [],
        disease: "",
      });
    }
  };

  // All available categories for the MultiSelect
  const categoryOptions = Object.keys(diseasesData).map(category => ({
    label: category,
    value: category
  }));
    
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen m-6">
        <Suspense fallback={<SidebarFallback />}>
          <RoleWrapper />
        </Suspense>
        <main className="flex-1 p-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-4">Treatments</h1>
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
            <Dialog open={isAddDialogOpen} onOpenChange={handleDialogChange}>
              <DialogTrigger asChild>
                <Button
                  className="bg-[#4ead91] hover:bg-green"
                  onClick={() => {
                    setEditingTreatment(null);
                    form.reset({
                      firstName: "",
                      categories: [],
                      disease: "",
                    });
                  }}
                >
                  Add Treatment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{editingTreatment ? "Edit Treatment" : "Add Treatment Details"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="categories"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categories (Disease Types)</FormLabel>
                          <FormControl>
                            <MultiSelect
                              options={categoryOptions}
                              value={field.value.map(value => ({
                                label: value,
                                value: value
                              }))}
                              onChange={(selected: Option[]) => {
                                field.onChange(selected.map(item => item.value));
                              }}
                              labelledBy="Select categories"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="disease"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disease</FormLabel>
                          <Select
                            disabled={availableDiseases.length === 0}
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a disease" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableDiseases.map((disease) => (
                                <SelectItem key={disease.name} value={disease.name}>
                                  {disease.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Disease
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {treatments
                    .filter(treatment => 
                      treatment.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      treatment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      treatment.disease.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((treatment) => (
                    <tr key={treatment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{treatment.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{treatment.firstName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {treatment.categories.join(", ")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {treatment.disease}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(treatment)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(treatment.id)}
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