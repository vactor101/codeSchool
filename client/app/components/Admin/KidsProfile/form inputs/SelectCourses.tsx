import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";

interface CourseOption {
  _id: string;
  name: string;
  thumbnail: { url: string };
}

interface CustomSelectProps {
  value?: string; // الآن القيمة هي id
  options: CourseOption[];
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  menuProps?: React.HTMLAttributes<HTMLDivElement>;
  error?: string;
  name: string;
}

const CoursesSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  className,
  style,
  error,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // إيجاد الدورة المحددة بناءً على الـ id
  const selectedCourse = options.find((course) => course._id === value);

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
        <span>{selectedCourse ? selectedCourse.name : "Select a course"}</span>{" "}
        {/* عرض اسم الدورة */}
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
            {options.map((option) => (
              <div
                key={option._id}
                className="cursor-pointer py-2 px-4 hover:bg-[#0d288d] bg-[#010820] duration-300 text-white flex gap-5 items-center"
                onClick={() => {
                  onChange(option._id);
                  setIsOpen(false);
                }}
              >
                <Image
                  src={option.thumbnail.url}
                  alt="course image"
                  width={50}
                  height={50}
                />
                <span>{option.name}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoursesSelect;
