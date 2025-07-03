import Select from "react-select";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { transformToOptions } from "@/app/utils/transformToOptions";

const CustomSelectorAdv = ({
  loading,
  isMulti = false,
  data,
  handleChange,
  error,
  errorFetch,
  label,
  objLabel,
  objValue,
  isDisabled,
  isClearable = true,
  value,
  half,
  refetch,
}: {
  loading?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  isClearable?: boolean;
  half?: boolean;
  data: any[];
  handleChange: (value: any) => void;
  label: string;
  objLabel?: string;
  objValue?: string;
  error?: any;
  value?: any;
  errorFetch?: boolean;
  refetch?: () => Promise<any>;
}) => {
  let valueObj;
  let valueHandler;

  {
    if (
      typeof value !== "object" &&
      value !== undefined &&
      !loading &&
      !errorFetch
    ) {
      valueObj = data.find((val) => {
        if (objValue) {
          return val[objValue] === value;
        } else {
          return val === value;
        }
      });
    }

    if (typeof value !== "object" && value !== undefined) {
      if (valueObj) {
        if (objValue && objLabel) {
          valueHandler = {
            label:
              objLabel.split(".").length > 1
                ? objLabel
                    .split(".")
                    .reduce((acc, key) => acc && acc[key], valueObj)
                : valueObj[objLabel],
            value:
              objValue.split(".").length > 1
                ? objValue
                    .split(".")
                    .reduce((acc, key) => acc && acc[key], valueObj)
                : valueObj[objValue],
          };
        } else {
          valueHandler = {
            label: valueObj,
            value: valueObj,
          };
        }
      } else {
        valueHandler = null;
      }
    }
  }

  const dataCondation = loading
    ? []
    : errorFetch
    ? []
    : transformToOptions(data, objValue, objLabel);

  return (
    <div className={`${half ? "lg:col-span-1 col-span-2" : "col-span-2"} mb-5`}>
      <div className="flex justify-between items-center dark:text-white text-black">
        <label htmlFor={label} className="label">
          {label}
        </label>
        {refetch && (
          <button
            type="button"
            onClick={refetch}
            className="inline-block rounded text-black dark:text-white"
          >
            <FontAwesomeIcon
              icon={faRefresh}
              className={`${loading ? "animate-spin" : ""}`}
            />
          </button>
        )}
      </div>
      <Select
        options={dataCondation}
        isMulti={isMulti}
        isLoading={loading}
        inputId={label}
        onChange={handleChange}
        isDisabled={isDisabled}
        isClearable={isClearable}
        value={valueHandler || value}
        styles={{
          control: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: "transparent",
            borderWidth: "2px",
            borderColor: "white",
            borderRadius: "6px",
            padding: "0.5rem",
            minHeight: "37px",
            boxShadow: "none",
            color: "gray",
          }),
          menu: (provided: any) => ({
            ...provided,
            backgroundColor: "white",
            zIndex: 50,
            color: "black",
          }),
        }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default CustomSelectorAdv;
