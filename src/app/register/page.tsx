"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Check, ChevronsUpDown, Users, Heart } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/app/assets/praniclogo.png"
import AnimatedBackground from "@/components/login/animated-background"

const roles = [
  { value: "coordinator", label: "Coordinator", icon: Users },
  { value: "healer", label: "Healer", icon: Heart },
]

const countryCodes = [
  { value: "+91", label: "+91 (India)" },
  { value: "+1", label: "+1 (USA)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+81", label: "+81 (Japan)" },
  { value: "+86", label: "+86 (China)" },
  { value: "+33", label: "+33 (France)" },
  { value: "+49", label: "+49 (Germany)" },
]

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Brazil",
  "Bulgaria",
  "Canada",
  "Chile",
  "China",
  "Colombia",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Egypt",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Latvia",
  "Lebanon",
  "Lithuania",
  "Luxembourg",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Pakistan",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "Ukraine",
  "United Kingdom",
  "United States",
  "Vietnam",
]

interface FormEvent {
  preventDefault: () => void
}

// Function to calculate age from date of birth
const calculateAge = (dateOfBirth: string): number => {
  if (!dateOfBirth) return 0

  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [countryCodeOpen, setCountryCodeOpen] = useState(false)
  const [dob, setDob] = useState("")
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState("")
  const [countryOpen, setCountryOpen] = useState(false)
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  // Calculate age whenever DOB changes
  useEffect(() => {
    if (dob) {
      const calculatedAge = calculateAge(dob)
      setAge(calculatedAge)
    } else {
      setAge(0)
    }
  }, [dob])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters")
      return
    }

    setPasswordError("")

    console.log({
      firstName,
      email,
      password,
      role,
      mobileNumber: `${countryCode}${mobileNumber}`,
      dob,
      age,
      country,
      state,
      city,
      pincode,
    })

    router.push("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#64b580]/80 px-4 py-10">
      {/* Animated Background Component */}
      <AnimatedBackground />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-200"
      >
        {/* Logo + Heading */}
        <div className="flex flex-col items-center">
          <Image
            src={Logo || "/placeholder.svg"}
            alt="pranic healing Logo"
            width={180}
            height={40}
            priority
            className="mb-4"
            unoptimized
          />
          <h1 className="text-2xl font-semibold text-center mb-4">Register</h1>
        </div>

        {/* Role Selection */}
        <div className="mb-8">
          <Label className="text-base font-semibold text-gray-900 mb-4 block">Select Your Role</Label>
          <div className="relative bg-gray-100 rounded-xl p-1">
            <div
              className={cn(
                "absolute top-1 bottom-1 w-1/2 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out",
                role === "healer" ? "translate-x-full" : "translate-x-0",
              )}
            />
            <div className="relative grid grid-cols-2">
              {roles.map((roleOption) => {
                const Icon = roleOption.icon
                return (
                  <button
                    key={roleOption.value}
                    type="button"
                    onClick={() => setRole(roleOption.value)}
                    className={cn(
                      "relative flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium transition-all duration-300 rounded-lg",
                      role === roleOption.value ? "text-[#48c373] z-10" : "text-gray-600 hover:text-gray-900",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {roleOption.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* First Name and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Enter your first name"
                className="h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Mobile Number</Label>
              <div className="flex gap-1">
                <Popover open={countryCodeOpen} onOpenChange={setCountryCodeOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={countryCodeOpen}
                      className="w-20 h-11 justify-between border-2 border-gray-200 focus:border-[#48c373] text-xs"
                    >
                      {countryCode}
                      <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 p-0">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countryCodes.map((code) => (
                            <CommandItem
                              key={code.value}
                              value={code.value}
                              onSelect={(currentValue) => {
                                setCountryCode(currentValue)
                                setCountryCodeOpen(false)
                              }}
                            >
                              <Check
                                className={cn("h-4 w-4 mr-2", countryCode === code.value ? "opacity-100" : "opacity-0")}
                              />
                              {code.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  placeholder="Enter mobile number"
                  className="flex-1 h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Email and DOB with Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="text-sm font-medium">
                Date of Birth
              </Label>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                    className="h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
                  />
                </div>
                {dob && age > 0 && (
                  <div className="flex items-center justify-center h-11 px-3 bg-[#48c373]/10 border-2 border-[#48c373]/20 rounded-lg min-w-[80px]">
                    <span className="text-sm font-semibold text-[#48c373]">
                      {age} {age === 1 ? "year" : "years"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Country & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Country</Label>
              <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={countryOpen}
                    className="w-full h-11 justify-between border-2 border-gray-200 focus:border-[#48c373]"
                  >
                    {country || "Select country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map((countryName) => (
                          <CommandItem
                            key={countryName}
                            value={countryName}
                            onSelect={(currentValue) => {
                              setCountry(currentValue)
                              setCountryOpen(false)
                            }}
                          >
                            <Check
                              className={cn("mr-2 h-4 w-4", country === countryName ? "opacity-100" : "opacity-0")}
                            />
                            {countryName}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-sm font-medium">
                State
              </Label>
              <Input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                placeholder="Enter state"
                className="h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
              />
            </div>
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City
              </Label>
              <Input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Enter city"
                className="h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pincode" className="text-sm font-medium">
                Pincode
              </Label>
              <Input
                id="pincode"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
                placeholder="Enter pincode"
                className="h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError("")
                }}
                required
                placeholder="Create a password"
                className="h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setPasswordError("")
                }}
                required
                placeholder="Confirm your password"
                className="h-11 border-2 border-gray-200 focus:border-[#48c373] rounded-lg"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold text-white bg-[#48c373] hover:bg-[#3d9a7a] rounded-lg transition-colors"
            disabled={!role}
          >
            Create Account as {role ? (role === "coordinator" ? "Coordinator" : "Healer") : "User"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/" className="text-[#48c373] hover:text-[#3d9a7a] font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
