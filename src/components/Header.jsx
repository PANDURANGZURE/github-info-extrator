"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useState, forwardRef, useEffect } from "react";
import gsap from "gsap";
import logo from '../assets/logo.png'


const Header = forwardRef((props, ref) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Animate header on mount
  useEffect(() => {
    // Get the header element from the ref
    const headerElement = ref?.current;
    if (!headerElement) return;

    gsap.fromTo(
      headerElement,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Animate nav links stagger
    const navLinks = headerElement.querySelectorAll("a:not([aria-label])");
    if (navLinks.length > 0) {
      gsap.fromTo(
        navLinks,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }
  }, []);

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => {
      const newState = !prev;
      
      // Animate menu button rotation
      setTimeout(() => {
        const menuBtn = document.querySelector("[aria-label='Toggle menu']");
        if (menuBtn) {
          gsap.to(menuBtn, {
            rotate: newState ? 90 : 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }, 0);
      
      return newState;
    });
  };

  return (
    <header ref={ref} className="w-screen relative z-50 top-0 b  text-white my-4">
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
            href="/About"
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
        <nav 
          className="md:hidden px-6 py-4 space-y-3"
          ref={(el) => {
            if (el && mobileMenuOpen) {
              gsap.fromTo(
                el,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
              );
              gsap.fromTo(
                el.querySelectorAll("a, span"),
                { opacity: 0, x: -15 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.4,
                  stagger: 0.08,
                  ease: "power2.out",
                }
              );
            }
          }}
        >
          <Link
            href="/Hero"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 hover:text-purple-400 text-neutral-300 transition"
          >
            Profile Info
          </Link>
          <Link
            href="/About"
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
});

Header.displayName = "Header";
export default Header;
