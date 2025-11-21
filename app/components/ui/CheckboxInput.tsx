"use client";

import React from "react";

interface CheckboxInputProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function CheckboxInput({
  label,
  name,
  checked,
  onChange,
  required = false,
  disabled = false,
  className = "",
}: CheckboxInputProps) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:bg-gray-100"
      />

      <span className="text-gray-700 text-sm">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
    </label>
  );
}
