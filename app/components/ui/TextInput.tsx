"use client";

import React from "react";

interface TextInputProps {
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function TextInput({
  label,
  name,
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  className = "",
}: TextInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-2 rounded-lg border 
          border-gray-300 bg-white 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
      />
    </div>
  );
}
