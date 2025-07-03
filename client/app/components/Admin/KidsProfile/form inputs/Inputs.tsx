"use client";
import React, { useState } from "react";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  type: string;
  half?: boolean;
  InputClassName?: string;
  labalClassName?: string;
  handlerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  error?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const Inputs = ({
  name,
  label,
  type,
  placeholder,
  InputClassName = "",
  labalClassName = "",
  half,
  handlerChange,
  value,
  min,
  max,
  error,
  disabled = false,
}: Props) => {
  const [show, setShow] = useState(false);
  
  // Base styles
  const baseInputClasses = `
    w-full px-4 py-3 rounded-lg border
    focus:outline-none focus:ring-2 transition-all duration-200
    ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
  `;

  // Dynamic styles based on error state
  const dynamicInputClasses = error 
    ? 'border-red-500 focus:ring-red-300 focus:border-red-500'
    : 'border-gray-300 focus:ring-blue-300 focus:border-blue-500';

  // Combined classes
  const finalInputClasses = `${baseInputClasses} ${dynamicInputClasses} ${InputClassName}`;
  
  // Label classes
  const finalLabelClasses = `block mb-2 text-sm font-medium text-gray-700 ${labalClassName}`;

  return (
    <div className={`${half ? 'md:w-1/2' : 'w-full'} mb-5 relative`}>
      {label && (
        <label htmlFor={name} className={finalLabelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          id={name}
          name={name}
          type={
            type === "password" && !show
              ? "password"
              : type === "password" && show
              ? "text"
              : type
          }
          onChange={handlerChange}
          value={value}
          placeholder={placeholder}
          min={min}
          max={max}
          disabled={disabled}
          className={finalInputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        
        {/* Password visibility toggle (uncomment when icons are available) */}
        {/* {type === "password" && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label={show ? "Hide password" : "Show password"}
          >
            <FontAwesomeIcon
              icon={show ? faEyeSlash : faEye}
              className="text-gray-500 hover:text-blue-500 transition-colors"
            />
          </button>
        )} */}
      </div>

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Inputs;