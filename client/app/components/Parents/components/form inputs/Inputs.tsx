"use client";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
}: Props) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`${
        half ? "xl:col-span-1 col-span-2" : ""
      } mb-5 relative mx-auto`}
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
        />
        {type === "password" && (
          <FontAwesomeIcon
            icon={show ? faEyeSlash : faEye}
            onClick={() => setShow(!show)}
            className="cursor-pointer text-4xl text-black absolute top-1/2 -translate-y-1/2 right-[1%] hover:text-[--main-color] duration-300"
          />
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Inputs;
