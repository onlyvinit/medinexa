"use client";

import React, { useRef } from "react";

interface FileUploadProps {
  label?: string;
  name: string;
  file?: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  accept?: string;
  className?: string;
}

export default function FileUpload({
  label,
  name,
  file,
  onChange,
  required = false,
  accept = "image/*,application/pdf",
  className = "",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = React.useState<string>("");

  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    setError("");

    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError(
          `File size must be less than 5MB. Your file is ${(
            selectedFile.size /
            (1024 * 1024)
          ).toFixed(2)}MB`
        );
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        onChange(null);
        return;
      }
    }

    onChange(selectedFile);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`
          w-full border rounded-lg p-4 
          flex flex-col items-center justify-center cursor-pointer 
          transition-all
          ${error ? "border-red-500" : "border-gray-300 hover:border-blue-500"}
        `}
        onClick={() => inputRef.current?.click()}
      >
        {!file ? (
          <div className="text-center">
            <p className="text-gray-500 text-sm">Click to upload file</p>
            <p className="text-gray-400 text-xs mt-1">Max size: 5MB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {file.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-28 w-auto rounded-md object-cover shadow"
              />
            )}
            <p className="text-sm text-gray-700">{file.name}</p>
            <p className="text-xs text-gray-500">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
