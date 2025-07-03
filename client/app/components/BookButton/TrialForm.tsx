"use client";

import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Inputs from "../Admin/KidsProfile/form inputs/Inputs";
import { Button, Spinner } from "@material-tailwind/react";

interface TrialFormProps {
  onSubmit: (values: {
    kidName: string;
    mobileNumber: string;
    age: string;
  }) => Promise<void>;
  onCancel: () => void;
}

const validationSchema = yup.object({
  kidName: yup.string().required("Kid name is required"),
  mobileNumber: yup
    .string()
    .matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/, {
      message: "Please enter a valid phone number",
    })
    .required("Phone number is required"),
  age: yup.number().required("Age is required").min(6, "Minimum age is 6"),
});

const TrialForm: React.FC<TrialFormProps> = ({ onSubmit, onCancel }) => {
  const formik = useFormik({
    initialValues: {
      kidName: "",
      mobileNumber: "",
      age: "",
    },
    validationSchema,
    onSubmit,
  });

  // Tailwind classes
  const labelClass = "mb-2 block text-gray-800 font-medium text-sm";
  const inputClass = `
    w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200
    text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2
    focus:ring-[#E290AD] focus:border-transparent transition-all
    duration-200 hover:border-[#E290AD]
  `;

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Inputs
        type="text"
        name="kidName"
        label="Child's Name"
        handlerChange={formik.handleChange}
        value={formik.values.kidName}
        InputClassName={inputClass}
        labalClassName={labelClass}
        placeholder="Enter child's name"
      />

      <Inputs
        type="tel"
        name="mobileNumber"
        label="Parent's Phone Number"
        handlerChange={formik.handleChange}
        value={formik.values.mobileNumber}
        InputClassName={inputClass}
        labalClassName={labelClass}
        placeholder="+1234567890"
      />

      <Inputs
        type="number"
        name="age"
        label="Child's Age"
        handlerChange={formik.handleChange}
        value={formik.values.age}
        InputClassName={inputClass}
        labalClassName={labelClass}
        placeholder="6+ years"
        min={6}
      />

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          variant="text"
          color="red"
          onClick={onCancel}
          className="px-6 py-2 hover:bg-red-50 transition-colors"
        >
          Cancel
        </Button>
        <Button
          variant="gradient"
          style={{ background: '#E290AD' }} 
          color="purple"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className="px-6 py-2 flex items-center gap-2"
        >
          {formik.isSubmitting ? (
            <>
              <Spinner className="h-4 w-4" />
              Sending...
            </>
          ) : (
            "Book Now"
          )}
        </Button>
      </div>
    </form>
  );
};

export default TrialForm;