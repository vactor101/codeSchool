"use client";

import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import TrialForm from "./TrialForm";

const BookButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSubmit = async (values: {
    kidName: string;
    mobileNumber: string;
    age: string;
  }) => {
    // Handle form submission here
    console.log(values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-[110px] right-8 z-50 group">
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full bg-[#E290AD] shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-xl"
          onClick={handleOpen}
          aria-label="Book a free trial"
        >
          <FaCheckCircle className="text-3xl text-white" />
        </div>

        {/* Tooltip that appears on hover */}
        <div className="absolute bottom-20 right-4 w-48 bg-white rounded-lg shadow-xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <p className="text-sm font-semibold text-gray-800 text-center">
            Book Free Trial
          </p>
          <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
        </div>
      </div>

      {/* Registration Dialog */}
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-white rounded-xl shadow-xl"
        size="md"
        style={{ maxWidth: "500px", width: "min(500px, 90vw)" }}
      >
        <DialogHeader className="bg-[#E290AD] text-white p-6 rounded-t-xl">
          <h2 className="text-xl font-bold">Book Your Free Trial</h2>
        </DialogHeader>

        <DialogBody className="p-6 max-h-[60vh] overflow-y-auto">
          <TrialForm onSubmit={handleSubmit} onCancel={handleOpen} />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BookButton;