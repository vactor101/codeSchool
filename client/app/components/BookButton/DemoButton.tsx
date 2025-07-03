"use client";
import React, { useState } from "react";
import TrialForm from "./TrialForm"; 
import {
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";

const DemoButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleSubmit = async (values: {
    kidName: string;
    mobileNumber: string;
    age: string;
  }) => {
    // Handle form submission
    console.log(values);
    setOpen(false);
  };

  return (
    <>
      <button
        className="bg-transparent text-[#E290AD] border-2 border-[#E290AD] px-6 py-3 rounded-lg font-medium 
        hover:bg-[#E290AD]/10 hover:text-[#E290AD] dark:hover:text-[#E290AD] 
        focus:bg-[#E290AD]/20 focus:outline-none focus:ring-2 focus:ring-[#E290AD]/50 
        active:bg-[#E290AD]/20 active:scale-95 
        transition-all duration-200 ease-in-out 
        shadow-sm hover:shadow-md"
        onClick={handleOpen} // Simply open the dialog on click
      >
        Book a Demo Class
      </button>

      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-white rounded-xl shadow-xl"
        size="md"
      >
      <DialogHeader className="bg-[#E290AD] text-white p-6 rounded-t-xl">
          <h2 className="text-xl font-bold">Book Your Free Trial</h2>
        </DialogHeader>
        <DialogBody className="p-6">
          <TrialForm 
            onSubmit={handleSubmit} 
            onCancel={handleOpen} 
          />
        </DialogBody>
      </Dialog>
    </>
  );
};

export default DemoButton;