"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import logo from '../assets/logo.png'


export default function Header() {
  return (
    <header className="w-full relative z-10 top-0 bg-transparent text-white shadow-md  ">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            
            <Link href="/" className="text-2xl md:text-4xl font-bold mt-5 text-white text-pretty font-[saurav] hover:text-blue-200 transition">
              Github Glance
            </Link>
    
            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link
                href="/Hero"
                className="hover:text-blue-200 text-neutral-500 transition"
              >
                Profile Info
              </Link>
              <Link
                href="/GithubRepos"
                className="hover:text-blue-200 text-neutral-500 transition"
              >
                About
              </Link>
              <a
                href="https://github.com/your-username"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition text-neutral-500"
              >
                <FaGithub size={22} />
              </a>
            </nav>
          </div>
        </header>
  );
}
