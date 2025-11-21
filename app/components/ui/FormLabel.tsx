"use client";

import React from "react";

interface FormLabelProps {
  label: string;
  required?: boolean;
  className?: string;
}

export default function FormLabel({
  label,
  required = false,
  className = "",
}: FormLabelProps) {
  return (
    <label className={`text-sm font-medium text-gray-700 ${className}`}>
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
  );
}
