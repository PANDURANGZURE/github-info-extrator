"use client";
import Header from "@/components/Header";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/app/components/Button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IoIosArrowForward } from "react-icons/io";

export function Main() {
  return (
    <>

      {/* Header fixed at the top */}
      

      <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased">
        <Header />
        <div className=" mx-auto p-4 flex justify-center items-center h-full w-full pt-12">
     
          <div className="flex flex-col justify-center w-screen items-center text-center">
            
          <h1 className="relative z-10 text-blue-100 font-[saurav] text-6xl md:text-8xl mb-3 ">Get a quick peek into any </h1>
          <h1 className="relative z-10 text-purple-400 font-[saurav] text-7xl md:text-8xl ">GitHub profile.</h1>
          
          

          <p className="text-neutral-500 max-w-lg mx-5 md:mx-auto my-2 text-sm text-center relative z-10">
            Welcome to Github Glance ! This tool is designed to give you a quick and easy way to get information about a GitHub user profile.
          </p>

          <div className="relative z-10 flex justify-center mt-5 gap-5 ">
            <Link href='/Hero'><HoverBorderGradient className='hover:scale-105 transition md:mx-8 duration-400'><div className="flex justify-center items-center cursor-pointer ">
              <span className="md:text-lg font-bold font-sans  bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-500">Profile Info</span>
              </div></HoverBorderGradient></Link>
                          
          </div>
          </div>
        </div>

        <BackgroundBeams />
      </div>
    </>
  );
}
