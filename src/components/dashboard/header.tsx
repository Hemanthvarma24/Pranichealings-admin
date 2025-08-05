"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Logo from "@/app/assets/praniclogo.png";
import User from "@/app/assets/doctors/doctor-thumb-02.png";

export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#e1e8f0] shadow-sm">
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
            <SheetContent
              side="left"
              className="w-[300px] p-0 bg-[#0D6EFD] text-white"
            >
              <SheetHeader className="border-b border-white/10 p-4">
                <SheetTitle className="flex justify-between items-center">
                  <Image
                    src={Logo}
                    alt="pranic healing"
                    width={180}
                    height={60}
                    className="h-12 w-auto"
                    priority
                    unoptimized
                  />
                </SheetTitle>
              </SheetHeader>
              <div className="p-4 space-y-4">
                <Link href="/dashboard" className="block hover:underline">
                  Dashboard
                </Link>
                <Link
                  href="/doctor-profile-settings"
                  className="block hover:underline"
                >
                  Profile Settings
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src={Logo}
                alt="pranic healing"
                width={200}
                height={70}
                className="h-14 w-auto"
                priority
                unoptimized
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Notification */}
            <motion.div whileHover={{ scale: 1.1 }} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-transparent"
              >
                <Bell className="h-6 w-6 text-gray-700" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0D6EFD] text-[11px] font-semibold text-white shadow-md">
                  4
                </span>
              </Button>
            </motion.div>

            {/* User Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-transparent px-1"
                  >
                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#48c373]">
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
                </motion.div>
              </DropdownMenuTrigger>
              <AnimatePresence>
                {mounted && (
                  <DropdownMenuContent
                    align="end"
                    className="w-56 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="flex items-center gap-2 p-2 border-b">
                      <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-[#48c373]">
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
                      <Link
                        href="/"
                        className="w-full text-red-600 font-medium"
                      >
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
