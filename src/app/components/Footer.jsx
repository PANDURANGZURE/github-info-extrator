import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <div className='w-screen p-10 justify-between relative z-10 md:flex'>
        <div className='text-3xl text-center md:text-5xl font-[saurav]'>Github Glance</div>
        <div>
            <section className="text-center animate-fadeIn delay-200">
                      <h2 className="text-xl font-semibold mb-4 ">Connect with Me</h2>
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
        </div>
    </div>
  )
}

export default Footer