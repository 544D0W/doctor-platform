import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Search, 
  AlertCircle, 
  X, 
  Eye, 
  EyeOff, 
  Lock, 
  CheckCircle2 
} from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search' | 'error' | 'password' | 'success';
  icon?: React.ReactNode;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'default', 
    icon, 
    label,
    helperText,
    errorMessage,
    successMessage,
    type = 'text',
    ...props 
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const getVariantClasses = () => {
      switch (variant) {
        case 'default':
          return "border-muted-300 bg-background text-foreground placeholder-muted-400 focus:ring-primary focus:border-primary";
        case 'search':
          return "pl-10 border-muted-200 bg-muted-50 text-foreground placeholder-muted-500 focus:bg-background focus:ring-primary-200 focus:border-primary-300";
        case 'error':
          return "border-destructive bg-destructive/10 text-destructive placeholder-destructive/70 focus:ring-destructive focus:border-destructive";
        case 'password':
          return "pl-10 border-muted-300 bg-background text-foreground placeholder-muted-400 focus:ring-primary focus:border-primary";
        case 'success':
          return "border-green-500 bg-green-50 text-green-700 placeholder-green-400 focus:ring-green-500 focus:border-green-500";
        default:
          return "";
      }
    };

    const renderIcon = () => {
      if (icon) return icon;
      
      switch (variant) {
        case 'search': 
          return <Search className="text-muted-400" />;
        case 'error': 
          return <AlertCircle className="text-destructive" />;
        case 'password':
          return <Lock className="text-muted-400" />;
        case 'success':
          return <CheckCircle2 className="text-green-500" />;
        default: 
          return null;
      }
    };

    const handlePasswordToggle = () => {
      setShowPassword(!showPassword);
    };

    const effectiveType = variant === 'password' 
      ? (showPassword ? 'text' : 'password') 
      : type;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label 
            className={cn(
              "block text-sm font-medium",
              variant === 'error' ? "text-destructive" : 
              variant === 'success' ? "text-green-600" : 
              "text-muted-700"
            )}
          >
            {label}
          </label>
        )}
        
        <div className="relative flex items-center">
          {renderIcon() && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
              {renderIcon()}
            </div>
          )}
          
          <input
            ref={ref}
            type={effectiveType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={cn(
              "block w-full rounded-md border px-3 py-2 text-sm shadow-subtle transition-all duration-200 ease-in-out",
              "focus:outline-none focus:ring-2 focus:ring-opacity-50",
              getVariantClasses(),
              renderIcon() && "pl-10",
              variant === 'password' && "pr-10",
              className
            )}
            {...props}
          />
          
          {variant === 'password' && (
            <button
              type="button"
              onClick={handlePasswordToggle}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-400 hover:text-muted-600" />
              ) : (
                <Eye className="h-4 w-4 text-muted-400 hover:text-muted-600" />
              )}
            </button>
          )}
        </div>

        <AnimatePresence>
          {(helperText || errorMessage || successMessage) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "text-xs mt-1 flex items-center gap-1",
                variant === 'error' ? "text-destructive" : 
                variant === 'success' ? "text-green-600" : 
                "text-muted-500"
              )}
            >
              {variant === 'error' && <AlertCircle className="h-3 w-3" />}
              {variant === 'success' && <CheckCircle2 className="h-3 w-3" />}
              {errorMessage || successMessage || helperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;