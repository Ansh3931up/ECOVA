import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { HomeIcon, LayoutDashboard, LogOutIcon, MailIcon, Newspaper, UserIcon, UserPlus2Icon } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { useTheme } from '../context/ThemeContext';
import { logout } from '../Redux/userRedux';

const IconButton = ({ children, ariaLabel, theme, onClick }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
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
  const { isLoggedIn } = useSelector((state) => state.auth);
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
    dispatch(logout());
  };

  return (
    <div className="fixed mt-7 top-4 left-0 right-0 z-50 flex justify-center px-4 sm:px-0">
      <motion.nav
        className={`w-full max-w-4xl rounded-full shadow-2xl overflow-hidden transition-colors duration-300 ${
          isDark ? 'bg-gradient-to-r from-gray-900 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-sky-200 to-blue-400'
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
            <div className="shooting-star"></div>
            <div className="shooting-star"></div>
          </div>
          <ul className="flex flex-wrap items-center justify-around p-0 space-x-0 sm:space-x-4 relative z-10">
            <li>
              <IconButton ariaLabel="Home" theme={isDark ? 'dark' : 'light'}>
                <Link to="/" className="flex items-center space-x-2">
                  <HomeIcon className="h-6 w-6" />
                  <span className="hidden sm:inline-block text-sm sm:text-lg font-semibold">Home</span>
                </Link>
              </IconButton>
            </li>
            <li>
              <IconButton ariaLabel="About" theme={isDark ? 'dark' : 'light'}>
                <Link to="/about" className="flex items-center space-x-2">
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden sm:inline-block text-sm sm:text-lg font-semibold">About</span>
                </Link>
              </IconButton>
            </li>
            <li>
              <IconButton ariaLabel="Contact" theme={isDark ? 'dark' : 'light'}>
                <Link to="/contact" className="flex items-center space-x-2">
                  <MailIcon className="h-6 w-6" />
                  <span className="hidden sm:inline-block text-sm sm:text-lg font-semibold">Contact</span>
                </Link>
              </IconButton>
            </li>
            <li>
              <IconButton ariaLabel="News" theme={isDark ? 'dark' : 'light'}>
                <Link to="/news" className="flex items-center space-x-2">
                  <Newspaper className="h-6 w-6" />
                  <span className="hidden sm:inline-block text-sm sm:text-lg font-semibold">News</span>
                </Link>
              </IconButton>
            </li>
            <li>
              <IconButton ariaLabel="Gallery" theme={isDark ? 'dark' : 'light'}>
                <Link to="/gallery" className="flex items-center space-x-2">
                  <LayoutDashboard className="h-6 w-6" />
                  <span className="hidden sm:inline-block text-sm sm:text-lg font-semibold">Gallery</span>
                </Link>
              </IconButton>
            </li>
            <li>
              {isLoggedIn ? (
                <IconButton ariaLabel="Logout" theme={isDark ? 'dark' : 'light'} onClick={handleLogout}>
                  <LogOutIcon className="h-6 w-6" />
                  <span className="hidden sm:inline-block text-sm sm:text-lg font-semibold">Logout</span>
                </IconButton>
              ) : (
                <IconButton ariaLabel="Sign In" theme={isDark ? 'dark' : 'light'}>
                  <Link to="/signin" className="flex items-center space-x-2">
                    <UserPlus2Icon className="h-6 w-6" />
                    <span className="hidden sm:inline-block text-sm sm:text-lg font-semibold">Sign In</span>
                  </Link>
                </IconButton>
              )}
            </li>
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
            width: 120px;
            height: 2px;
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
            opacity: 0.6;
            animation: shoot 4s linear infinite;
          }
          .shooting-star:nth-child(1) {
            top: 20%;
            left: -10%;
            animation-delay: 0s;
          }
          .shooting-star:nth-child(2) {
            top: 50%;
            left: 20%;
            animation-delay: 1.5s;
          }
          .shooting-star:nth-child(3) {
            top: 80%;
            left: -20%;
            animation-delay: 3s;
          }
        `}</style>
      </motion.nav>
    </div>
  );
}
