"use client";

import { clearAuthCookie } from "@/lib/cookies";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // uses Lucide icons (optional, you can replace)

const tabs = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctor" },
  { label: "Appointments", href: "/appointment" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await clearAuthCookie();
    setIsAuthenticated(false);
    router.push("/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/protected", {
          method: "GET",
          credentials: "include",
        });
        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [pathname]);

  return (
    <header className="w-full sticky top-0 left-0 z-50 bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          MediBook
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`text-sm font-medium ${
                pathname === tab.href
                  ? "text-blue-600 underline underline-offset-4"
                  : "text-gray-700 hover:text-blue-600 transition"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-3">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-1.5 text-sm border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <nav className="flex flex-col space-y-2">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium ${
                  pathname === tab.href
                    ? "text-blue-600 underline underline-offset-4"
                    : "text-gray-700 hover:text-blue-600 transition"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 space-y-2">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
