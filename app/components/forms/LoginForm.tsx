"use client";

import { useState } from "react";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";
import { useAuth } from "@/app/context/AuthContext";
import { Section } from "lucide-react";

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister?: () => void;
  message?: string;
  redirectTo?: string;
}) {
  const { login: setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);

    try {
      let res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data = await res.json();

      if (data.success && data.role === "admin") {
        setUser(data.user);
        onClose();
        setLoading(false);
        return;
      }

      res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      data = await res.json();

      if (!data.success) {
        setError(data.error || "Invalid email or password");
        setLoading(false);
        return;
      }

      setUser(data.user);
      onClose();
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong, please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40  backdrop-blur-sm flex justify-center items-center z-2000">
        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Login</h2>
            <button onClick={onClose} className="text-gray-500 text-xl">
              ×
            </button>
          </div>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            className="px-4 py-2 rounded-lg border bg-white w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg border bg-white w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <ButtonPrimary
            label={loading ? "Logging in..." : "Login"}
            disabled={loading}
            onClick={handleLogin}
          />

          {onSwitchToRegister && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <button
                onClick={onSwitchToRegister}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
