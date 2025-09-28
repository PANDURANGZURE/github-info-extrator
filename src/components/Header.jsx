"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import logo from '../assets/logo.png'


export default function Header() {
  return (
    <header className="w-full relative z-10 top-0 bg-transparent text-white shadow-md  ">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            
            <Link href="/" className="text-2xl font-bold text-white text-pretty font-sans hover:text-blue-300 transition">
              Github Glance
            </Link>
    
            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link
                href="/about"
                className="hover:text-blue-400 transition"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="hover:text-blue-400 transition"
              >
                Contact
              </Link>
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaGithub size={22} />
              </a>
            </nav>
          </div>
        </header>
  );
}
