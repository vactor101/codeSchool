import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
interface CustomSelectProps {
  value: string;
  options: { name: string }[];
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  menuProps?: React.HTMLAttributes<HTMLDivElement>;
  error?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  className,
  style,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} style={style}>
      <div
        className="cursor-pointer border text-gray-400 border-gray-700 bg-[--main-color] py-4 px-4 rounded flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || "Select an option"}</span>
        <span className="ml-2">&#9660;</span>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 right-0 mt-2 bg-[--main-color] border border-gray-700 rounded shadow-lg z-10 max-h-72 overflow-y-scroll"
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer py-2 px-4 hover:bg-gray-800 duration-300 text-gray-500"
                onClick={() => handleSelect(option.name)}
              >
                {option.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
