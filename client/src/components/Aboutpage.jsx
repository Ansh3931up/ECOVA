import { motion } from 'framer-motion';
import { Leaf, Droplets, Sun, Moon } from 'lucide-react';
import React from 'react';
// Importing team member images
import Ansh from "../assets/ecova/ansh.png";
import Bhanu from "../assets/ecova/bhanu.png";
import Devesh from "../assets/ecova/devesh.png";
import hemang from "../assets/ecova/hemang.png";
import piyush from "../assets/ecova/jangir.png";
import kartikey from "../assets/ecova/kartikey.png";
import kaustubh from "../assets/ecova/kaustubh.png";
import kislay from "../assets/ecova/kislay.png";
import lakshya from "../assets/ecova/lakshya.png";
import rituraj from "../assets/ecova/rituraj.png";
import siddarth from "../assets/ecova/siddharth.png";
import tanishq from "../assets/ecova/tanishq.png";
import titiksha from "../assets/ecova/titiksha.png";
import EcovaLogo from '../assets/ecova-logo.jpg'; // Replace with the actual path to your logo
import { useTheme } from '../context/ThemeContext';
import anurag from "../assets/ecova/anurag.png";


const AboutPage = () => {
  const { isDark, toggleTheme } = useTheme();

  const teamMembers = [
    { name: 'Dr. Ina Thakur', title: 'Faculty Advisor', image: '' },
    { name: 'Manish Yadav', title: 'President', image: '' },
    { name: 'Piyush Jangir', title: 'Vice President', image: piyush },
    { name: 'Bhanu Singh', title: 'Treasurer', image: Bhanu },
    { name: 'Devesh Soni', title: 'Social Media', image: Devesh },
    { name: 'Kislay Kumar', title: 'Secretary', image: kislay },
    { name: 'Lakshya Kumar', title: 'Volunteer Team', image: lakshya },
    { name: 'Hemang Malhotra', title: 'Photography Team', image: hemang },
    { name: 'Ansh', title: 'PR Team Head', image: Ansh, contributor: true },  // Added contributor flag
    { name: 'Siddharth', title: 'Designing Team', image: siddarth },
    { name: 'Kaustubh Agarwal', title: 'Content Team', image: kaustubh },
    { name: 'Tanishq Sharma', title: 'Joint secretary', image: tanishq },
    { name: 'Kartikey', title: 'Executive Member', image: kartikey },
    { name: 'Rituraj', title: 'Executive Member', image: rituraj },
    { name: 'Titiksha', title: 'Executive Member', image: titiksha },
    { name: 'Anurag', title: 'Executive Member', image: anurag },
  ];

  return (
    <div className={`min-h-screen font-poppins transition-colors bg-color duration-500 ${
      isDark
        ? 'bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900'
        : 'bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50'
    }`}>
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-300"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9, rotate: -15 }}
      >
        {isDark ? (
          <Sun className="text-yellow-400" size={24} />
        ) : (
          <Moon className="text-blue-600" size={24} />
        )}
      </motion.button>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section with Logo */}
        <section className="text-center mb-12">
          <motion.img
            src={EcovaLogo}
            alt="Ecova Logo"
            className="mx-auto w-40 h-40 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h1
            className={`text-5xl font-bold mb-4 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Ecova
          </motion.h1>
          <motion.p
            className={`text-lg ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Environmental Conservation and Awareness Club
          </motion.p>
        </section>

        {/* Introduction Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>Our Mission</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-black'}`}>
            ECOVA is a club of like-minded students dedicated to environmental conservation, raising awareness, and engaging in social activities. We are a community of passionate individuals committed to making a positive impact through plantation drives, awareness campaigns, dramas, photography, and serving those in need. Together, we strive to create a sustainable and environmentally conscious community.
          </p>
        </section>

        {/* Our Team Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>Our Team</h2>
          <div className="overflow-x-auto lg:overflow-visible">
            <div className="flex lg:grid lg:grid-cols-4 gap-4 space-x-4 lg:space-x-0">
              {teamMembers.map((member, index) => (
                <div
                  className={`w-64 lg:w-auto flex-shrink-0 lg:flex-shrink p-6 rounded-xl transition-all duration-300`} 
                  key={index}
                >
                  <div className="overflow-hidden border-none shadow-lg rounded-xl">
                    <div className={`relative h-48 ${
                      isDark
                        ? 'bg-gradient-to-br from-blue-900 to-blue-600'
                        : 'bg-gradient-to-br from-green-800 to-[#15803D]'
                    }`}>
                      <div className="absolute inset-0 opacity-20">
                        {isDark ? (
                          <Droplets className="w-full h-full text-blue-200" />
                        ) : (
                          <Leaf className="w-full h-full text-green-200" />
                        )}
                      </div>
                      {member.contributor && ( // Display the badge if the member is a contributor
                        <div className="absolute top-2 left-2 bg-yellow-300 text-black px-2 py-1 rounded-full text-xs font-semibold">
                          Website Contributor
                        </div>
                      )}
                      <div className="absolute top-4 right-4 flex items-center">
                        {/* Additional content here */}
                      </div>
                    </div>

                    <div className={`relative px-6 pb-6 -mt-20 rounded-b-xl ${
                      isDark ? 'bg-gray-900' : 'bg-gradient-to-t from-green-100 to-green-50'
                    }`}>
                      <div className={`w-32 h-32 mx-auto rounded-full overflow-hidden border-4 ${
                        isDark
                          ? 'border-blue-400 shadow-blue-400/50'
                          : 'border-[#15803D] shadow-[#15803D]/50'
                      } shadow-lg`}>
                        <img
                          src={member.image}
                          alt="Profile picture"
                          className="w-full h-full object-cover bg-gradient-to-r from-blue-800 to-green-800"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h2 className={`text-2xl font-bold mb-1 ${
                          isDark ? 'text-white' : 'text-gray-800'
                        }`}>
                          {member.name}
                        </h2>
                        <p className={`text-sm mb-4 ${
                          isDark ? 'text-blue-300' : 'text-[#15803D]'
                        }`}>
                          {member.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Events Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>Our Events</h2>
          <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-black'} ml-4`}>
            {/* Events list */}
          </ul>
        </section>

        {/* How to Join Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>How to Join ECOVA</h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-black'}`}>Joining ECOVA is simple and rewarding. Here's how you can become a part of our community:</p>
          <ol className={`list-decimal list-inside ${isDark ? 'text-gray-300' : 'text-black'} ml-4 mt-4`}>
            {/* Steps to join */}
          </ol>
        </section>

        {/* Social Media Section */}
        <section className="text-center">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-[#15803D]'}`}>Follow Us on Social Media</h2>
          <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-black'}`}>Stay connected with us through our social media channels:</p>
          <p className={`text-lg ${isDark ? 'text-blue-200' : 'text-black'}`}>
            Instagram: <a href="https://www.instagram.com/ecova_iiitu" className="underline">ecova_iiitu</a><br />
            Facebook: <a href="https://www.facebook.com/ECOVA-IIITU" className="underline">ECOVA IIITU</a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
