import React from "react";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  half?: boolean;
  InputClassName?: string;
  labelClass: string;
  handlerChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  error?: string;
  min?: string;
  max?: string;
}

const Textarea = ({
  name,
  label,
  InputClassName,
  labelClass,
  handlerChange,
  value,
  error,
  half,
  placeholder,
}: Props) => {
  return (
    <div className={`${half ? "xl:col-span-1 col-span-2" : "col-span-2"}`}>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handlerChange}
        placeholder={placeholder}
        className={`${InputClassName}`}
      ></textarea>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;
