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
import bg from "@/app/assets/bgside.png";

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

  // Get role from URL or localStorage on component mount
  useEffect(() => {
    const roleFromUrl = searchParams.get("role") as UserRole | null;
    const roleFromStorage = localStorage.getItem("userRole") as UserRole | null;

    // Prioritize URL parameter, then localStorage
    const role = roleFromUrl || roleFromStorage || defaultRole;

    // Validate role is one of the allowed values
    if (["admin", "coordinators", "healers"].includes(role)) {
      setCurrentRole(role as UserRole);

      // Store current role in localStorage if it came from URL
      if (roleFromUrl && roleFromUrl !== roleFromStorage) {
        localStorage.setItem("userRole", role);
      }
    } else {
      setCurrentRole(defaultRole); // Default fallback
    }
  }, [searchParams, defaultRole]);

  // Define all possible menu items without role query parameters
  const allMenuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: ClipboardList,
      label: "Diseases",
      href: "/diseases",
      submenu: [
        { label: "Category", href: "/diseases/category" },
        { label: "Treatments", href: "/diseases/treatments" },
        { label: "Symptoms", href: "/diseases/symptoms" },
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
      submenu: [{ label: "Info", href: "/settings/info" }],
    },
  ];

  // Define role-based access permissions
  const roleBasedAccess: Record<UserRole, string[]> = {
    admin: [
      "Dashboard",
      "Diseases",
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

  // Define role-based submenu access
  const roleBasedSubmenuAccess: Record<UserRole, Record<string, string[]>> = {
    admin: {
      Diseases: ["Category", "Treatments", "Symptoms"],
      "User Entities": ["Coordinator", "Healers", "Patients"],
      Settings: ["Info"],
    },
    coordinators: {
      Settings: ["Info"],
    },
    healers: {
      Settings: ["Info"],
    },
  };

  // Generate the accessible menu items based on role
  const accessibleMenuItems = useMemo(() => {
    return allMenuItems
      .filter((item) => roleBasedAccess[currentRole]?.includes(item.label))
      .map((item) => {
        // Create a base item with the role parameter added to href
        const baseItem = {
          ...item,
          href: item.href ? `${item.href}?role=${currentRole}` : undefined,
        };

        // If item has submenu, filter it based on role permissions
        if (item.submenu) {
          const allowedSubmenus =
            roleBasedSubmenuAccess[currentRole]?.[item.label] || [];

          // Filter submenus based on current role permissions
          const filteredSubmenu = item.submenu
            .filter((subitem) => {
              if (currentRole === "admin" && item.label === "User Entities") {
                return true;
              }
              // Include Symptoms menu for admin
              if (currentRole === "admin" && item.label === "Diseases") {
                return true;
              }
              return allowedSubmenus.includes(subitem.label);
            })
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
      // Get base path without query parameters
      const currentPath = pathname.split("?")[0];

      // For main menu items with direct href
      if (item.href && !item.submenu) {
        const baseHref = item.href.split("?")[0];
        return (
          currentPath === baseHref || currentPath.startsWith(baseHref + "/")
        );
      }

      // For items with submenus
      if (item.submenu) {
        const baseItemHref = item.href?.split("?")[0];

        // Check if current path matches the main menu path exactly
        if (baseItemHref && currentPath === baseItemHref) {
          return true;
        }

        // Check if current path matches any submenu path
        return item.submenu.some((subitem) => {
          const baseSubHref = subitem.href.split("?")[0];
          return (
            currentPath === baseSubHref ||
            currentPath.startsWith(baseSubHref + "/")
          );
        });
      }

      return false;
    };
  }, [pathname]);

  // Check if a submenu item is active
  const isSubmenuActive = useMemo(() => {
    return (href: string): boolean => {
      const currentPath = pathname.split("?")[0];
      const baseHref = href.split("?")[0];
      return currentPath === baseHref || currentPath.startsWith(baseHref + "/");
    };
  }, [pathname]);

  // Update open menus based on current pathname
  useEffect(() => {
    // Get active menu items based on current path
    const currentPath = pathname.split("?")[0];

    const currentActiveMenus = accessibleMenuItems
      .filter((item) => {
        if (item.submenu) {
          return item.submenu.some((subitem) => {
            const baseSubHref = subitem.href.split("?")[0];
            return (
              currentPath === baseSubHref ||
              currentPath.startsWith(baseSubHref + "/")
            );
          });
        }
        return false;
      })
      .map((item) => item.label);

    setOpenMenus(currentActiveMenus);
  }, [pathname, accessibleMenuItems]);

  // Toggle menu expansion
  const handleMenuToggle = (label: string) => {
    setOpenMenus((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };

  // Handle menu item click - toggle menu or navigate
  const handleMenuClick = (item: MenuItem) => {
    if (item.submenu) {
      handleMenuToggle(item.label);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  // Handle submenu item click with explicit role enforcement
  const handleSubmenuClick = (href: string, event: React.MouseEvent) => {
    event.preventDefault();

    // Ensure the role parameter is included and matches current role
    const baseUrl = href.split("?")[0];
    const navigateUrl = `${baseUrl}?role=${currentRole}`;

    router.push(navigateUrl);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/");
  };

  // Handle role switch attempt (block unauthorized switches)
  useEffect(() => {
    const roleFromUrl = searchParams.get("role") as UserRole | null;
    const storedRole = localStorage.getItem("userRole") as UserRole | null;

    // If URL role doesn't match stored role and stored role exists, redirect to correct role path
    if (roleFromUrl && storedRole && roleFromUrl !== storedRole) {
      const currentPath = pathname.split("?")[0];
      router.replace(`${currentPath}?role=${storedRole}`);
    }
  }, [pathname, searchParams, router]);

  return (
    <div className="w-full max-w-[300px] bg-white rounded-[20px] overflow-hidden shadow-lg">
      <div className="relative">
        <div className="h-[150px] relative ">
          {/* Background Image */}
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
            <Image
              src={user}
              alt="User profile"
              width={96}
              height={96}
              className="object-cover"
            />
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
                {/* Main Menu Item */}
                <Button
                  onClick={() => handleMenuClick(item)}
                  variant="ghost"
                  className={`w-full justify-between h-10 px-4 rounded-lg transition-colors duration-200 ${
                    isActive ? "bg-[#4ead91] text-white" : ""
                  } hover:bg-gray-100 hover:text-black`}
                >
                  <span className="flex items-center">
                    <item.icon
                      className={`mr-3 h-4 w-4 ${
                        isActive ? "text-white" : "text-gray-500"
                      }`}
                    />
                    {item.label}
                  </span>
                  {item.submenu && item.submenu.length > 0 && (
                    <span className="ml-auto">
                      {isOpen ? (
                        <ChevronUp
                          className={`h-4 w-4 ${
                            isActive ? "text-white" : "text-gray-500"
                          }`}
                        />
                      ) : (
                        <ChevronDown
                          className={`h-4 w-4 ${
                            isActive ? "text-white" : "text-gray-500"
                          }`}
                        />
                      )}
                    </span>
                  )}
                </Button>

                {/* Submenu Items */}
                {item.submenu && item.submenu.length > 0 && isOpen && (
                  <div className="pl-10 py-1 space-y-1">
                    {item.submenu.map((subitem) => {
                      const isSubActive = isSubmenuActive(subitem.href);

                      return (
                        <Button
                          key={subitem.label}
                          onClick={(e) => handleSubmenuClick(subitem.href, e)}
                          variant="ghost"
                          className={`w-full justify-start h-9 px-3 rounded-lg transition-colors duration-200 ${
                            isSubActive ? "bg-[#4ead91] text-white" : ""
                          } hover:bg-gray-100 hover:text-black`}
                        >
                          {subitem.label}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Logout Button */}
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