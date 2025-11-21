"use client";

import { LogOutIcon, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import ButtonPrimary from "../../ui/ButtonPrimary";

export default function AdminHeader({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const getPageTitle = () => {
    if (pathname === "/admin") return "Admin Panel";
    if (pathname.startsWith("/admin/orders")) return "Total Orders";
    if (pathname.startsWith("/admin/users")) return "Total Users";

    return "Admin Panel";
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white shadow-sm">
      {/* MOBILE MENU BUTTON */}
      <button
        className="md:hidden text-gray-700"
        onClick={onMenuClick}
      >
        <Menu size={26} />
      </button>

      {/* PAGE TITLE */}
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 tracking-tight">
        {getPageTitle()}
      </h1>

      {/* ADMIN NAME / LOGOUT */}
      <div className="hidden md:flex items-center gap-4">
        <p className="text-gray-600 text-sm">
          Logged in as:  
          <span className="font-medium text-gray-900 ml-1">
            {user?.email || "Admin"}
          </span>
        </p>

        <ButtonPrimary
          label="Logout"
          onClick={() => {
            logout();
            router.push("/");
          }}
          icon={<LogOutIcon size={18} />}
        />
      </div>
    </header>
  );
}
