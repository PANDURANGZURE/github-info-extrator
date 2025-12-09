"use client";
import React from "react";
import Header from "@/components/Header";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 animate-fadeIn">About <span className="font-[saurav] text-purple-200">GitHub Glance</span></h1>
          <p className="text-lg text-gray-400 animate-fadeIn delay-200">
            GitHubGlance is a modern web app built with Next.js & Tailwind CSS, making it easy to explore GitHub profiles and repositories in style.
          </p>
        </section>

        {/* Why Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6 animate-slideInLeft">
            <h2 className="text-3xl font-semibold text-white">Why GitHubGlance?</h2>
            <p className="text-gray-400">
              GitHubGlance provides a quick, elegant way to explore GitHub user profiles and their repositories. It's perfect for developers, recruiters, or anyone curious about GitHub activity.
            </p>
            <p className="text-gray-400">
              Navigate through repositories, view contributions, and get instant stats without leaving your browser.
            </p>
          </div>

          <div className="animate-slideInRight">
            <img
              src="https://github.com/PANDURANGZURE/project-img/blob/main/assets/project/githubglance.png?raw=true" // replace with your screenshot
              alt="GitHubGlance screenshot"
              className=" shadow-2xl border border-gray-700"
            />
          </div>
        </section>

        {/* Features */}
        <section className="text-center mb-16 animate-fadeIn">
          <h2 className="text-3xl font-semibold mb-6">Features</h2>
          <div className="grid sm:grid-cols-2 gap-6 text-gray-400">
            <div className="p-4 bg-black border  rounded-xl hover:bg-gray-800 transition-all">
              • View GitHub user profiles and stats
            </div>
            <div className="p-4 bg-black border  rounded-xl hover:bg-gray-800 transition-all">
              • Explore repositories with stars, forks & languages
            </div>
            <div className="p-4 bg-black border  rounded-xl hover:bg-gray-800 transition-all">
              • Instant search for users & repos
            </div>
            <div className="p-4 bg-black border  rounded-xl hover:bg-gray-800 transition-all">
              • Dark & responsive modern UI
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section className="text-center animate-fadeIn delay-200">
          <h2 className="text-3xl font-semibold mb-4">Connect with Me</h2>
          <div className="flex justify-center space-x-8 text-3xl text-gray-400">
            <a href="https://github.com/PANDURANGZURE" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/pandurang-santosh-zure-au3112/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/_anonymous_3112_/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
              <FaInstagram />
            </a>
          </div>
        </section>
      </main>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }
        .animate-slideInLeft { animation: slideInLeft 1s ease forwards; }
        .animate-slideInRight { animation: slideInRight 1s ease forwards; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}
