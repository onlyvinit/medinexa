"use client";

import { useState } from "react";
import AdminSidebar from "../components/general/Admin/AdminSidebar";
import AdminHeader from "../components/general/Admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden md:block w-64 border-r bg-white">
        <AdminSidebar />
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
            <AdminSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
