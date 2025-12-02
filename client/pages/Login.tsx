import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, BookOpen } from "lucide-react";
import FormInput from "@/components/FormInput";
import PrimaryButton from "@/components/PrimaryButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In a real app, you would validate credentials here
      if (email && password) {
        localStorage.setItem("authToken", "demo-token");
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="w-40 h-40 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center text-white p-8 shadow-2xl">
              <div className="text-center">
                <BookOpen size={48} className="mb-2 mx-auto" />
                <div className="text-2xl font-bold">LF</div>
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-2 border-primary/20 rounded-3xl"
            />
          </motion.div>

          <h2 className="text-2xl font-bold text-foreground mt-8 text-center">
            Campus Lost & Found
          </h2>
          <p className="text-muted-foreground text-center mt-2 max-w-xs">
            Find and report lost items on campus easily and quickly
          </p>

          <motion.div className="mt-12 space-y-4 text-sm text-muted-foreground">
            {[
              "✓ Report lost or found items",
              "✓ Smart matching system",
              "✓ Secure transactions",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold text-foreground mb-2"
          >
            Sign In
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground mb-8"
          >
            Welcome back to Campus Lost & Found
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <FormInput
                label="Email Address"
                type="email"
                placeholder="your@collegemail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between text-sm"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-primary hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <PrimaryButton
                type="submit"
                loading={loading}
                icon={!loading && <Lock size={18} />}
                className="w-full"
              >
                {loading ? "Signing in..." : "Sign In"}
              </PrimaryButton>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="button"
                className="w-full px-6 py-3 border-2 border-primary text-primary rounded-md font-medium hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
              >
                <Mail size={18} />
                Sign in with College Email
              </button>
            </motion.div>
          </form>

          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-sm text-muted-foreground"
          >
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Sign up now
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
