import { motion } from "framer-motion";
import {
  FilePlus, // Cleaner icon than FilePlusCorner
  MapPinned,
  MessageCircleQuestion, // Cleaner icon than MessageCircleQuestionMark
  ArrowRight, // For button hover
} from "lucide-react";
import { Link } from "react-router-dom"; // Use Link for navigation/buttons

// Data with corrected titles and paths
const SupportServicesData = [
  {
    id: 1,
    icon: FilePlus,
    title: "Create a New Case",
    description:
      "Submit your feedback, complaints, or grievances regarding cocoa farming operations.",
    buttonText: "Create Case",
    path: "/create-case",
  },
  {
    id: 2,
    icon: MapPinned,
    title: "Track Case Status",
    description:
      "Check the real-time status and progress of your submitted case using your reference ID.",
    buttonText: "Check Status",
    path: "/track-case",
  },
  {
    id: 3,
    icon: MessageCircleQuestion,
    title: "Frequently Asked Questions",
    description:
      "Find quick answers and information about common procedures and policies.",
    buttonText: "View FAQs",
    path: "/faqs",
  },
];

const FeatureCard = ({ data, index }: any) => {
  // Determine dark mode based on document class
  const isDarkMode = document.documentElement.classList.contains("dark");
  const IconComponent = data.icon;
  const delay = index * 0.15; // Stagger delay

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
      viewport={{ once: true, amount: 0.3 }}
      className={`p-8 rounded-xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] 
        ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700 hover:shadow-blue-500/30"
            : "bg-white border border-gray-200 hover:shadow-blue-200/50"
        }
      `}
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div
          className={`p-4 rounded-full ${
            isDarkMode
              ? "bg-blue-600/10 border border-blue-600/30"
              : "bg-blue-100"
          }`}
        >
          <IconComponent
            size={40}
            className={`text-blue-600 ${
              isDarkMode ? "dark:text-blue-400" : ""
            }`}
          />
        </div>
      </div>

      {/* Title & Description */}
      <h2
        className={`text-xl font-bold text-center mb-3 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {data.title}
      </h2>
      <p
        className={`mb-6 text-center text-sm ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {data.description}
      </p>

      {/* Button (Use Link for navigation and professional hover effect) */}
      <Link to={data.path}>
        <motion.button
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 transition-all duration-300 
            bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 shadow-md shadow-blue-500/40
          `}
        >
          <span>{data.buttonText}</span>
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default function SupportBlock() {
  return (
    <div className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Professional Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 px-4">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          Farmer Support Services
        </h2>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mt-5">
          Access our comprehensive services designed specifically for cocoa
          farmers
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 lg:px-8">
        {SupportServicesData.map((t, index) => (
          <FeatureCard key={t.id} data={t} index={index} />
        ))}
      </div>
    </div>
  );
}
