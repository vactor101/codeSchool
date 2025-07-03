"use client";
import React, { useState } from "react";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

interface Props {
  name: string;
  type: string;
  handlerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  label?: string;
  placeholder?: string;
  half?: boolean;
  disabled?: boolean;
  InputClassName?: string;
  labalClassName?: string;
  error?: any;
  min?: number;
  max?: number;
}

const Inputs = ({
  name,
  label,
  type,
  placeholder,
  InputClassName,
  labalClassName,
  half,
  handlerChange,
  value,
  min,
  max,
  error,
  disabled,
}: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`${
        half ? "lg:col-span-1 col-span-2" : "col-span-2"
      } mb-5 relative`}
    >
      {label && (
        <label htmlFor={name} className={`${labalClassName}`}>
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
          maxLength={max}
          className={`${InputClassName}`}
          disabled={disabled}
        />
        {type === "password" &&
          (show ? (
            <RiEyeCloseLine
              onClick={() => setShow(!show)}
              className={`cursor-pointer text-xl text-n-main absolute top-1/2 -translate-y-1/2 right-[2%] hover:text-n-sub-main duration-300`}
            />
          ) : (
            <RiEyeLine
              onClick={() => setShow(!show)}
              className={`cursor-pointer text-xl text-n-main absolute top-1/2 -translate-y-1/2 right-[2%] hover:text-n-sub-main duration-300`}
            />
          ))}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Inputs;
