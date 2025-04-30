"use client";

import { useState, Suspense } from "react";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Footer } from "@/components/dashboard/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Pencil, Trash2 } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Updated form schema for symptoms
const formSchema = z.object({
  symptomName: z
    .string()
    .min(2, { message: "Symptom name must be at least 2 characters." }),
  treatments: z.array(z.string()).optional(),
});

interface Symptom {
  id: string;
  symptomName: string;
  treatments: string[];
}

// Sample treatments data
const availableTreatments = [
  { id: "TR001", name: "ACE Inhibitors" },
  { id: "TR002", name: "Bronchodilators" },
  { id: "TR003", name: "tPA Therapy" },
  { id: "TR004", name: "Antibiotics" },
  { id: "TR005", name: "Pain Management" },
];

// Client-side only component that uses useSearchParams
function RoleWrapper() {
  return <Sidebar />;
}

// Fallback component to show while loading
function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse"></div>;
}

export default function SymptomsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: "#SYM001",
      symptomName: "Chest Pain",
      treatments: ["TR001", "TR005"],
    },
    {
      id: "#SYM002",
      symptomName: "Shortness of Breath",
      treatments: ["TR002"],
    },
    {
      id: "#SYM003",
      symptomName: "Headache",
      treatments: ["TR005"],
    },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSymptom, setEditingSymptom] = useState<Symptom | null>(null);
  const [selectedTreatments, setSelectedTreatments] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptomName: "",
      treatments: [],
    },
  });

  const handleEdit = (symptom: Symptom) => {
    setEditingSymptom(symptom);
    setSelectedTreatments(symptom.treatments);
    form.reset({
      symptomName: symptom.symptomName,
      treatments: symptom.treatments,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSymptoms((prevSymptoms) =>
      prevSymptoms.filter((symptom) => symptom.id !== id)
    );
    toast({
      title: "Symptom Deleted",
      description: `Symptom ${id} has been deleted.`,
      variant: "destructive",
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingSymptom) {
      // Update existing symptom
      setSymptoms((prevSymptoms) =>
        prevSymptoms.map((symptom) =>
          symptom.id === editingSymptom.id
            ? {
                ...symptom,
                symptomName: values.symptomName,
                treatments: selectedTreatments,
              }
            : symptom
        )
      );
      toast({
        title: "Symptom Updated",
        description: `Symptom ${editingSymptom.id} has been updated.`,
      });
    } else {
      // Generate a new ID for the new symptom
      const nextId = symptoms.length + 1;
      const newId = `#SYM${String(nextId).padStart(3, "0")}`;

      // Add new symptom with the generated ID
      const newSymptom: Symptom = {
        id: newId,
        symptomName: values.symptomName,
        treatments: selectedTreatments,
      };

      setSymptoms((prevSymptoms) => [...prevSymptoms, newSymptom]);

      toast({
        title: "Symptom Added",
        description: `Symptom ${newId} has been added.`,
      });
    }

    // Close dialog and reset form
    setIsAddDialogOpen(false);
    setEditingSymptom(null);
    setSelectedTreatments([]);
    form.reset({
      symptomName: "",
      treatments: [],
    });
  };

  // Handle treatment selection change
  const handleTreatmentChange = (treatmentId: string) => {
    setSelectedTreatments((prev) => {
      if (prev.includes(treatmentId)) {
        return prev.filter((id) => id !== treatmentId);
      } else {
        return [...prev, treatmentId];
      }
    });
  };

  // Handle dialog close - reset form
  const handleDialogChange = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setEditingSymptom(null);
      setSelectedTreatments([]);
      form.reset({
        symptomName: "",
        treatments: [],
      });
    }
  };

  // Helper function to get treatment names from IDs
  const getTreatmentNames = (treatmentIds: string[]) => {
    return treatmentIds
      .map((id) => availableTreatments.find((t) => t.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen m-6">
        <Suspense fallback={<SidebarFallback />}>
          <RoleWrapper />
        </Suspense>
        <main className="flex-1 p-6">
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-4">Symptoms</h1>
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
                    setEditingSymptom(null);
                    setSelectedTreatments([]);
                    form.reset({
                      symptomName: "",
                      treatments: [],
                    });
                  }}
                >
                  Add Symptom
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingSymptom ? "Edit Symptom" : "Add Symptom"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="symptomName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Symptom Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter symptom name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="space-y-2">
                      <FormLabel>Treatments</FormLabel>
                      <div className="border rounded-md p-4">
                        <div className="space-y-4">
                          {availableTreatments.map((treatment) => (
                            <div
                              key={treatment.id}
                              className="flex items-center space-x-2"
                              onClick={() => handleTreatmentChange(treatment.id)}
                            >
                              <div
                                className={`w-5 h-5 rounded-sm border flex items-center justify-center cursor-pointer ${
                                  selectedTreatments.includes(treatment.id)
                                    ? "bg-[#4ead91] text-white border-[#4ead91]"
                                    : "border-gray-300"
                                }`}
                              >
                                {selectedTreatments.includes(treatment.id) && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                )}
                              </div>
                              <Label className="cursor-pointer">
                                {treatment.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#4ead91] hover:bg-green"
                    >
                      Save
                    </Button>
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
                      Symptom 
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Treatments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {symptoms
                    .filter(
                      (symptom) =>
                        symptom.symptomName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        symptom.id
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        getTreatmentNames(symptom.treatments)
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                    )
                    .map((symptom) => (
                      <tr key={symptom.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                          {symptom.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {symptom.symptomName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getTreatmentNames(symptom.treatments)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(symptom)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(symptom.id)}
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