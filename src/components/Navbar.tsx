import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
  Shield, // The professional logo accent icon
} from "lucide-react";

// --- Global Theme Transition Style Injection (Required for V2's smooth toggle) ---
const injectThemeStyles = () => {
  const styleId = "theme-transition-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .theme-transition * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
      }
    `;
    document.head.appendChild(style);
  }
};
injectThemeStyles();

// --- Navigation Data with Descriptions for Accessibility (V2) ---
const navigationLinks = [
  {
    name: "Home",
    path: "/home",
    icon: Home,
    description: "Return to dashboard",
  },
  {
    name: "FAQs",
    path: "/faqs",
    icon: HelpCircle,
    description: "Frequently asked questions",
  },
  {
    name: "About",
    path: "/about",
    icon: Info,
    description: "Learn about our platform",
  },
  {
    name: "Create Case",
    path: "/create-case",
    icon: Briefcase,
    isPrimary: true, // Primary Call-to-Action
    description: "Start a new case file",
  },
  {
    name: "Track Case",
    path: "/track-case",
    icon: Search,
    description: "Monitor case progress",
  },
  {
    name: "Login",
    path: "/login",
    icon: LogIn,
    isAction: true, // Secondary Action Link
    description: "Access your account",
  },
];

export default function ProfessionalNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false); // For theme toggle animation
  const location = useLocation();

  // --- Theme Initialization and Scroll Handling (V2) ---
  useEffect(() => {
    // Scroll Handling with simple debounce/throttle logic
    const handleScroll = () => {
      const scrollThreshold = 20;
      setHasScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Theme Initialization
    const storedTheme = localStorage.getItem("theme");
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = storedTheme || systemPreference;
    setCurrentTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  // Smooth theme transition toggle (V2)
  const toggleTheme = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.classList.add("theme-transition");
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Remove transition class after animation completes (300ms)
    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
      setIsAnimating(false);
    }, 300);
  };

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // --- Framer Motion Variants ---
  const mobileMenuVariants: Variants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const navItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Helper function to get standard desktop link text/hover colors
  const getDesktopLinkClass = (isActive = false) => {
    if (hasScrolled) {
      // Scrolled (Light/Dark mode)
      return isActive
        ? "text-amber-700 dark:text-blue-400 bg-amber-50 dark:bg-blue-900/30 font-extrabold"
        : "text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800";
    }
    // Not Scrolled (Gradient Background)
    return isActive
      ? "text-white bg-white/20 font-extrabold"
      : "text-white hover:text-amber-200 dark:hover:text-blue-300 hover:bg-white/10";
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        hasScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/80 dark:border-gray-700/80 shadow-lg"
          : "bg-gradient-to-r from-amber-500 via-emerald-700 to-green-900 shadow-xl" // V1's distinct gradient
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Brand Logo (V2) */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              to="/home"
              className="flex items-center space-x-2 cursor-pointer group"
              aria-label="FGRM - Home"
            >
              <Shield
                className={`h-8 w-8 transition-colors duration-300 ${
                  hasScrolled
                    ? "text-amber-600 dark:text-blue-500"
                    : "text-amber-300 dark:text-blue-400"
                }`}
              />
              <span
                className={`font-bold text-2xl tracking-tight transition-colors duration-300 ${
                  hasScrolled ? "text-gray-800 dark:text-white" : "text-white"
                }`}
              >
                <span
                  className={
                    hasScrolled
                      ? "text-amber-600 dark:text-blue-400"
                      : "text-amber-300"
                  }
                >
                  F
                </span>
                GRM
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              const IconComponent = link.icon;

              // Primary Action Button (Create Case) - Enhanced V2 styling
              if (link.isPrimary) {
                return (
                  <motion.div
                    key={link.path}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 border border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
                      aria-label={link.description}
                    >
                      <IconComponent size={18} />
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              }

              // Action Link (Login) - Enhanced V2 styling
              if (link.isAction) {
                return (
                  <motion.div
                    key={link.path}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-2 border-blue-600 dark:border-blue-400 shadow-sm hover:shadow-md hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      aria-label={link.description}
                    >
                      <IconComponent size={18} />
                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              }

              // Standard Navigation Link - Merged V1 and V2 logic
              return (
                <motion.div
                  key={link.path}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${getDesktopLinkClass(
                      isActive
                    )} focus:outline-none focus:ring-2 focus:ring-amber-500/50`}
                    aria-label={link.description}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <IconComponent size={18} className="flex-shrink-0" />
                    <span>{link.name}</span>
                  </Link>

                  {/* Active indicator (V2: LayoutId for smooth switch between links) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 rounded-full ${
                        hasScrolled
                          ? "bg-amber-500 dark:bg-blue-400"
                          : "bg-white"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Theme Toggle (V2 logic) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              disabled={isAnimating}
              className={`p-2.5 ml-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 border ${
                hasScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600"
                  : "text-white hover:bg-white/10 border-white/20"
              }`}
              aria-label={
                currentTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {currentTheme === "dark" ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon
                  size={20}
                  className={hasScrolled ? "text-gray-600" : "text-amber-200"}
                />
              )}
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              disabled={isAnimating}
              className={`p-2.5 rounded-xl transition-all duration-300 border ${
                hasScrolled
                  ? "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600"
                  : "text-white hover:bg-white/10 border-white/20"
              }`}
              aria-label={
                currentTheme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {currentTheme === "dark" ? (
                <Sun size={22} className="text-yellow-400" />
              ) : (
                <Moon
                  size={22}
                  className={hasScrolled ? "text-gray-600" : "text-amber-200"}
                />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-colors border focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                hasScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600"
                  : "text-white hover:bg-white/10 border-white/20"
              }`}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu (V2 with AnimatePresence) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="lg:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/80 dark:border-gray-700/80 shadow-xl absolute w-full left-0"
            >
              <div className="flex flex-col space-y-2 py-4 px-4">
                {navigationLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  const IconComponent = link.icon;

                  const linkAnimation = {
                    initial: { x: -20, opacity: 0 },
                    animate: { x: 0, opacity: 1 },
                    transition: { delay: index * 0.1 },
                  };

                  // Mobile Primary Action
                  if (link.isPrimary) {
                    return (
                      <motion.div key={link.path} {...linkAnimation}>
                        <Link
                          to={link.path}
                          className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg active:scale-95 border border-blue-600"
                          aria-label={link.description}
                        >
                          <span className="flex items-center space-x-3 font-semibold">
                            <IconComponent size={20} />
                            <span>{link.name}</span>
                          </span>
                          <ChevronRight size={18} className="text-white/70" />
                        </Link>
                      </motion.div>
                    );
                  }

                  // Mobile Action Link
                  if (link.isAction) {
                    return (
                      <motion.div key={link.path} {...linkAnimation}>
                        <Link
                          to={link.path}
                          className="flex items-center justify-between p-4 rounded-xl transition-all duration-300 bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 border-2 border-blue-600 dark:border-blue-400 font-semibold active:scale-95"
                          aria-label={link.description}
                        >
                          <span className="flex items-center space-x-3">
                            <IconComponent size={20} />
                            <span>{link.name}</span>
                          </span>
                          <ChevronRight size={18} />
                        </Link>
                      </motion.div>
                    );
                  }

                  // Mobile Standard Link - Merged V1 & V2 styles
                  return (
                    <motion.div key={link.path} {...linkAnimation}>
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                          isActive
                            ? "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-blue-900/40 dark:to-blue-800/40 text-amber-700 dark:text-blue-400 font-semibold border border-amber-200 dark:border-blue-800"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/80 border border-transparent"
                        } active:scale-95`}
                        aria-label={link.description}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="flex items-center space-x-3">
                          <IconComponent
                            size={20}
                            className={
                              isActive
                                ? "text-amber-600 dark:text-blue-400"
                                : "text-gray-500 dark:text-gray-400 group-hover:text-amber-600 dark:group-hover:text-blue-400"
                            }
                          />
                          <span>{link.name}</span>
                        </span>
                        <ChevronRight
                          size={18}
                          className={
                            isActive
                              ? "text-amber-600/70 dark:text-blue-400/70"
                              : "text-gray-400 dark:text-gray-500 group-hover:text-amber-600 dark:group-hover:text-blue-400"
                          }
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}