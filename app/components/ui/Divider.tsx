"use client";

import React from "react";

interface DividerProps {
  className?: string;
}

export default function Divider({ className = "" }: DividerProps) {
  return (
    <hr
      className={`
        border-t border-gray-200 my-4 
        ${className}
      `}
    />
  );
}
