import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
interface CustomSelectProps {
  value: any;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  menuProps?: React.HTMLAttributes<HTMLDivElement>;
  error?: string;
  name: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  className,
  style,
  error,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative cursor-pointer`} style={style}>
      <label htmlFor={name} className="mb-2 block text-gray-100 capitalize">
        {name}
      </label>
      <div
        id={name}
        className={`placeholder:text-xl text-white bg-[#010820] py-3 px-2 ${
          isOpen ? "ring-[#0d288d]" : "ring-black"
        } ring-2 rounded-lg w-full duration-300 mb-5 flex justify-between`}
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
            className="absolute left-0 right-0 mt-1 bg-[--main-color] border bg-[#010820] border-[#0d288d] rounded-lg shadow-lg z-10 max-h-72 overflow-y-auto"
          >
            {options.map((option, index) => (
              <div
                key={index}
                className="cursor-pointer capitalize py-2 px-4 hover:bg-[#0d288d] bg-[#010820] duration-300 text-white"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
