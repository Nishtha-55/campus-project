import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FormInput from "@/components/FormInput";
import PrimaryButton from "@/components/PrimaryButton";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-foreground mb-2">
          Create Account
        </motion.h1>
        <motion.p variants={itemVariants} className="text-muted-foreground mb-8">
          Join Campus Lost & Found today
        </motion.p>

        <form className="space-y-6">
          <motion.div variants={itemVariants}>
            <FormInput label="Full Name" placeholder="Your name" required />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormInput
              label="College Email"
              type="email"
              placeholder="your@collegemail.com"
              required
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormInput label="Phone Number" placeholder="+1 (555) 000-0000" />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-border" required />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <span className="text-primary font-medium">Terms of Service</span>
              </span>
            </label>
          </motion.div>

          <motion.div variants={itemVariants}>
            <PrimaryButton type="submit" className="w-full justify-center">
              Create Account
            </PrimaryButton>
          </motion.div>
        </form>

        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-sm text-muted-foreground"
        >
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
