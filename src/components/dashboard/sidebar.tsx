"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
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
} from "lucide-react";

import backgroundImage from "@/app/assets/bgside.jpg";
import doctor from "@/app/assets/doctors/doctor-thumb-02.jpg";

type SubmenuItem = {
  label: string;
  href: string;
};

type MenuItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
  label: string;
  href?: string;
  submenu?: SubmenuItem[];
};

export function Sidebar({ role }: { role: string }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    {
      icon: ClipboardList,
      label: "Diseases",
      href: `/diseases?role=${role}`,
      submenu: [
        { label: "Category", href: `/diseases/category?role=${role}` },
        { label: "Subcategory", href: `/diseases/subcategory?role=${role}` },
      ],
    },
    { icon: Calendar, label: "Centres", href: `/centres?role=${role}` },
    {
      icon: Users,
      label: "User Entities",
      href: "/user-entities",
      submenu: [
        { label: "Coordinators", href: `/user-entities/coordinators?role=${role}` },
        { label: "Healers", href: `/user-entities/healers?role=${role}` },
        { label: "Patients", href: `/user-entities/patients?role=${role}` },
      ],
    },
    { icon: Stethoscope, label: "Healings", href: `/healings?role=${role}` },
    { icon: Wallet, label: "Payouts", href: `/payouts?role=${role}` },
    { icon: Receipt, label: "Reports", href: `/reports?role=${role}` },
    {
      icon: Settings,
      label: "Settings",
      href: `/settings?role=${role}`,
      submenu: [{ label: "Info", href: `/settings/info?role=${role}` }],
    },
  ];

  const roleBasedAccess: { [key: string]: { menu: string; submenu?: string[] }[] } = {
    admin: menuItems.map((item) => ({
      menu: item.label,
      submenu: item.submenu?.map((sub) => sub.label),
    })),
    coordinators: [
      { menu: "Dashboard" },
      {
        menu: "User Entities",
        submenu: ["Healers", "Patients"],
      },
      { menu: "Healings" },
      { menu: "Payouts" },
      { menu: "Reports" },
      {
        menu: "Settings",
        submenu: ["Info"],
      },
    ],
    healers: [
      { menu: "Dashboard" },
      { menu: "Healings" },
      { menu: "Payouts" },
      { menu: "Reports" },
      {
        menu: "Settings",
        submenu: ["Info"],
      },
    ],
  };

  const accessibleMenuItems = menuItems.filter((item) => {
    const roleAccess = roleBasedAccess[role]?.find(
      (access) => access.menu === item.label
    );
    
    if (!roleAccess) return false;

    if (item.submenu) {
      item = {
        ...item,
        submenu: item.submenu.filter((subitem) =>
          roleAccess.submenu?.includes(subitem.label)
        ),
      };
    }

    return true;
  });

  useEffect(() => {
    const currentMenu = accessibleMenuItems.find((item) => {
      if (item.href === pathname) return true;
      if (item.submenu) {
        return item.submenu.some((subitem) => subitem.href === pathname);
      }
      return false;
    });

    if (currentMenu?.submenu) {
      setOpenMenu(currentMenu.label);
    } else {
      setOpenMenu(null);
    }
  }, [pathname, accessibleMenuItems]);

  const handleMainClick = (item: MenuItem) => {
    if (item.submenu) {
      setOpenMenu(openMenu === item.label ? null : item.label);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <div className="w-full max-w-[300px] bg-white rounded-[20px] overflow-hidden shadow-[0_2px_28px_0_rgba(0,0,0,0.06)]">
      <div className="relative">
        <div className="h-[150px] relative">
          <Image
            src={backgroundImage}
            alt="Medical background"
            layout="fill"
            objectFit="cover"
            priority
            unoptimized
          />
        </div>

        <div className="absolute bottom-[-48px] left-1/2 transform -translate-x-1/2">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
            <Image
              src={doctor}
              alt="Doctor profile"
              width={96}
              height={96}
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
      <div className="p-4 pt-20">
        <Accordion type="multiple" className="space-y-1">
          {accessibleMenuItems.map((item) => (
            <AccordionItem key={item.label} value={item.label}>
              <AccordionTrigger asChild>
                <Button
                  onClick={() => handleMainClick(item)}
                  variant="ghost"
                  className={`w-full justify-between h-10 px-4 rounded-lg ${
                    pathname === item.href ? "bg-blue-500 text-white" : ""
                  } hover:bg-gray-100 hover:text-black`}
                >
                  <span className="flex items-center">
                    <item.icon className="mr-3 h-4 w-4 text-gray-500" />
                    {item.label}
                  </span>
                  {item.submenu && (
                    <span className="ml-auto">
                      {openMenu === item.label ? (
                        <ChevronUp className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      )}
                    </span>
                  )}
                </Button>
              </AccordionTrigger>
              {item.submenu && (
                <AccordionContent className="pl-10 space-y-2">
                  {item.submenu.map((subitem) => (
                    <Link key={subitem.label} href={subitem.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start h-9 px-3 rounded-lg ${
                          pathname === subitem.href ? "bg-blue-500 text-white" : ""
                        } hover:bg-gray-100 hover:text-black`}
                      >
                        {subitem.label}
                      </Button>
                    </Link>
                  ))}
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );  
}
