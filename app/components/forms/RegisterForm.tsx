"use client";

import { useState } from "react";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import { useAuth } from "@/app/context/AuthContext";

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}) {
  const { login: setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      setUser(data.user);
      onClose();
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong, please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-2000">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create Account</h2>
          <button onClick={onClose} className="text-gray-500 text-xl">
            ×
          </button>
        </div>

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          className="px-4 py-2 rounded-lg border bg-white w-full mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-lg border bg-white w-full mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          className="px-4 py-2 rounded-lg border bg-white w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <ButtonPrimary
          label={loading ? "Creating account..." : "Register"}
          disabled={loading}
          onClick={handleRegister}
        />

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
