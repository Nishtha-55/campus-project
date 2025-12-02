import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import { ArrowLeft, Lightbulb } from "lucide-react";

interface PlaceholderProps {
  title?: string;
  subtitle?: string;
  isAuthenticated?: boolean;
}

export default function Placeholder({
  title,
  subtitle,
  isAuthenticated = false,
}: PlaceholderProps) {
  const location = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  const pathTitles: Record<string, { title: string; subtitle: string }> = {
    "/report-found": {
      title: "Report Found Item",
      subtitle: "Help us return lost items to their owners",
    },
    "/search": {
      title: "Search & Filter",
      subtitle: "Find items reported lost or found on campus",
    },
    "/profile": {
      title: "My Profile",
      subtitle: "Manage your account and settings",
    },
    "/claims": {
      title: "My Claims",
      subtitle: "Track your item claims and status",
    },
    "/admin": {
      title: "Admin Dashboard",
      subtitle: "Manage items and claims",
    },
    "/forgot-password": {
      title: "Forgot Password",
      subtitle: "Reset your password",
    },
  };

  const pageInfo = pathTitles[location.pathname] || {
    title: title || "Coming Soon",
    subtitle: subtitle || "This page is being built",
  };

  return (
    <div className="min-h-screen bg-background">
      {isAuthenticated && (
        <Navbar isAuthenticated={true} onLogout={handleLogout} />
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
            transition={{ duration: 2, delay: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="p-4 bg-primary/10 rounded-full">
              <Lightbulb size={48} className="text-primary" />
            </div>
          </motion.div>

          <h1 className="text-4xl font-bold text-foreground mb-2">
            {pageInfo.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            {pageInfo.subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground text-sm">
              This page is currently under development. Check back soon!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <PrimaryButton variant="primary" icon={<ArrowLeft size={18} />} to={isAuthenticated ? "/dashboard" : "/"}>
                {isAuthenticated ? "Go to Dashboard" : "Go Home"}
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
