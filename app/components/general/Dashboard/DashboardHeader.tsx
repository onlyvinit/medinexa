"use client";

import { HomeIcon, LogOut, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardHeader({
  onOpenLogin,
}: {
  onOpenLogin: () => void;
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
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 border-b">
      <h2 className="text-lg font-medium text-gray-800 tracking-tight">
        Dashboard
      </h2>

      <div className="flex items-center gap-5">
        {/* HOME */}
        <Link href="/">
          <HomeIcon className="w-6 h-6 text-black" />
        </Link>

        {/* ADMIN ICON */}
        <button onClick={handleAdminClick}>
          <ShieldCheck
            className={`w-6 h-6 ${
              user?.role === "admin" ? "text-green-600" : "text-gray-600"
            }`}
          />
        </button>

        {/* LOGOUT */}
        <button onClick={logout}>
          <LogOut className="w-6 h-6 text-black" />
        </button>
      </div>
    </header>
  );
}
