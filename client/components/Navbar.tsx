import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export default function Navbar({ isAuthenticated = false, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = isAuthenticated
    ? [
        { label: "Home", path: "/dashboard" },
        { label: "Report Lost", path: "/report-lost" },
        { label: "Report Found", path: "/report-found" },
        { label: "Search Items", path: "/search" },
      ]
    : [];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            >
              LF
            </motion.div>
            <span className="hidden sm:inline font-bold text-lg text-foreground">
              Campus Lost & Found
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isAuthenticated && (
              <>
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path}>
                    <motion.span
                      className={`text-sm font-medium transition-colors ${
                        isActive(link.path)
                          ? "text-primary border-b-2 border-primary pb-2"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      whileHover={{ y: -2 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 hover:bg-secondary rounded-md transition-colors"
                  >
                    <User size={20} className="text-foreground" />
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={onLogout}
                  className="p-2 hover:bg-secondary rounded-md transition-colors"
                >
                  <LogOut size={20} className="text-foreground" />
                </motion.button>
              </>
            ) : null}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-md transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 border-t border-border"
          >
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <div
                  className={`py-2 px-4 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-primary bg-secondary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
