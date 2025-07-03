import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

interface Props {
  state: string | null;
  value: string | null;
  name: string;
  title: string;
  error?: string;
  width?: number;
  height?: number;
  half?: boolean;
  setImageData: (value: string) => void;
  setFieldValue: (name: string, value: any) => void;
}

import { ChangeEvent } from "react";
import { handleChangeImage } from "@/app/utils/handleChangeImage";



const ImageInputAndDisplay = ({
  state,
  value,
  title,
  name,
  width = 100,
  height = 100,
  half = false,
  setImageData,
  setFieldValue,
  error,
}: Props) => {
  return (
    <div
      className={`flex flex-col justify-between ${
        half ? "lg:col-span-1 col-span-2" : "col-span-2"
      }`}
    >
      <div className="mb-10">
        <Image
          src={
            typeof state === "string" && state
              ? state
              : value
              ? value
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt={"upload image"}
          height={height}
          width={width}
          className="mx-auto"
        />
      </div>
      <FileUploadInput
        title={title}
        name={title}
        handleChangeImage={(e) =>
          handleChangeImage(e, name, setImageData, setFieldValue)
        }
        imageData={state}
        error={error}
      />
    </div>
  );
};

export default ImageInputAndDisplay;

const FileUploadInput = ({
  imageData,
  handleChangeImage,
  handleDeleteImage,
  half,
  display,
  title,
  multiple,
  name,
  error,
}: {
  imageData: string | ArrayBuffer | null;
  handleChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteImage?: () => void;
  half?: boolean;
  display?: boolean;
  multiple?: boolean;
  title: string;
  name?: string;
  error?: string | string[] | never[] | undefined;
}) => {
  return (
    <>
      <div
        className={`${half ? "sm:col-span-1 col-span-2" : "col-span-2"} ${
          display ? "grid" : "my-5"
        } grid-cols-10 justify-center items-center`}
      >
        <label
          htmlFor={name}
          className="bg-black col-span-7 w-full cursor-pointer rounded-lg mx-auto px-5 py-1 flex flex-col gap-3 justify-center items-center"
        >
          <input
            type="file"
            name={name}
            id={name}
            className="hidden"
            onChange={handleChangeImage}
            multiple={multiple}
          />
          <FaPlus className="text-2xl text-white" />
          <p className="text-white capitalize text-center">{title}</p>
        </label>
        {imageData && typeof imageData === "string" && display && (
          <>
            <div className="col-span-2 relative w-fit mx-auto">
              <Image
                src={imageData}
                alt="product image"
                width={50}
                height={50}
              />
            </div>
            <div
              className="col-span-1 cursor-pointer w-10 h-10 flex justify-center items-center rounded-md backdrop-blur-xl"
              onClick={handleDeleteImage}
            >
              <FaTrash />
            </div>
          </>
        )}
        {error && Array.isArray(error) ? (
          error.map((err, index) => (
            <p className="text-red-500 text-xs mt-1" key={index}>
              {error}
            </p>
          ))
        ) : (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>
    </>
  );
};
