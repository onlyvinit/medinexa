"use client";

import { ReactNode, useState } from "react";

export default function HoverCard({
  trigger,
  content,
}: {
  trigger: ReactNode;
  content: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}

      {open && (
        <div
          className=" absolute w-full h-70 overflow-y-scroll p-4 rounded-xl shadow-xl 
          bg-white border border-gray-200 z-20 animate-fadeIn no-scrollbar"
        >
          {content}
        </div>
      )}
    </div>
  );
}
