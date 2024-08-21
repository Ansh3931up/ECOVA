'use client'

import { motion, useAnimation } from 'framer-motion'
import { Facebook, Instagram, Link, Linkedin, Twitter } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useEffect, useState } from 'react'
import emailjs from "emailjs-com";
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatcher";

export default function Footer() {
  const controls = useAnimation()
  const { isDark } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      controls.start({ y: window.scrollY * 0.5 })
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [controls])

  if (!mounted) return null

  return (
    <footer className={`relative z-10 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} py-12 px-4`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Ecova</h3>
          <p className="text-sm text-gray-300 dark:text-gray-600">
            Create stunning portfolios with ease. Showcase your work to the world.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-purple-400 dark:hover:text-purple-600 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-purple-400 dark:hover:text-purple-600 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-purple-400 dark:hover:text-purple-600 transition-colors">Contact</Link></li>
            <li><Link to="/news" className="hover:text-purple-400 dark:hover:text-purple-600 transition-colors">News</Link></li>
            <li><Link to="/gallery" className="hover:text-purple-400 dark:hover:text-purple-600 transition-colors">Gallery</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
          
          <div className="flex space-x-4 mt-4">
            <Link to="https://www.facebook.com/ECOVA-IIITU" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 dark:hover:text-purple-600 transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
           
            <Link to="https://www.instagram.com/ecova_iiitu" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 dark:hover:text-purple-600 transition-colors">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link to="https://www.linkedin.com/company/ecova-iiitu/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 dark:hover:text-purple-600 transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4 text-sm text-gray-300 dark:text-gray-600">
        &copy; 2024 Ecova. All rights reserved.
      </div>
    </footer>
  )
}
