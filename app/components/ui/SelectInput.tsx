"use client";

import React from "react";

interface SelectInputProps {
  label?: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function SelectInput({
  label,
  name,
  value,
  options,
  placeholder = "Select an option",
  onChange,
  required = false,
  disabled = false,
  className = "",
}: SelectInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg border 
          border-gray-300 bg-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
