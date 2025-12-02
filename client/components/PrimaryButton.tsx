import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  to?: string;
}

export default function PrimaryButton({
  children,
  loading = false,
  icon,
  variant = "primary",
  size = "md",
  className = "",
  to,
  onClick,
  ...props
}: PrimaryButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      navigate(to);
    }
    if (onClick) {
      onClick(e);
    }
  };

  const variants = {
    primary:
      "bg-primary hover:bg-blue-700 text-primary-foreground shadow-lg hover:shadow-xl",
    secondary: "bg-secondary hover:bg-accent/20 text-foreground",
    outline: "border-2 border-primary text-primary hover:bg-primary/5",
    ghost: "text-foreground hover:bg-secondary",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading || props.disabled}
      className={`${sizes[size]} rounded-md font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 50 50">
          <circle
            className="opacity-30"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
          />
          <circle
            className="opacity-100"
            cx="25"
            cy="25"
            r="20"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            strokeDasharray="100"
            strokeDashoffset="75"
          />
        </svg>
      )}
      {icon && !loading && icon}
      {children}
    </motion.button>
  );
}
