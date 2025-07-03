import { getChangedFields } from "@/app/utils/changedValue";
import { useEditPortfolioMutation } from "@/redux/features/portfolio/portfolioApi";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Inputs from "../../UI/form/Inputs";
import { styles } from "@/app/styles/style";

const EditGeneralInfo = ({
  title,
  data,
  refetch,
}: {
  title: string;
  data: any;
  refetch: () => Promise<any>;
}) => {
  const [open, setOpen] = useState(false);

  const initialValues = {
    userName: data.userName,
    positions: data.positions,
    githubLink: data.githubLink,
    linkedinLink: data.linkedinLink,
    instagramLink: data.instagramLink,
    facebookLink: data.facebookLink,
    phoneNumber: data.phoneNumber,
  };

  const { handleSubmit, values, handleChange, resetForm, setFieldValue } =
    useFormik({
      initialValues,
      onSubmit: async (values) => {
        const changedValues = getChangedFields(initialValues, values);
        const fields = Object.entries(changedValues);

        if (fields.length > 0) {
          const toastId = toast.loading("Contact Info Is Updating...");
          try {
            await editPortfolio(changedValues).unwrap();
            setOpen(false);
            await refetch();
            toast.dismiss(toastId);
            toast.success("Contact updated successfully");
          } catch (error: any) {
            toast.dismiss(toastId);
            if (error.data) {
              toast.error(error.data.message);
            } else {
              toast.error("Something went wrong, please try again");
            }
          }
        } else {
          toast.error("No changes detected, nothing to update");
        }
      },
    });

  const cancelAndRest = () => {
    resetForm();
    setOpen(false);
  };

  const [editPortfolio] = useEditPortfolioMutation();
  const [positions, setPositions] = useState<(string | null)[]>(data.positions);

  const handleAddPosition = () => {
    setPositions((prev) => [...prev, null]);
  };

  const handleDeletePosition = (value: number) => {
    const res = positions.filter((val, _, arr) => arr.indexOf(val) !== value);
    setPositions(res);
  };
  return (
    <>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        variant="gradient"
        color="blue"
        className="w-full px-1"
      >
        {title}
      </Button>
      <Dialog open={open} handler={setOpen} className="bg-white dark:bg-black">
        <DialogHeader className="text-black dark:text-white">
          {title}
        </DialogHeader>
        <DialogBody className="overflow-auto h-96">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-5 mb-10">
              <Inputs
                handlerChange={(e) =>
                  setFieldValue(
                    "userName",
                    e.target.value.split(" ").join("-").toLowerCase()
                  )
                }
                name="userName"
                type="text"
                value={values.userName}
                InputClassName={`${styles.input} placeholder:capitalize text-black dark:text-white`}
                label="userName"
                placeholder="userName"
                labalClassName="capitalize text-black dark:text-white"
              />
              <Inputs
                handlerChange={handleChange}
                name="phoneNumber"
                type="text"
                value={values.phoneNumber}
                InputClassName={`${styles.input} placeholder:capitalize text-black dark:text-white`}
                label="phone Number"
                max={11}
                placeholder="phone Number"
                labalClassName="capitalize text-black dark:text-white"
              />
              <Inputs
                handlerChange={handleChange}
                name="githubLink"
                type="text"
                value={values.githubLink}
                InputClassName={`${styles.input} placeholder:capitalize text-black dark:text-white`}
                label={`githubLink`}
                labalClassName="capitalize text-black dark:text-white"
                placeholder={`githubLink`}
              />
              <Inputs
                handlerChange={handleChange}
                name="facebookLink"
                type="text"
                value={values.facebookLink}
                InputClassName={`${styles.input} placeholder:capitalize text-black dark:text-white`}
                label={`facebookLink`}
                labalClassName="capitalize text-black dark:text-white"
                placeholder={`facebookLink`}
              />
              <Inputs
                handlerChange={handleChange}
                name="instagramLink"
                type="text"
                value={values.instagramLink}
                InputClassName={`${styles.input} placeholder:capitalize text-black dark:text-white`}
                label={`instagramLink`}
                labalClassName="capitalize text-black dark:text-white"
                placeholder={`instagramLink`}
              />
              <Inputs
                handlerChange={handleChange}
                name="linkedinLink"
                type="text"
                value={values.linkedinLink}
                InputClassName={`${styles.input} placeholder:capitalize text-black dark:text-white`}
                label={`linkedinLink`}
                labalClassName="capitalize text-black dark:text-white"
                placeholder={`linkedinLink`}
              />
              <div className="col-span-2">
                <Button
                  onClick={handleAddPosition}
                  color="light-blue"
                  className="block"
                >
                  add position
                </Button>
                {positions.map((_, index) => (
                  <div key={index} className="mt-3">
                    <Inputs
                      handlerChange={handleChange}
                      name={`positions[${index}]`}
                      type="text"
                      value={values.positions[index]}
                      InputClassName={`${styles.input} placeholder:capitalize inline-block`}
                      label={`positions ${index + 1}`}
                      placeholder={`positions ${index + 1}`}
                      labalClassName="capitalize text-black dark:text-white"
                    />
                    <Button
                      onClick={() => handleDeletePosition(index)}
                      color="red"
                      className="block ml-auto w-fit"
                    >
                      delete position
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={cancelAndRest}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleSubmit()}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
        <Toaster position="top-center" reverseOrder={false} />
      </Dialog>
    </>
  );
};

export default EditGeneralInfo;
