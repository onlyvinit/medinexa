"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";
import LoginModal from "@/app/components/forms/LoginForm";
import RegisterModal from "@/app/components/forms/RegisterForm";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";

import { Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [medDropdownOpen, setMedDropdownOpen] = useState(false);

  const [loginMessage, setLoginMessage] = useState("");
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const { user, logout } = useAuth();
  const params = useSearchParams();

  const auth = params.get("auth");
  const reason = params.get("reason");
  const redirect = params.get("redirect");

  useEffect(() => {
    if (auth === "required") {
      setRedirectTo(redirect);

      setLoginMessage(
        reason === "admin"
          ? "Admin access required. Please log in as admin."
          : "Please log in to continue."
      );

      setIsLoginOpen(true);
    }
  }, [auth, reason, redirect]);

  const switchToRegister = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const switchToLogin = () => {
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <>
      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={switchToRegister}
        message={loginMessage}
        redirectTo={redirectTo || undefined}
      />

      {/* REGISTER MODAL */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={switchToLogin}
      />

      <header className="max-w-7xl mx-auto rounded-2xl backdrop-blur-lg bg-white/80 shadow-lg sticky top-5 z-50 border border-gray-200/50 transition-all duration-300 hover:shadow-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              Medinexa
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {/* MEDICATION DROPDOWN */}
            <div className="relative group">
              <button
                className="flex items-center gap-1 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
                onClick={() => setMedDropdownOpen(!medDropdownOpen)}
              >
                Medications
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    medDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {medDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-100 py-2 animate-fadeIn">
                  <Link
                    href="/medications/semaglutide"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-medium">Semaglutide</div>
                    <div className="text-xs text-gray-500">
                      GLP-1 medication
                    </div>
                  </Link>
                  <Link
                    href="/medications/tirzepatide"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-medium">Tirzepatide</div>
                    <div className="text-xs text-gray-500">Dual GIP/GLP-1</div>
                  </Link>
                  <Link
                    href="/medications/orlistat"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <div className="font-medium">Orlistat</div>
                    <div className="text-xs text-gray-500">
                      Lipase inhibitor
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <button
              disabled
              className="px-4 py-2 text-gray-400 font-medium rounded-lg cursor-not-allowed opacity-50"
            >
              Reviews
            </button>

            <div className="flex items-center gap-3">
              <Link href="/intake">
                <button className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                  Am I Eligible?
                </button>
              </Link>

              {user ? (
                <Link href="/dashboard">
                  <button
                    className="p-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
                    title="Dashboard"
                  >
                    <LayoutDashboard size={20} />
                  </button>
                </Link>
              ) : (
                <button
                  disabled
                  className="p-2.5 border-2 border-gray-300 text-gray-400 rounded-lg cursor-not-allowed opacity-50"
                  title="You need to log in"
                >
                  <LayoutDashboard size={20} />
                </button>
              )}

              {!user ? (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={logout}
                  className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>

          <button
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* MOBILE SIDEBAR - Outside header */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="fixed top-0 left-0 w-80 h-full bg-linear-to-b from-white to-gray-50 shadow-2xl overflow-y-auto animate-slideIn">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                  <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Medinexa
                  </span>
                </div>
                <button
                  className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <Link
                href="/"
                className="block text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                🏠 Home
              </Link>

              {/* MEDICATIONS */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setMedDropdownOpen(!medDropdownOpen)}
                  className="flex items-center justify-between w-full text-gray-800 font-semibold py-2 hover:text-blue-600 transition-colors"
                >
                  💊 Medications
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      medDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {medDropdownOpen && (
                  <div className="mt-3 ml-6 space-y-3 animate-fadeIn">
                    <Link
                      href="/medications/semaglutide"
                      className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      → Semaglutide
                    </Link>
                    <Link
                      href="/medications/tirzepatide"
                      className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      → Tirzepatide
                    </Link>
                    <Link
                      href="/medications/orlistat"
                      className="block text-gray-700 hover:text-blue-600 transition-colors py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      → Orlistat
                    </Link>
                  </div>
                )}
              </div>

              <button
                disabled
                className="block text-lg font-semibold text-gray-400 cursor-not-allowed opacity-50 py-2 text-left w-full"
              >
                ⭐ Reviews
              </button>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                <Link href="/intake" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    Am I Eligible?
                  </button>
                </Link>

                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                      <LayoutDashboard size={20} />
                      Dashboard
                    </button>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-400 font-semibold rounded-lg cursor-not-allowed opacity-50 flex items-center justify-center gap-2"
                    title="You need to log in"
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </button>
                )}

                {!user ? (
                  <button
                    className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                    onClick={() => {
                      setIsLoginOpen(true);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
