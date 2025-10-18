"use client";

export default function Clone() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 font-sans relative overflow-hidden">
      {/* Top Bar */}
      <div className="flex justify-between items-center w-full max-w-6xl text-sm tracking-wide mb-20">
        <span className="">GITHUB GLANCE</span>
        <div className="flex-1 border-t border-gray-700 mx-4"></div>
        <span>PROFILE INFO</span>
      </div>

      {/* Hero Section */}
      <div className="text-center">
        <p className="text-xs text-red-500 mb-2 font-saurav">GET A</p>
        <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-extrabold font-[saurav] leading-none">
          QUICK PEEK
        </h1>
        <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] font-extrabold leading-none">
          PROFILE
        </h1>
        <p className="text-sm mt-4">
          INTO ANY <span className="text-orange-500">GITHUB</span>
        </p>
      </div>

      {/* Description */}
      <div className="mt-16 border-t border-gray-700 pt-8 w-full max-w-4xl">
        <p className="text-sm text-gray-300 leading-relaxed max-w-xl">
          This tool is designed to give you a quick and easy way to get information
          about a GitHub user profile.
        </p>
        <div className="flex justify-between items-end mt-10 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <span className="border-l border-b border-white w-4 h-4 inline-block rotate-45 -translate-y-2"></span>
          </div>
          <div className="text-right">
            <p className="text-white font-semibold">GET STARTED</p>
            <p>Just enter any profile name and get data</p>
            <p className="mt-1">2025</p>
          </div>
        </div>
      </div>

      {/* Decorative spark bottom-right */}
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[radial-gradient(circle,white,transparent_60%)] opacity-30 rotate-45"></div>
    </main>
  );
}
