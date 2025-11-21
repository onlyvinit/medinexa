"use client";

import React from "react";

interface MultiSelectOption {
  label: string;
  value: string;
}

interface MultiSelectInputProps {
  label?: string;
  name: string;
  values: string[];
  options: MultiSelectOption[];
  onChange: (updatedValues: string[]) => void;
  required?: boolean;
  className?: string;
}

export default function MultiSelectInput({
  label,
  name,
  values,
  options,
  onChange,
  required = false,
  className = "",
}: MultiSelectInputProps) {
  const handleSelect = (value: string) => {
    let updated = [...values];

    const isNoneOption =
      value.toLowerCase().includes("none") ||
      value.toLowerCase() === "n/a" ||
      value.toLowerCase() === "na";

    if (isNoneOption) {
      if (updated.includes(value)) {
        updated = updated.filter((v) => v !== value);
      } else {
        updated = [value];
      }
    } else {
      if (updated.includes(value)) {
        updated = updated.filter((v) => v !== value);
      } else {
        updated = updated.filter((v) => {
          const vLower = v.toLowerCase();
          return !(
            vLower.includes("none") ||
            vLower === "n/a" ||
            vLower === "na"
          );
        });
        updated.push(value);
      }
    }

    onChange(updated);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name={name}
              checked={values.includes(opt.value)}
              onChange={() => handleSelect(opt.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
