import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Alert,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Inputs from "../form inputs/Inputs";
import { useAddKidProfileMutation } from "@/redux/features/kids/kidApi";

const validationSchema = yup.object({
  kidName: yup.string().required("Child's name is required"),
  mobileNumber: yup
    .string()
    .matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/, {
      message: "Please enter a valid phone number",
    })
    .required("Phone number is required"),
  age: yup.number().required("Age is required").min(6, "Minimum age is 6"),
});

const initialValues = {
  kidName: "",
  mobileNumber: "",
  age: "",
};

const Message = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [addKid, { isLoading }] = useAddKidProfileMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const kidData = { data: values };
        await addKid(kidData).unwrap();
        resetForm();
        setOpen(false);
        setOpenAlert(true);
      } catch (error) {
        console.error("Submission error:", error);
      }
    },
  });

  const handleOpen = () => {
    if (!open) {
      formik.resetForm();
    }
    setOpen(!open);
  };

  useEffect(() => {
    if (openAlert) {
      const timer = setTimeout(() => setOpenAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [openAlert]);

  // Tailwind classes
  const labelClass = "mb-2 block text-gray-800 font-medium text-sm";
  const inputClass = `
    w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200
    text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2
    focus:ring-[#E290AD] focus:border-transparent transition-all
    duration-200 hover:border-[#E290AD]
  `;

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-white rounded-xl shadow-xl"
        size="md"
        style={{ maxWidth: "500px", width: "min(500px, 90vw)" }}
      >
        <DialogHeader className="bg-[#E290AD] text-white p-6 rounded-t-xl">
          <h2 className="text-xl font-bold">Get Started With Our Course</h2>
        </DialogHeader>
        
        <DialogBody className="p-6 max-h-[60vh] overflow-y-auto">
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
              handlerChange={(e) => {
                const value = parseInt(e.target.value);
                formik.setFieldValue('age', isNaN(value) ? '' : value);
              }}
              value={formik.values.age}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="6+ years"
              min={6}
            />
          </form>
        </DialogBody>
        
        <DialogFooter className="bg-gray-50 border-t border-gray-200 p-4 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="px-6 py-2 hover:bg-red-50 transition-colors"
            >
              Cancel
            </Button>
            <Button
              variant="gradient"
              style={{ background: '#E290AD' }}
              onClick={() => formik.handleSubmit()}
              disabled={!formik.isValid || isLoading}
              className="px-6 py-2 flex items-center gap-2 hover:bg-[#E290AD]/90 focus:bg-[#E290AD] transition-colors"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Submitting...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
      
      <Alert
        open={openAlert}
        color="green"
        className="top-32 right-2 fixed w-fit min-w-[300px] max-w-[90vw] z-50"
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        onClose={() => setOpenAlert(false)}
      >
        <Typography color="white" className="font-bold">
          Registration Successful!
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          We will contact you soon with course details.
        </Typography>
      </Alert>
    </>
  );
};

export default Message;