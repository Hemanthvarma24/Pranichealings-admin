"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Footer } from "@/components/dashboard/footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExperienceForm } from "@/app/centres/add-center/experience";
import { EducationForm } from "@/app/centres/add-center/education";
import { AwardsPage } from "@/app/centres/add-center/award";
import { InsurancePage } from "@/app/centres/add-center/insurances";
import { ClinicForm } from "@/app/centres/add-center/clinicsform";
import { BusinessHours } from "@/app/centres/add-center/business-hours";

// Profile schema validation
const profileFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  displayName: z.string().min(2, { message: "Display name is required" }),
  designation: z.string().min(2, { message: "Designation is required" }),
  phoneNumbers: z.string().min(2, { message: "Phone number is required" }),
  emailAddress: z.string().email({ message: "Please enter a valid email address" }),
  knownLanguages: z.array(z.string()).optional(),
  title: z.string().optional(),
  aboutMembership: z.string().optional(),
  memberships: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        aboutMembership: z.string().optional(),
      })
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Component to fetch role and render Sidebar
function RoleWrapper() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "admin";

  return <Sidebar role={role} />;
}

export default function ProfileSettingsPage() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      designation: "",
      phoneNumbers: "",
      emailAddress: "",
      knownLanguages: ["English", "German"],
      title: "",
      aboutMembership: "",
      memberships: [{ title: "", aboutMembership: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "memberships",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 m-8">
        {/* Wrap Sidebar in Suspense */}
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <RoleWrapper />
        </Suspense>

        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <h1 className="mb-6 text-2xl font-semibold">Profile Settings</h1>
            <Tabs defaultValue="experience" className="w-full">
              <TabsList className="h-auto w-full justify-start gap-8 bg-transparent border-b border-gray-200 p-0">
                <TabsTrigger value="basic-details">Basic Details</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="awards">Awards</TabsTrigger>
                <TabsTrigger value="insurances">Insurances</TabsTrigger>
                <TabsTrigger value="clinics">Clinics</TabsTrigger>
                <TabsTrigger value="business-hours">Business Hours</TabsTrigger>
              </TabsList>

              <TabsContent value="basic-details">
                <div className="rounded-lg border bg-white p-8">
                  <h2 className="mb-6 text-lg font-medium">Profile</h2>

                  {/* Form Section */}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <div className="grid grid-cols-3 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="displayName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Name *</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Memberships Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Memberships</h3>
                        {fields.map((item, index) => (
                          <div key={item.id} className="grid grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name={`memberships.${index}.title`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button variant="outline" type="button" onClick={() => remove(index)}>
                              <X /> Remove
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" type="button" onClick={() => append({ title: "", aboutMembership: "" })}>
                          Add Membership
                        </Button>
                      </div>
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </div>
              </TabsContent>

              <TabsContent value="experience">
                <ExperienceForm />
              </TabsContent>
              <TabsContent value="education">
                <EducationForm />
              </TabsContent>
              <TabsContent value="awards">
                <AwardsPage />
              </TabsContent>
              <TabsContent value="insurances">
                <InsurancePage />
              </TabsContent>
              <TabsContent value="clinics">
                <ClinicForm />
              </TabsContent>
              <TabsContent value="business-hours">
                <BusinessHours />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
