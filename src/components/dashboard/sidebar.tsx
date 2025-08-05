"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  Users,
  Stethoscope,
  Wallet,
  Receipt,
  Settings,
  ChevronDown,
  ChevronUp,
  LogOut,
} from "lucide-react";
import user from "@/app/assets/patients/patient2.jpg";
import bg from "@/app/assets/bgside (1).png";

type SubmenuItem = {
  label: string;
  href: string;
};

type MenuItem = {
  icon: React.ElementType;
  label: string;
  href?: string;
  submenu?: SubmenuItem[];
};

type UserRole = "admin" | "coordinators" | "healers";

interface SidebarProps {
  defaultRole?: UserRole;
}

export function Sidebar({ defaultRole = "admin" }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentRole, setCurrentRole] = useState<UserRole>(defaultRole);

  useEffect(() => {
    const roleFromUrl = searchParams.get("role") as UserRole | null;
    const roleFromStorage = localStorage.getItem("userRole") as UserRole | null;
    const role = roleFromUrl || roleFromStorage || defaultRole;

    if (["admin", "coordinators", "healers"].includes(role)) {
      setCurrentRole(role as UserRole);
      if (roleFromUrl && roleFromUrl !== roleFromStorage) {
        localStorage.setItem("userRole", role);
      }
    } else {
      setCurrentRole(defaultRole);
    }
  }, [searchParams, defaultRole]);

  const allMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: ClipboardList,
      label: "Treatments",
      submenu: [
        { label: "Category", href: "/treatments/category" },
        { label: "Diseases", href: "/treatments/diseases" },
        { label: "Symptoms", href: "/treatments/symptoms" },
      ],
    },
    { icon: Calendar, label: "Centres", href: "/centres" },
    {
      icon: Users,
      label: "User Entities",
      href: "/user-entities",
      submenu: [
        { label: "Coordinator", href: "/user-entities/coordinator" },
        { label: "Healers", href: "/user-entities/healers" },
        { label: "Patients", href: "/user-entities/patients" },
      ],
    },
    { icon: Stethoscope, label: "Healings", href: "/healings" },
    { icon: Wallet, label: "Payouts", href: "/payouts" },
    { icon: Receipt, label: "Reports", href: "/reports" },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      submenu: [
        { label: "Blogs", href: "/settings/blogs" },
        { label: "Courses", href: "/settings/courses" },
      ],
    },
  ];

  const roleBasedAccess: Record<UserRole, string[]> = {
    admin: [
      "Dashboard",
      "Treatments",
      "Centres",
      "User Entities",
      "Healings",
      "Payouts",
      "Reports",
      "Settings",
    ],
    coordinators: ["Dashboard", "Healings", "Payouts", "Reports", "Settings"],
    healers: ["Dashboard", "Healings", "Payouts", "Reports", "Settings"],
  };

  const roleBasedSubmenuAccess: Record<UserRole, Record<string, string[]>> = {
    admin: {
      Treatments: ["Category", "Diseases", "Symptoms"],
      "User Entities": ["Coordinator", "Healers", "Patients"],
      Settings: ["Blogs", "Courses", "Info"],
    },
    coordinators: {
      Settings: ["Blogs", "Courses", "Info"],
    },
    healers: {
      Settings: ["Blogs", "Courses", "Info"],
    },
  };

  const accessibleMenuItems = useMemo(() => {
    return allMenuItems
      .filter((item) => roleBasedAccess[currentRole]?.includes(item.label))
      .map((item) => {
        const baseItem = {
          ...item,
          href: item.href ? `${item.href}?role=${currentRole}` : undefined,
        };

        if (Array.isArray(item.submenu)) {
          const allowedSubmenus =
            roleBasedSubmenuAccess[currentRole]?.[item.label] || [];

          const filteredSubmenu = item.submenu
            .filter((subitem) => allowedSubmenus.includes(subitem.label))
            .map((subitem) => ({
              ...subitem,
              href: `${subitem.href}?role=${currentRole}`,
            }));

          return {
            ...baseItem,
            submenu: filteredSubmenu.length > 0 ? filteredSubmenu : undefined,
          };
        }

        return baseItem;
      });
  }, [currentRole]);

  const isMenuActive = useMemo(() => {
    return (item: MenuItem): boolean => {
      const currentPath = pathname.split("?")[0];
      if (item.href && !item.submenu) {
        const baseHref = item.href.split("?")[0];
        return currentPath === baseHref || currentPath.startsWith(baseHref + "/");
      }
      if (Array.isArray(item.submenu)) {
        return item.submenu.some((subitem) => {
          const baseSubHref = subitem.href.split("?")[0];
          return currentPath === baseSubHref || currentPath.startsWith(baseSubHref + "/");
        });
      }
      return false;
    };
  }, [pathname]);

  const isSubmenuActive = useMemo(() => {
    return (href: string): boolean => {
      const currentPath = pathname.split("?")[0];
      const baseHref = href.split("?")[0];
      return currentPath === baseHref || currentPath.startsWith(baseHref + "/");
    };
  }, [pathname]);

  useEffect(() => {
    const currentPath = pathname.split("?")[0];
    const currentActiveMenus = accessibleMenuItems
      .filter((item) =>
        item.submenu?.some((subitem) => {
          const baseSubHref = subitem.href.split("?")[0];
          return currentPath === baseSubHref || currentPath.startsWith(baseSubHref + "/");
        })
      )
      .map((item) => item.label);
    setOpenMenus(currentActiveMenus);
  }, [pathname, accessibleMenuItems]);

  const handleMenuToggle = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleMenuClick = (item: MenuItem) => {
    if (Array.isArray(item.submenu)) {
      handleMenuToggle(item.label);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const handleSubmenuClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const base = href.split("?")[0];
    router.push(`${base}?role=${currentRole}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/");
  };

  useEffect(() => {
    const roleFromUrl = searchParams.get("role") as UserRole | null;
    const storedRole = localStorage.getItem("userRole") as UserRole | null;
    if (roleFromUrl && storedRole && roleFromUrl !== storedRole) {
      const currentPath = pathname.split("?")[0];
      router.replace(`${currentPath}?role=${storedRole}`);
    }
  }, [pathname, searchParams, router]);

  return (
    <div className="w-full max-w-[300px] bg-white rounded-[20px] overflow-hidden shadow-lg">
      <div className="relative">
        <div className="h-[150px] relative">
          <Image
            src={bg}
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="z-0"
          />
        </div>
        <div className="absolute bottom-[-48px] left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-200">
            <Image src={user} alt="User profile" width={96} height={96} className="object-cover" />
          </div>
        </div>
      </div>

      <div className="p-4 pt-16">
        <div className="text-center mb-4">
          <h3 className="font-bold text-lg">
            {currentRole === "admin"
              ? "Administrator"
              : currentRole === "coordinators"
              ? "Coordinator"
              : "Healer"}
          </h3>
          <p className="text-sm text-gray-500">Role: {currentRole}</p>
        </div>

        <div className="space-y-1">
          {accessibleMenuItems.map((item) => {
            const isActive = isMenuActive(item);
            const isOpen = openMenus.includes(item.label);

            return (
              <div key={item.label} className="mb-1">
                <Button
                  onClick={() => handleMenuClick(item)}
                  variant="ghost"
                  className={`group w-full justify-between h-10 px-4 rounded-lg transition-all duration-300 ease-in-out
                    ${isActive ? "bg-[#48c373] text-white font-semibold" : "text-gray-400"}
                    hover:bg-transparent hover:text-[#48c373]`}
                >
                  <span className="flex items-center transition-all duration-300 ease-in-out group-hover:text-[#48c373]">
                    <item.icon
                      className={`mr-3 h-5 w-5 transition-all duration-300 ease-in-out 
                        ${isActive ? "text-white" : "text-gray-400"} 
                        group-hover:text-[#48c373]`}
                    />
                    {item.label}
                  </span>
                  {Array.isArray(item.submenu) && item.submenu.length > 0 && (
                    <span className="ml-auto transition-all duration-300 ease-in-out">
                      {isOpen ? (
                        <ChevronUp
                          className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                            isActive ? "text-white" : "text-gray-400"
                          } group-hover:text-[#48c373]`}
                        />
                      ) : (
                        <ChevronDown
                          className={`h-4 w-4 transition-all duration-300 ease-in-out ${
                            isActive ? "text-white" : "text-gray-400"
                          } group-hover:text-[#48c373]`}
                        />
                      )}
                    </span>
                  )}
                </Button>

                {isOpen && Array.isArray(item.submenu) && item.submenu.length > 0 && (
                  <div className="pl-10 py-1 space-y-1">
                    {item.submenu.map((subitem) => {
                      const isSubActive = isSubmenuActive(subitem.href);
                      const isLargeText =
                        subitem.label === "Coordinator" || subitem.label === "Healers";

                      return (
                        <Button
                          key={subitem.label}
                          onClick={(e) => handleSubmenuClick(subitem.href, e)}
                          variant="ghost"
                          className={`group w-full justify-start h-9 px-3 rounded-lg transition-all duration-300 ease-in-out
                            ${isSubActive ? "bg-[#48c373] text-white font-semibold" : "text-gray-400"}
                            hover:bg-transparent hover:text-[#48c373]`}
                        >
                          <span
                            className={`transition-all duration-300 ease-in-out group-hover:text-[#48c373] ${
                              isLargeText ? "text-md font-semibold" : ""
                            }`}
                          >
                            {subitem.label}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start h-10 px-4 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 mt-4"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
