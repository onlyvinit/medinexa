"use client";

import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import LoginModal from "@/app/components/forms/LoginForm";
import RegisterModal from "@/app/components/forms/RegisterForm";
import ButtonPrimary from "@/app/components/ui/ButtonPrimary";

export default function Footer() {
  const { user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
      />

      {/* REGISTER MODAL */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={switchToLogin}
      />

      <footer className="bg-[#0a0f29] text-white py-16 font-sans">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3 bg-linear-to-br from-blue-900/40 to-purple-900/40 rounded-3xl p-8 flex flex-col justify-between border border-white/10 backdrop-blur-sm">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-white">Medinexa</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Personalized care designed for you. Join us in redefining the
                  future of healthcare with technology and compassion.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-white">Stay updated</h3>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:border-blue-400 transition-colors placeholder:text-gray-500"
                  />
                  <button className="bg-white text-[#0a0f29] px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 flex flex-col justify-between">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">
                    Learn
                  </h3>
                  <ul className="space-y-4 text-sm">
                    {[
                      "Home",
                      "Pediatrics",
                      "About us",
                      "Medications",
                      "Pharmacy",
                      "Reviews",
                      "Microdose",
                    ].map((item) => (
                      <li key={item}>
                        <Link
                          href="#"
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">
                    Connect
                  </h3>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <span className="block text-gray-300">
                        +1 (619) 648-1247
                      </span>
                    </li>
                    <li>
                      <a
                        href="mailto:press@medinexa.com"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        press@medinexa.com
                      </a>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Brand ambassadors
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">
                    Resources
                  </h3>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Blogs
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        FAQ
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-gray-400 text-sm font-medium mb-6 uppercase tracking-wider">
                    Legal
                  </h3>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Refunds
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Privacy policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Terms & conditions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        Pharmacy software terms of use
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6">
                <div className="flex gap-4">
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

                  <Link href="/intake">
                    <button className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
                      Am I Eligible?
                    </button>
                  </Link>
                </div>

                <div className="flex gap-6 items-center">
                  <Facebook className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition-colors" />
                  <svg
                    className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <Instagram className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition-colors" />
                  <Linkedin className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition-colors" />
                  <Twitter className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 text-xs text-gray-500">
            <p className="mb-4 font-medium text-gray-400">
              © 2025 Medinexa Health
            </p>
            <p className="leading-relaxed opacity-60 max-w-4xl">
              All professional medical services are provided by licensed
              physicians and clinicians affiliated with independently owned and
              operated professional practices. Medinexa Corp. provides
              administrative and technology services to affiliated medical
              practices it supports, and does not provide any professional
              medical services itself.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
