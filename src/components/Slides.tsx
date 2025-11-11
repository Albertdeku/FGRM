import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

// --- Enhanced Data Structure for Creative Control ---
const SLIDE_DURATION = 6500; // Auto-play duration

const slides = [
  {
    image: "public/images/cocoa/newcocoa.jpg",
    title: "Your Voice Matters in Cocoa Farming",
    subtitle: "Feedback & Grievance Redress Mechanism",
    description:
      "Submit your feedback and report issues to promote sustainability and fairness in the industry.",
    align: "center", // Text alignment
    accent: "text-amber-400", // Unique accent color
  },
  {
    image: "/images/cocoa/new cocoa2.jpg",
    title: "Tracking Progress, Ensuring Transparency",
    subtitle: "From Report to Resolution",
    description:
      "Easily track the status of your submitted cases with real-time updates and secure access.",
    align: "left",
    accent: "text-sky-400",
  },
  {
    image: "/images/cocoa/hand pollution.jpg",
    title: "Boosting Yields Through Hand Pollination",
    subtitle: "A Key Initiative",
    description:
      "Learn how modern techniques and supportive programs are driving higher cocoa productivity.",
    align: "right",
    accent: "text-emerald-400",
  },
  {
    image: "/images/cocoa/fetilizer distribution.jpg",
    title: "Accountability in Fertilizer Distribution",
    subtitle: "Fair Access for All",
    description:
      "Report issues related to resource quality and distribution for immediate action.",
    align: "left",
    accent: "text-rose-400",
  },
];

// Framer Motion Variants for Staggered Title Entrance (Creative Touch)
const titleContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: i * 0.2 },
  }),
};

const titleChild = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
  hidden: {
    opacity: 0,
    y: 30,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

export default function CreativeSlides() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(interval);
  }, [nextSlide]);

  const currentSlideData = slides[currentSlide];
  const titleWords = currentSlideData.title.split(" "); // Split title for kinetic animation

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }} // Zoom in entrance
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={currentSlideData.image}
              className="w-full h-full object-cover object-center"
              alt={currentSlideData.title}
              loading="eager"
            />

            {/* Creative Multi-Layer Gradient Overlay */}
            <div
              className={`absolute inset-0 
                bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                opacity-95 transition-opacity duration-500`}
            />

            {/* Text Content */}
            <div
              className={`absolute bottom-0 top-0 py-24 text-white w-full px-8 flex flex-col justify-end z-20 
                ${
                  currentSlideData.align === "center"
                    ? "items-center text-center"
                    : ""
                }
                ${
                  currentSlideData.align === "left"
                    ? "items-start text-left"
                    : "items-end text-right"
                }
              `}
            >
              <motion.div
                key={currentSlide + "-text-block"} // Force re-animation
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`max-w-6xl drop-shadow-2xl ${
                  currentSlideData.align !== "center" ? "lg:max-w-xl" : ""
                }`}
              >
                {/* SUBTITLE */}
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className={`text-xl sm:text-2xl font-semibold mb-3 ${currentSlideData.accent}`}
                >
                  <Zap size={20} className="inline mr-2" />
                  {currentSlideData.subtitle}
                </motion.p>

                {/* TITLE - Kinetic Text Animation */}
                <motion.h1
                  className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
                  variants={titleContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {titleWords.map((word, index) => (
                    <motion.span
                      variants={titleChild}
                      key={index}
                      className="inline-block mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>

                {/* DESCRIPTION */}
                <motion.p
                  initial={{
                    opacity: 0,
                    x:
                      currentSlideData.align === "left"
                        ? -30
                        : currentSlideData.align === "right"
                        ? 30
                        : 0,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-lg md:text-xl max-w-2xl font-light"
                >
                  {currentSlideData.description}
                </motion.p>

                {/* Creative Call to Action Button */}
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 8px 15px rgba(251, 191, 36, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="mt-10 px-10 py-4 text-gray-900 font-extrabold rounded-full transition duration-300
                      bg-amber-400 hover:bg-amber-300 uppercase tracking-widest text-sm shadow-xl"
                >
                  File a New Grievance
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Creative Progress Indicator & Index (Replaces Dots) --- */}
      <div className="absolute bottom-6 right-6 z-30 flex items-center space-x-4">
        <div className="text-white text-3xl font-mono opacity-80">
          {(currentSlide + 1).toString().padStart(2, "0")}
          <span className="text-xl font-light">
            /{totalSlides.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Progress Bar Line */}
        <div className="w-40 h-1 bg-white/30 rounded-full overflow-hidden">
          <motion.div
            key={currentSlide + "-progress"}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            className="h-full bg-amber-400"
          />
        </div>
      </div>

      {/* Sleek Side Controls */}
      <button
        className="absolute top-1/2 left-6 transform -translate-y-1/2 flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/30 rounded-full text-white transition-all duration-300 z-30"
        type="button"
        onClick={prevSlide}
      >
        <ChevronLeft size={30} />
      </button>

      <button
        className="absolute top-1/2 right-6 transform -translate-y-1/2 flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/30 rounded-full text-white transition-all duration-300 z-30"
        type="button"
        onClick={nextSlide}
      >
        <ChevronRight size={30} />
      </button>
    </div>
  );
}
