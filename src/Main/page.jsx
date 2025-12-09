"use client";
import Header from "@/components/Header";
import { BackgroundBeams } from "@/components/ui/background-beams";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/app/components/Button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IoIosArrowForward } from "react-icons/io";
import gsap from "gsap";

export function Main() {
  const titleRef1 = useRef(null);
  const titleRef2 = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animate first title
    if (titleRef1.current) {
      gsap.fromTo(
        titleRef1.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }

    // Animate second title with delay
    if (titleRef2.current) {
      gsap.fromTo(
        titleRef2.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
    }

    // Animate description
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );
    }

    // Animate button with bounce
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)", delay: 0.6 }
      );

      // Add hover animation to button
      buttonRef.current.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      buttonRef.current.addEventListener("mouseleave", () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  }, []);
  return (
    <>

      {/* Header fixed at the top */}
      

      <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center antialiased">
        <Header />
        <div className=" mx-auto p-4 flex justify-center items-center h-full w-full pt-12">
     
          <div className="flex flex-col justify-center w-screen items-center text-center">
            
          <h1 ref={titleRef1} className="relative z-10 text-blue-100 font-[saurav] text-6xl md:text-8xl mb-3 ">Get a quick peek into any </h1>
          <h1 ref={titleRef2} className="relative z-10 text-purple-400 font-[saurav] text-7xl md:text-8xl ">GitHub profile.</h1>
          
          

          <p ref={descRef} className="text-neutral-500 max-w-lg mx-5 md:mx-auto my-2 text-sm text-center relative z-10">
            Welcome to Github Glance ! This tool is designed to give you a quick and easy way to get information about a GitHub user profile.
          </p>

          <div ref={buttonRef} className="relative z-10 flex justify-center mt-5 gap-5 ">
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
