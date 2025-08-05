"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/app/assets/praniclogo.png"
import { Eye, EyeOff } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const credentials = {
      admin: { email: "admin@gmail.com", password: "admin123" },
      coordinators: { email: "coordinator@gmail.com", password: "coordinator123" },
      healers: { email: "healers@gmail.com", password: "healers123" },
    }

    let userRole = ""

    setTimeout(() => {
      for (const role of Object.keys(credentials) as Array<keyof typeof credentials>) {
        const user = credentials[role]
        if (email === user.email && password === user.password) {
          userRole = role
          break
        }
      }

      if (userRole) {
        router.push(`/dashboard?role=${userRole}`)
      } else {
        setError("Invalid email or password")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="relative">
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl"></div>

      {/* Form content */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 p-6 space-y-4">
        {/* Logo */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-2 bg-[#48c373]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Image
                src={Logo}
                alt="Pranic Healing Logo"
                width={180}
                height={40}
                priority
                className="relative cursor-pointer transition-transform duration-300 hover:scale-105"
                unoptimized
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 text-sm">Sign in to your admin portal</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full p-4 border-2 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#48c373]/50 focus:border-[#48c373] hover:bg-white/90 placeholder-gray-400"
                style={{ borderColor: "#48c373" }}
                disabled={isLoading}
              />
            </div>

            {/* Password with toggle */}
            <div className="space-y-2 relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 ml-1">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full p-4 border-2 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#48c373]/50 focus:border-[#48c373] hover:bg-white/90 placeholder-gray-400 pr-12"
                style={{ borderColor: "#48c373" }}
                disabled={isLoading}
              />
              <div
                className="absolute top-10 right-4 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Forgot password */}
          <div className="text-left">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full p-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
            style={{ backgroundColor: "#48c373" }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Register */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-[#48c373] hover:text-[#48c373]/80 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
