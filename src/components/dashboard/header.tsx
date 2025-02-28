"use client"

import Link from "next/link"
import Image from "next/image"
import { Bell, ShoppingCart, ChevronDown, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Logo from "@/app/assets/logo.png"
import User from "@/app/assets/doctors/doctor-thumb-02.jpg"

export function Header({ }) {



  return (
    <header className="sticky top-0 z-50 w-full bg-[#e1e8f0]">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0 bg-[#0D6EFD]">
              <SheetHeader className="border-b border-white/10 p-4">
                <SheetTitle className="flex justify-between items-center">
                  <Image
                    src={Logo}
                    alt="Doccure"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                    priority
                    unoptimized
                  />
                </SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/dashboard" className="flex items-center">
              <Image
                src={Logo}
                alt="Doccure"
                width={150}
                height={50}
                className="h-10 w-auto"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <Button variant="ghost" size="icon" className="relative hover:bg-transparent">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0D6EFD] text-[11px] font-medium text-white">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-transparent">
              <Bell className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0D6EFD] text-[11px] font-medium text-white">
                4
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 p-1 hover:bg-transparent"
                >
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#0D6EFD]">
                    <Image
                      src={User}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center space-x-2 p-2 border-b">
                  <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#0D6EFD]">
                    <Image
                      src={User}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-medium">Darren Elder</p>
                    <p className="text-sm text-gray-500">Doctor</p>
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/doctor-profile-settings" className="w-full">
                    Profile Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/login" className="w-full">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
