"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  X,
  LayoutDashboard,
  Package,
  Users,
  LogOut,
} from "lucide-react";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  // Sidebar navigation items
  const navItems = [
    {
      label: "Admin Panel",
      path: "/admin",
      icon: <LayoutDashboard size={18} />,
    },
    {
      label: "Orders",
      path: "/admin/orders",
      icon: <Package size={18} />,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <Users size={18} />,
    },
  ];

  return (
    <aside className="h-full flex flex-col bg-white border-r">
      {/* MOBILE CLOSE BUTTON */}
      {onClose && (
        <button className="md:hidden p-4 text-gray-600" onClick={onClose}>
          <X size={26} />
        </button>
      )}

      {/* ADMIN LOGO */}
      <div className="px-6 py-4">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
          Medinexa
        </h1>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active =
            pathname === item.path || pathname?.startsWith(item.path + "/");

          return (
            <button
              key={item.path}
              onClick={() => {
                router.push(item.path);
                if (onClose) onClose();
              }}
              className={`flex w-full items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                active
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="flex w-full items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
