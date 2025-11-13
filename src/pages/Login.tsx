import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LogIn, UserPlus, Zap, Moon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Validation and Types ---
const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Create a comprehensive type that includes all possible fields
type AuthFormData = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  confirmPassword?: string;
};

// Helper function to get the appropriate schema based on mode
const getSchema = (isLogin: boolean) => {
  return isLogin ? LoginSchema : SignupSchema;
};

// Type guard for signup errors
type SignupErrors = {
  firstName?: { message: string };
  lastName?: { message: string };
  phoneNumber?: { message: string };
  confirmPassword?: { message: string };
};

// --- Helper: The Isometric Illustration Panel ---
const IsometricPanel = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`hidden lg:flex flex-col items-center justify-center p-12 relative overflow-hidden transition-all duration-500 rounded-r-xl lg:rounded-l-[40px] lg:rounded-r-xl
        ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-gray-950"
            : "bg-gradient-to-br from-amber-700 to-amber-950"
        }
      `}
    >
      {/* Abstract background shapes */}
      <div
        className={`absolute inset-0 opacity-20 transition-opacity duration-500 ${
          darkMode ? "opacity-10" : "opacity-30"
        }`}
      >
        <div
          className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full blur-[80px] ${
            darkMode ? "bg-cyan-500/30" : "bg-pink-300/50"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 right-0 w-2/3 h-2/3 rounded-full blur-[80px] ${
            darkMode ? "bg-purple-500/30" : "bg-cyan-300/50"
          }`}
        ></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center text-white p-6">
        <h2 className="text-3xl font-bold mt-8 mb-2">Welcome to FGRM</h2>
        <p className="text-lg font-light opacity-90">
          Join our community today
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(getSchema(isLogin)),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmPassword: "",
    },
  });

  // --- Dark Mode Listener ---
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const onSubmit = (data: AuthFormData) => {
    setSubmitting(true);
    setSuccess(false);
    console.log("Form submitted:", data);

    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      reset({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(false), 2000);
    }, 800);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      confirmPassword: "",
    });
  };

  // --- Dynamic Input Styles ---
  const inputStyle = `
    w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-200 shadow-sm
    ${
      darkMode
        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500/50 focus:border-blue-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500/30 focus:border-blue-500"
    }
  `;

  // Safe error access for signup fields
  const signupErrors = errors as SignupErrors;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      {/* Main Container - Stack on mobile, side-by-side on desktop */}
      <div
        className={`w-full max-w-lg lg:max-w-6xl h-auto lg:aspect-[16/9] shadow-2xl overflow-hidden flex flex-col lg:flex-row transition-colors duration-500
        ${
          darkMode
            ? "bg-gray-900 border border-gray-700 rounded-xl"
            : "bg-white rounded-xl"
        }
      `}
      >
        {/* --- LEFT PANEL: Login Form --- */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`w-full lg:w-1/2 p-6 md:p-8 lg:p-16 flex flex-col justify-between rounded-xl lg:rounded-r-[40px] lg:rounded-l-xl
          ${darkMode ? "bg-gray-900" : "bg-white"}
          `}
        >
          <div className="w-full">
            {/* Logo/Branding */}
            <div className="mb-8 lg:mb-12 flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="w-6 h-6 text-amber-600 mr-2" />
                <span
                  className={`text-lg font-bold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  FGRM
                </span>
              </div>
              <Moon
                className={`w-5 h-5 ${
                  darkMode ? "text-yellow-400" : "text-gray-500"
                }`}
              />
            </div>

            <hgroup className="mb-6 lg:mb-8">
              <h1
                className={`text-2xl lg:text-3xl font-extrabold mb-2 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <h2
                className={`text-lg lg:text-xl font-medium ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {isLogin ? "Sign into your account" : "Join us today"}
              </h2>
            </hgroup>

            {/* Form */}
            <form
              className="w-full space-y-4"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* Login Form Fields */}
              {isLogin ? (
                <>
                  {/* Email/Phone for Login */}
                  <div className="flex flex-col">
                    <input
                      {...register("email")}
                      placeholder="Email address"
                      className={inputStyle}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password for Login */}
                  <div className="flex flex-col">
                    <input
                      {...register("password")}
                      placeholder="Password"
                      type="password"
                      className={inputStyle}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                /* Signup Form Fields */
                <>
                  {/* First Name and Last Name in Row - Stack on mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <input
                        {...register("firstName")}
                        placeholder="First name"
                        className={inputStyle}
                      />
                      {signupErrors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupErrors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <input
                        {...register("lastName")}
                        placeholder="Last name"
                        className={inputStyle}
                      />
                      {signupErrors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {signupErrors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <input
                      {...register("email")}
                      placeholder="Email address"
                      type="email"
                      className={inputStyle}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <input
                      {...register("phoneNumber")}
                      placeholder="Phone number"
                      type="tel"
                      className={inputStyle}
                    />
                    {signupErrors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupErrors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <input
                      {...register("password")}
                      placeholder="Password"
                      type="password"
                      className={inputStyle}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="flex flex-col">
                    <input
                      {...register("confirmPassword")}
                      placeholder="Confirm password"
                      type="password"
                      className={inputStyle}
                    />
                    {signupErrors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {signupErrors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Submit Button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!isValid || submitting}
                className={`w-full py-3 mt-4 lg:mt-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2
                  ${
                    success
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-700"
                  }
                  ${
                    !isValid || submitting
                      ? "opacity-70 cursor-not-allowed"
                      : "shadow-md shadow-blue-500/50"
                  }
                  ${
                    darkMode
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600"
                      : "bg-gradient-to-r from-amber-800 to-amber-950 hover:from-blue-500 hover:to-amber-500 shadow-blue-500/40"
                  }
                `}
              >
                {submitting ? (
                  "Processing..."
                ) : success ? (
                  "Success!"
                ) : isLogin ? (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Log In</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </>
                )}
              </motion.button>

              {/* Forgot Password Link */}
              {isLogin && (
                <div className="text-center pt-2">
                  <a
                    href="#"
                    className={`text-sm font-medium hover:text-blue-500 transition-colors ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot Password?
                  </a>
                </div>
              )}
            </form>

            {/* Mode Switcher */}
            <p
              className={`text-sm mt-6 lg:mt-8 text-center ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {isLogin ? "Need an account?" : "Already have an account?"}
              <button
                onClick={toggleAuthMode}
                className="text-blue-600 ml-1 font-semibold hover:text-blue-500 transition-colors focus:outline-none"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          </div>

          {/* Footer */}
          <footer
            className={`pt-6 mt-6 border-t ${
              darkMode ? "border-gray-700" : "border-gray-200"
            } text-center`}
          >
            <p
              className={`text-xs ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              &copy; 2025 Ghana Cocoa Board (COCOBOD). All Rights Reserved.
            </p>
          </footer>
        </motion.div>

        {/* --- RIGHT PANEL: Isometric Illustration --- */}
        <div className="w-full lg:w-1/2">
          <IsometricPanel darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}