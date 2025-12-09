"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState } from "react";
import logo from '../assets/logo.png'


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="w-screen relative z-50 top-0 b  text-white my-4">
      <div className="w-screen mx-auto flex items-center justify-between px-6 py-4">
        
        <Link href="/" className="text-2xl md:text-4xl font-bold text-white text-pretty font-[saurav] hover:text-purple-400 transition">
          Github Glance
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/Hero"
            className="hover:text-purple-400 text-neutral-300 transition"
          >
            Profile Info
          </Link>
          <Link
            href="/GithubRepos"
            className="hover:text-purple-400 text-neutral-300 transition"
          >
            About
          </Link>
          <a
            href="https://github.com/PANDURANGZURE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition text-neutral-300"
          >
            <FaGithub size={22} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center w-10 h-10 text-neutral-300 hover:text-purple-400 transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-neutral-800/90 border-t border-neutral-700/40 px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/Hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-purple-400 text-neutral-300 transition"
          >
            Profile Info
          </Link>
          <Link
            href="/GithubRepos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-purple-400 text-neutral-300 transition"
          >
            About
          </Link>
          <a
            href="https://github.com/PANDURANGZURE"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 hover:text-purple-400 text-neutral-300 transition"
          >
            <FaGithub size={22} />
            <span>GitHub</span>
          </a>
        </nav>
      )}
    </header>
  );
}
