import ButtonSvg from "@/public/assests/svg/ButtonSvg";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  px?: string;
  white?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  rounded?: "sm" | "md" | "lg" | "full";
}

const Button = ({ 
  className = "", 
  href, 
  onClick, 
  children, 
  px = "px-8", 
  white = false, 
  disabled = false,
  type = "button",
  fullWidth = false,
  rounded = "md"
}: Props) => {
  // Base classes
  const baseClasses = `relative inline-flex items-center justify-center h-12 transition-all duration-200 w-full `;

  // Color classes
  const colorClasses = white 
    ? "text-n-8 bg-white hover:bg-gray-50 focus:bg-gray-100 border border-gray-200" 
    : "text-white bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 focus:from-purple-800 focus:to-pink-700";

  // Rounded classes
  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  }[rounded];

  // State classes
  const stateClasses = disabled 
    ? "opacity-70 cursor-not-allowed grayscale-[30%]" 
    : "cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]";

  // Combine all classes
  const classes = `button ${baseClasses} ${colorClasses} ${roundedClasses} ${stateClasses} ${px} ${className}`;
  const spanClasses = "relative z-10 flex items-center gap-2 font-medium";

  const renderButton = () => (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className={spanClasses}>
        {children}
      </span>
      {ButtonSvg(white)}
    </motion.button>
  );

  const renderLink = () => (
    <motion.a
      href={disabled ? undefined : href}
      className={classes}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <span className={spanClasses}>
        {children}
      </span>
      {ButtonSvg(white)}
    </motion.a>
  );

  return href ? renderLink() : renderButton();
};

export default Button;