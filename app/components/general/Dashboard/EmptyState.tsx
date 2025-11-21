"use client";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm text-center text-gray-600">
      {message}
    </div>
  );
}
