"use client";

interface ButtonPrimaryProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export default function ButtonPrimary({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon,
}: ButtonPrimaryProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        w-full flex items-center justify-center gap-2
        bg-linear-to-r from-blue-600 to-blue-700 
        text-white font-semibold text-base
        px-6 py-3 rounded-lg 
        shadow-md hover:shadow-lg
        hover:from-blue-700 hover:to-blue-800 
        active:scale-[0.98]
        transition-all duration-200 ease-in-out
        disabled:from-gray-300 disabled:to-gray-400 
        disabled:cursor-not-allowed disabled:shadow-none
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
