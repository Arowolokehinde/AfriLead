import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg" />
              <span className="text-xl font-bold text-white">AfriLead</span>
            </div>
            <p className="text-sm">
              Empowering Africa's next generation through meaningful mentorship connections.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#mission" className="hover:text-orange-400">Mission</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-orange-400">How It Works</Link></li>
              <li><Link href="/discover" className="hover:text-orange-400">Find Mentors</Link></li>
              <li><Link href="/onboarding/role" className="hover:text-orange-400">Get Started</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-orange-400">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-orange-400">FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-orange-400">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-orange-400"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-400"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-400"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-orange-400"><Linkedin className="h-5 w-5" /></a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4" />
              <a href="mailto:hello@afrilead.org" className="hover:text-orange-400">
                hello@afrilead.org
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AfriLead. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
