"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

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

          {/* Desktop CTA Buttons / Profile */}
          <div className="hidden lg:flex items-center space-x-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-foreground">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {session?.user?.role}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/${session?.user?.role === "mentor" ? "mentor" : "mentee"}`} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="cursor-pointer text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className="font-medium">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 font-medium"
                >
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
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

            {/* Mobile CTA Buttons / Profile */}
            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-800 mt-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-muted rounded-lg">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session?.user?.image || ""} />
                      <AvatarFallback className="bg-primary text-white font-semibold">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {session?.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {session?.user?.role}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href={`/dashboard/${session?.user?.role === "mentor" ? "mentor" : "mentee"}`}
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full flex items-center px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
