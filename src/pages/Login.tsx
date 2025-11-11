import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LogIn, UserPlus, Sparkles } from "lucide-react"; // Import correct icons for button
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// --- Validation and Types (Unchanged, as they are professional) ---
const AuthSchema = z
  .object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.confirmPassword ||
      data.password === data.confirmPassword ||
      !data.password,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type AuthFormData = z.infer<typeof AuthSchema>;

// --- Main Component ---
export default function AuthCard() {
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // For detecting Tailwind's 'dark' class

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  // Listen for theme changes from parent/document (Professional practice for dynamic themes)
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setDarkMode(isDark);
    };

    // Check initial theme
    checkTheme();

    // Observe theme changes (e.g., if a navbar button toggles the 'dark' class)
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
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      reset({ name: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => setSuccess(false), 2000);
      console.log(isLogin ? "Logging in with" : "Signing up with", data);
      // In a real app, you would dispatch an API call here.
    }, 800);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    reset(); // Clear form when switching modes for a clean slate
  };

  // --- Styles for Reusability and Professional Look ---
  const inputStyle = `
    w-full px-4 py-3 border rounded-lg focus:ring-2 transition-all duration-200
    ${
      darkMode
        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500/50 focus:border-blue-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500/30 focus:border-blue-500"
    }
  `;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex items-center justify-center p-4 sm:p-6 ${
        darkMode
          ? "bg-gray-900 text-white" // Clean dark background
          : "bg-gray-50 text-gray-900" // Clean light background
      }`}
    >
      {/* Subtle Background Effect (Less busy than floating blobs) */}
      <div className="absolute inset-0 z-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none">
        <div className="absolute inset-0 bg-repeat bg-[size:20px_20px] [background-image:linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
      </div>

      {/* Card: Wider, more substantial, less transparent for better focus */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full max-w-sm sm:max-w-md p-8 shadow-2xl rounded-xl relative z-10 transition-all duration-300
        ${
          darkMode
            ? "bg-gray-800 border border-gray-700" // Solid dark card
            : "bg-white border border-gray-200" // Solid light card
        }`}
      >
        <div className="flex flex-col items-center text-center">
          {/* Header Icon/Logo - Use a more professional color */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
            className="mb-6 rounded-full p-3 bg-blue-500/10"
          >
            <Sparkles className="w-8 h-8 text-blue-500" />
          </motion.div>

          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">
            {isLogin ? "Sign In" : "Get Started"}
          </h1>
          <p className="text-sm mb-8 font-light">
            {isLogin
              ? "Welcome back! Enter your credentials to access your account."
              : "Create your account in seconds to unlock all features."}
          </p>

          {/* Form */}
          <form
            className="w-full space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Name Input */}
            {!isLogin && (
              <div className="flex flex-col">
                <input
                  {...register("name")}
                  placeholder="Full Name"
                  className={inputStyle}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 font-medium">
                    {errors.name.message}
                  </p>
                )}
              </div>
            )}

            {/* Email Input */}
            <div className="flex flex-col">
              <input
                {...register("email")}
                placeholder="Email Address"
                type="email"
                className={inputStyle}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className={inputStyle}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            {!isLogin && (
              <div className="flex flex-col">
                <input
                  {...register("confirmPassword")}
                  placeholder="Confirm Password"
                  type="password"
                  className={inputStyle}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}

            {/* Submit Button: Solid, professional color, proper icons */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!isValid || submitting}
              className={`w-full py-3 mt-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2
                ${
                  success
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-700"
                }
                ${
                  !isValid || submitting
                    ? "opacity-70 cursor-not-allowed"
                    : "shadow-lg shadow-blue-500/50"
                }
              `}
            >
              {submitting ? (
                "Processing..."
              ) : success ? (
                "Success! 🎉"
              ) : isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Sign Up</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Mode Switcher */}
          <p className="text-sm mt-6 text-center">
            {isLogin ? "Need an account?" : "Already registered?"}
            <button
              onClick={toggleAuthMode}
              className="text-blue-500 ml-1 font-medium hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-md p-1 -m-1"
            >
              {isLogin ? "Create Account" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Footer (Moved inside the card for better composition) */}
        <footer className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; 2025 Feedback and Grievance Redress Mechanism.
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
