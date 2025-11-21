"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Orders", href: "/dashboard/orders" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="px-6 py-5">
        <h1 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Medinexa
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    block px-4 py-2 rounded-lg text-sm font-medium transition-all
                    ${active ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"}
                  `}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
