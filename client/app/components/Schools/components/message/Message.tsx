import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Alert,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect } from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import Inputs from "../form inputs/Inputs";
import Textarea from "../form inputs/Textarea";
import { useAddKidProfileMutation } from "@/redux/features/kids/kidApi";
const validationSchema = yup.object({
  kidName: yup.string().required("kidName is required"),
  mobileNumber: yup
    .string()
    .matches(/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}$/, {
      message: "Please enter a valid phone number",
    })
    .required("Phone number is required"),
  age: yup.number().required("Age is required"),
});

const initialValues = {
  kidName: "",
  mobileNumber: "",
  age: 0,
};

const Message = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  useEffect(() => {
    if (openAlert) {
      setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
    }
  }, [openAlert]);

  const [addKid, { isLoading }] = useAddKidProfileMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const kidData = { data: values };
      await addKid(kidData).unwrap();
      setOpen(false);
      setOpenAlert(true);
    },
  });
  const handleOpen = () => setOpen(!open);

  const labelClass = " mb-2 block text-white capitalize ";
  const inputClass =
    "placeholder:text-xl text-white py-3 px-2 focus:ring-purple-700 ring-2 ring-black rounded-lg placeholder:capitalize w-full outline-none duration-300";

  useEffect(() => {
    if (formik.values.age < 6) {
      formik.values.age = 6; 
    }
  }, [formik.values.age,formik.values]);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <Dialog
        open={open}
        handler={handleOpen}
        className="bg-black !max-w-[500px] !w-[min(500px,80vw)] !min-w-24"
      >
        <DialogHeader className="capitalize text-white sm:!text-2xl !text-lg">
          get started with our course
        </DialogHeader>
        <DialogBody className="h-[250px] overflow-y-auto">
          <form onSubmit={formik.handleSubmit}>
            <Inputs
              type="text"
              name="kidName"
              label="Kid Name"
              handlerChange={formik.handleChange}
              value={formik.values.kidName}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="kidName"
              error={formik.errors.kidName}
            />
            <Inputs
              type="text"
              name="mobileNumber"
              label="Phone Number"
              max={11}
              handlerChange={formik.handleChange}
              value={formik.values.mobileNumber}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="Phone Number"
              error={formik.errors.mobileNumber}
            />
            <Inputs
              type="number"
              name="age"
              label="age"
              handlerChange={formik.handleChange}
              value={formik.values.age}
              InputClassName={inputClass}
              labalClassName={labelClass}
              placeholder="age"
              error={formik.errors.age}
            />
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="purple"
            onClick={() => formik.handleSubmit()}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <Alert
        open={openAlert}
        color="blue"
        className="top-32 right-2 fixed w-fit min-w-[500px] z-50"
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
        onClose={() => setOpenAlert(false)}
      >
        <Typography color="white" className="text-start">
          Success
        </Typography>
        <Typography color="white" className="mt-2 font-normal">
          We Will Contact You Soon
        </Typography>
      </Alert>
    </>
  );
};

export default Message;
