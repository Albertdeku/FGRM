import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  Briefcase,
  ChevronRight,
  Home,
  HelpCircle,
  Info,
  LogIn,
  Search,
} from "lucide-react";

// Add icons to links for better visual scanning in the mobile menu
const navLinks = [
  { name: "Home", path: "/home", icon: Home },
  { name: "FAQs", path: "/faqs", icon: HelpCircle },
  { name: "About", path: "/about", icon: Info },
  {
    name: "Create Case",
    path: "/create-case",
    icon: Briefcase,
    isPrimary: true,
  }, // Highlight as primary action
  { name: "Track Case", path: "/track-case", icon: Search },
  { name: "Login", path: "/login", icon: LogIn, isAction: true }, // Highlight as action link
];

export default function ProfessionalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  // Scroll background behavior
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50); // Increased threshold for subtle effect
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load theme from localStorage and initialize document class
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const initialTheme =
      storedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Toggle dark/light theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    setIsOpen(false); // Close mobile menu on navigation
  }, [location]);

  // Framer Motion Variants for mobile menu
  const menuVariants = {
    open: { opacity: 1, height: "auto", transition: { duration: 0.4 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "tween" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-lg" // Solid, but blurred background
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo (Clean, single-color text with a professional accent) */}
        <Link
          to="/home"
          className="font-extrabold text-3xl tracking-tight cursor-pointer text-gray-800 dark:text-white"
        >
          <span className="text-blue-600 dark:text-blue-400">F</span>GRM
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-7 items-center h-10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;

            // Primary action link styling (e.g., 'Create Case')
            if (link.isPrimary) {
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:translate-y-[-1px]"
                >
                  {link.name}
                </Link>
              );
            }

            // Standard link styling
            return (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors p-1 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {link.name}
                </Link>
                {/* Active Link Indicator (Professional subtle underline) */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-link"
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-500 rounded-full"
                  />
                )}
              </div>
            );
          })}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 ml-4 rounded-full transition-all duration-300 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-yellow-500" />
            ) : (
              <Moon size={20} className="text-gray-500" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex gap-3 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            title={theme === "dark" ? "Light Mode" : "Dark Mode"}
          >
            {theme === "dark" ? (
              <Sun size={24} className="text-yellow-500" />
            ) : (
              <Moon size={24} className="text-gray-500" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Using Framer Motion variants for cleaner animation) */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 absolute w-full shadow-xl"
      >
        <div className="flex flex-col gap-1 py-4 px-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors group ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span className="flex items-center space-x-3">
                  <Icon
                    size={20}
                    className={
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 group-hover:text-blue-500"
                    }
                  />
                  <span>{link.name}</span>
                </span>
                <ChevronRight
                  size={18}
                  className="text-gray-400 dark:text-gray-500"
                />
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
}
