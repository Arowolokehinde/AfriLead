"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-950 shadow-lg border-b border-gray-200 dark:border-gray-800"
          : "bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110" />
            <span className="text-lg md:text-xl font-bold text-foreground">
              AfriLead
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              href="/#vision"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/#how-it-works"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
            >
              How It Works
            </Link>
            <Link
              href="/discover"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
            >
              Find Mentors
            </Link>
            <Link
              href="/#impact"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200"
            >
              Impact
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button asChild variant="ghost" className="font-medium">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 font-medium"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="px-4 py-6 space-y-1">
            <Link
              href="/"
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/#vision"
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#how-it-works"
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/discover"
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Find Mentors
            </Link>
            <Link
              href="/#impact"
              className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              Impact
            </Link>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-800 mt-4">
              <Button
                asChild
                variant="outline"
                className="w-full justify-center font-medium border"
                size="lg"
              >
                <Link href="/signin" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-center bg-primary hover:bg-primary/90 text-white shadow-lg font-medium"
                size="lg"
              >
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
