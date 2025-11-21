"use client";

import { HomeIcon, LogOut, ShieldCheck, Menu } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardHeader({
  onOpenLogin,
  onOpenSidebar,
}: {
  onOpenLogin: () => void;
  onOpenSidebar?: () => void;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleAdminClick = () => {
    if (user?.role === "admin") {
      router.push("/admin");
      return;
    }

    onOpenLogin();
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-6 border-b">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>

        <h2 className="text-lg font-medium text-gray-800 tracking-tight">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        {/* HOME */}
        <Link href="/">
          <HomeIcon className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </Link>

        {/* ADMIN ICON */}
        <button onClick={handleAdminClick}>
          <ShieldCheck
            className={`w-5 h-5 md:w-6 md:h-6 ${
              user?.role === "admin" ? "text-green-600" : "text-gray-600"
            }`}
          />
        </button>

        {/* LOGOUT */}
        <button onClick={logout}>
          <LogOut className="w-5 h-5 md:w-6 md:h-6 text-black" />
        </button>
      </div>
    </header>
  );
}
