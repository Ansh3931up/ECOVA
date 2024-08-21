import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import EcovaLogo from '../assets/ecova-logo.jpg'; // Replace with the actual path to your logo
// import TeamMember1 from '../assets/team-member-1.jpg'; // Replace with actual image paths
// import TeamMember2 from '../assets/team-member-2.jpg'; // Replace with actual image paths

const AboutPage = () => {
    
  const { isDark, toggleTheme } = useTheme();

  const teamMembers = [
    { name: 'Dr. Ina Thakur', title: 'Faculty Advisor', image: '' },
    { name: 'Manish Yadav', title: 'President', image: '' },
    { name: 'Piyush Jangir', title: 'Vice President', image: '' },
    { name: 'Bhanu Singh', title: 'Treasurer', image:'' },
    { name: 'Devesh Soni', title: 'Social Media', image:'' },
    { name: 'Kislay Kumar', title: 'Secretary', image: '' },
    { name: 'Lakshya Kumar', title: 'Volunteer Team', image: '' },
    { name: 'Hemang Malhotra', title: 'Photography Team', image: '' },
    { name: 'Ansh', title: 'PR Team Head', image: '' },
    { name: 'Siddarth', title: 'Designing Team', image: '' },
    { name: 'Kaustubh Agarwal', title: 'Content Team', image:'' },
    // Add more members as needed
  ];

  return (
    <div className={`min-h-screen font-poppins transition-colors bg-color duration-500  ${
        isDark
          ? 'bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900'
          : 'bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50'
      } `}>
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
            className={`text-5xl font-bold mb-4 ${isDark ? 'text-sky-400' : 'text-green-500'}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Ecova
          </motion.h1>
          <motion.p
            className={`text-lg ${isDark ? 'text-sky-400' : 'text-green-500'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Environmental Conservation and Awareness Club
          </motion.p>
        </section>

        {/* Introduction Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-green-500'}`}>Our Mission</h2>
          <p className="text-lg">
            ECOVA is a club of like-minded students dedicated to environmental conservation, raising awareness, and engaging in social activities. We are a community of passionate individuals committed to making a positive impact through plantation drives, awareness campaigns, dramas, photography, and serving those in need. Together, we strive to create a sustainable and environmentally conscious community.
          </p>
        </section>

        {/* Our Team Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-green-500'}`}>Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <img src={member.image} alt={member.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className={`text-xl font-semibold ${isDark ? 'text-sky-400' : 'text-green-500'} mb-2`}>{member.name}</h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>{member.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Events Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-green-500'}`}>Our Events</h2>
          <ul className={`list-disc list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} ml-4`}>
            <li className="mb-2"><strong>PICKRITI</strong> - A Nature Photography Event</li>
            <li className="mb-2"><strong>Plantation Drives</strong> and Awareness Campaigns</li>
            <li className="mb-2"><strong>Skit/Drama Competition</strong> for School Students</li>
            <li className="mb-2"><strong>Serving NGO</strong> - Gurusidak Foundation - Mehatpur</li>
            <li className="mb-2"><strong>NGO Support</strong> - Chandigarh / Hoshiarpur / Anandpur Sahib</li>
          </ul>
        </section>

        {/* How to Join Section */}
        <section className="mb-16">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-green-500'}`}>How to Join ECOVA</h2>
          <p className="text-lg">Joining ECOVA is simple and rewarding. Here's how you can become a part of our community:</p>
          <ol className={`list-decimal list-inside ${isDark ? 'text-gray-300' : 'text-gray-700'} ml-4 mt-4`}>
            <li className="mb-2">Register for the interview.</li>
            <li className="mb-2">Give your best in the interview.</li>
            <li className="mb-2">YAY! You are a member of ECOVA.</li>
          </ol>
        </section>

        {/* Social Media Section */}
        <section className="text-center">
          <h2 className={`text-3xl font-semibold mb-6 ${isDark ? 'text-sky-400' : 'text-green-500'}`}>Follow Us on Social Media</h2>
          <p className="text-lg mb-4">Stay connected with us through our social media channels:</p>
          <p className={`text-lg ${isDark ? 'text-blue-200' : 'text-green-700'}`}>
            Instagram: <a href="https://www.instagram.com/ecova_iiitu" className="underline">ecova_iiitu</a><br />
            Facebook: <a href="https://www.facebook.com/ECOVA-IIITU" className="underline">ECOVA IIITU</a>
          </p>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
