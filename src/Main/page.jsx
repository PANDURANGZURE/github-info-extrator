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
        <div className=" mx-auto p-4 flex justify-center items-center h-full w-full ">
     
          <div>
            <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
            Get a quick peek into any <br />GitHub profile.
          </h1>
          

          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Welcome to the site! , This tool is designed to give you a quick and easy way to get information about a GitHub user profile.
          </p>

          <div className="relative z-10 flex justify-center mt-5">
            <HoverBorderGradient><div className="flex justify-center items-center">
              <span className="text-lg font-bold font-sans  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">Get Started</span>
              </div></HoverBorderGradient>
          </div>
          </div>
        </div>

        <BackgroundBeams />
      </div>
    </>
  );
}
