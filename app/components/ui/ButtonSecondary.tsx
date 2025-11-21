"use client";

import React from "react";

interface ButtonSecondaryProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export default function ButtonSecondary({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonSecondaryProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full bg-gray-100 text-gray-800 font-medium 
        py-3 rounded-lg
        hover:bg-gray-200 transition-all
        disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {label}
    </button>
  );
}
