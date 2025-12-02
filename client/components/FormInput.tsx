import { forwardRef, InputHTMLAttributes } from "react";
import { motion } from "framer-motion";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helper, className = "", ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-2"
      >
        {label && (
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
            error ? "border-destructive focus:ring-destructive" : ""
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-destructive">{error}</span>}
        {helper && <span className="text-xs text-muted-foreground">{helper}</span>}
      </motion.div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
