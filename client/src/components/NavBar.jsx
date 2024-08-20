'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { HomeIcon, LayoutDashboard, LogOutIcon,MailIcon, Newspaper, UserIcon, UserPlus2Icon } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { useTheme } from '../context/ThemeContext';
import { logout } from '../Redux/userRedux';

const IconButton = ({ children, ariaLabel, theme, onClick }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick} // Ensure onClick is applied here
      className={`${
        theme === 'dark'
          ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white focus:bg-gray-700/50 focus:text-white'
          : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900 focus:bg-gray-200 focus:text-gray-900'
      } rounded-full p-2 transition-colors duration-200`}
    >
      {children}
    </button>
  );
};


export default function NavBar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { isDark } = useTheme();
  const { isLoggedIn } = useSelector((state) => state.auth); // Get login state from Redux
  const dispatch = useDispatch();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        className={`w-4/5 rounded-full shadow-lg overflow-hidden transition-colors duration-300 ${
          isDark ? 'bg-gradient-to-r from-gray-900 via-blue-400 to-purple-500' : 'bg-gradient-to-r from-sky-200 to-blue-400'
        }`}
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <div className="relative">
          <div className="absolute inset-0">
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
          </div>
          <ul className="flex items-center justify-center p-2 space-x-4 relative z-10">
            <li>
              <IconButton ariaLabel="Home" theme={isDark ? 'dark' : 'light'}>
                <Link to="/">
                  <HomeIcon className="h-5 w-5" />
                </Link>
              </IconButton>
            </li>
            <li>
              <IconButton ariaLabel="About" theme={isDark ? 'dark' : 'light'}>
                <Link to="/about">
                  <UserIcon className="h-5 w-5" />
                </Link>
              </IconButton>
            </li>
            <li>
              <IconButton ariaLabel="Contact" theme={isDark ? 'dark' : 'light'}>
                <Link to="/contact">
                  <MailIcon className="h-5 w-5" />
                </Link>
              </IconButton>
            </li>
            <li>
              <IconButton ariaLabel="News" theme={isDark ? 'dark' : 'light'}>
                <Link to="/news">
                  <Newspaper className="h-5 w-5" />
                </Link>
              </IconButton>
            </li>
            <li>
              <IconButton ariaLabel="Gallery" theme={isDark ? 'dark' : 'light'}>
                <Link to="/gallery">
                  <LayoutDashboard className="h-5 w-5" />
                </Link>
              </IconButton>
            </li>
            {isLoggedIn ? (
              <li>
                <IconButton ariaLabel="Logout" theme={isDark ? 'dark' : 'light'} onClick={handleLogout}>
                  <LogOutIcon className="h-5 w-5" />
                </IconButton>
              </li>
            ) : (
              <li>
                <IconButton ariaLabel="Sign In" theme={isDark ? 'dark' : 'light'}>
                  <Link to="/signin">
                    <UserPlus2Icon className="h-5 w-5" />
                  </Link>
                </IconButton>
              </li>
            )}
          </ul>
        </div>
        <style>{`
          @keyframes shoot {
            0% {
              transform: translateX(-100%) translateY(100%);
            }
            100% {
              transform: translateX(200%) translateY(-100%);
            }
          }
          .shooting-star {
            position: absolute;
            width: 100px;
            height: 1px;
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
            opacity: 0.5;
            animation: shoot 5s linear infinite;
          }
          .shooting-star:nth-child(1) {
            top: 10%;
            left: -10%;
            animation-delay: 0s;
          }
          .shooting-star:nth-child(2) {
            top: 50%;
            left: 20%;
            animation-delay: 2s;
          }
          .shooting-star:nth-child(3) {
            top: 80%;
            left: -20%;
            animation-delay: 4s;
          }
        `}</style>
      </motion.nav>
    </div>
  );
}
