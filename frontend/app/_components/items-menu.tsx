"use client";

import { FileArchive, LayoutDashboard, Settings, ChartBarDecreasing, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ItemsMenu() {
  const pathname = usePathname();
  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Logs",
      href: "/logs",
      icon: FileArchive,
    },
    {
      label: "Alertas",
      href: "/alertas",
      icon: TriangleAlert,
    },
    {
      label: "Metricas",
      href: "/metricas",
      icon: ChartBarDecreasing,
    },
    {
      label: "Configurações",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex flex-col text-xl w-full h-full pl-7 text-gray-300">
       <nav className="flex flex-col gap-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex p-2 items-center rounded-sm mr-4 gap-2 ${
                active
                  ? "bg-blue-500/40 text-blue-400"
                  : "hover:bg-gray-100 hover:text-gray-600 transition-all"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  )
}