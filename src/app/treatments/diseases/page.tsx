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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  diseaseName: z.string().min(2, {
    message: "Disease name must be at least 2 characters.",
  }),
});

interface Disease {
  id: string;
  diseaseName: string;
  categories: string[];
}

function RoleWrapper() {
  return <Sidebar />;
}

function SidebarFallback() {
  return <div className="w-64 bg-gray-100 animate-pulse"></div>;
}

export default function DiseasesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [diseases, setDiseases] = useState<Disease[]>([
    { id: "#DS001", diseaseName: "Hypertension", categories: ["Cardiac"] },
    { id: "#DS002", diseaseName: "Asthma", categories: ["Respiratory"] },
    { id: "#DS003", diseaseName: "Stroke", categories: ["Neurological"] },
  ]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingDisease, setEditingDisease] = useState<Disease | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      diseaseName: "",
    },
  });

  const handleEdit = (disease: Disease) => {
    setEditingDisease(disease);
    form.reset({
      diseaseName: disease.diseaseName,
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setDiseases((prev) => prev.filter((disease) => disease.id !== id));
    toast({
      title: "Disease Deleted",
      description: `Disease ${id} has been deleted.`,
      variant: "destructive",
    });
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingDisease) {
      setDiseases((prev) =>
        prev.map((disease) =>
          disease.id === editingDisease.id
            ? { ...disease, diseaseName: values.diseaseName }
            : disease
        )
      );
      toast({
        title: "Disease Updated",
        description: `Disease ${editingDisease.id} has been updated.`,
      });
    } else {
      const nextId = diseases.length + 1;
      const newId = `#DS${String(nextId).padStart(3, "0")}`;
      const newDisease: Disease = {
        id: newId,
        diseaseName: values.diseaseName,
        categories: ["General"],
      };
      setDiseases((prev) => [...prev, newDisease]);
      toast({
        title: "Disease Added",
        description: `Disease ${newId} has been added.`,
      });
    }

    setIsAddDialogOpen(false);
    setEditingDisease(null);
    form.reset({
      diseaseName: "",
    });
  };

  const handleDialogChange = (open: boolean) => {
    setIsAddDialogOpen(open);
    if (!open) {
      setEditingDisease(null);
      form.reset({
        diseaseName: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-col md:flex-row min-h-screen m-6">
        <Suspense fallback={<SidebarFallback />}>
          <RoleWrapper />
        </Suspense>
        <main className="flex-1 p-6 h-screen overflow-y-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="mb-4">
            <h1 className="text-3xl font-bold mb-4">Diseases</h1>
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
                  className="bg-[#48c373] hover:bg-green"
                  onClick={() => {
                    setEditingDisease(null);
                    form.reset({ diseaseName: "" });
                  }}
                >
                  Add Disease
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingDisease ? "Edit Disease" : "Add Disease"}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="diseaseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Disease Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter disease name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-[#48c373] hover:bg-green"
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
                      Disease Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {diseases
                    .filter(
                      (disease) =>
                        disease.diseaseName
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        disease.id
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) ||
                        disease.categories.some((category) =>
                          category
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        )
                    )
                    .map((disease) => (
                      <tr key={disease.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                          {disease.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {disease.diseaseName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {disease.categories.join(", ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(disease)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(disease.id)}
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
      <Toaster />
    </div>
  );
}
