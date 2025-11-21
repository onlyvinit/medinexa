"use client";

import React from "react";

interface RadioGroupOption {
  label: string;
  value: string;
}

interface RadioGroupInputProps {
  label?: string;
  name: string;
  value: string;
  options: RadioGroupOption[];
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export default function RadioGroupInput({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
  className = "",
}: RadioGroupInputProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <p className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
