'use client'

import { ThemeProvider } from 'next-themes'

import Footer from "./Footer"
import NavBar from "./NavBar"
import { Outlet } from 'react-router-dom'

export default function Component({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Outlet className="flex-grow">
          {children}
        </Outlet>
        <Footer />
      </div>
    </ThemeProvider>
  )
}