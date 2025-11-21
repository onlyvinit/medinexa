"use client";

import React from "react";

interface TextAreaInputProps {
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export default function TextAreaInput({
  label,
  name,
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
}: TextAreaInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className={`
          w-full px-4 py-2 rounded-lg border 
          border-gray-300 bg-white resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          disabled:bg-gray-100 disabled:cursor-not-allowed
        `}
      ></textarea>
    </div>
  );
}
