"use client"

import { LoginForm } from "@/components/login/login-form"
import AnimatedBackground from "@/components/login/animated-background"
import Image from "next/image"
import banner from "@/app/assets/login-banner-2.png"

export default function Page() {
  return (
    <div className="min-h-screen bg-[#64b580]/80 flex flex-col relative overflow-hidden">
      {/* Animated Background Component */}
      <AnimatedBackground />

      <main className="flex-1 flex items-center justify-center relative z-10 p-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            {/* Left Side - Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative group">
                
                {/* Image container */}
                <div className="relative  ">
                  <Image
                    src={banner || "/placeholder.svg"}
                    alt="Login Banner"
                    width={500}
                    height={500}
                    className="w-full h-auto "
                    unoptimized
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  )
}
