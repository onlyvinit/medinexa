"use client";

import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import DashboardHeader from "../components/general/Dashboard/DashboardHeader";
import LoginModal from "@/app/components/forms/LoginForm";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#f8f9fb]">
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader onOpenLogin={() => setIsLoginOpen(true)} />

        <main className="flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
