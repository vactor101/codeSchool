import { getChangedFields } from "@/app/utils/changedValue";
import {
  useAddSkillMutation,
  useEditSkillMutation,
} from "@/redux/features/portfolio/portfolioApi";
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
import * as yup from "yup";

const EditSkill = ({
  title,
  skill,
  refetch,
}: {
  title: string | React.ReactNode;
  skill: any;
  refetch: () => Promise<any>;
}) => {
  const [open, setOpen] = useState(false);

  const initialValues = {
    name: skill.name,
    percentage: skill.percentage,
  };

  const {
    handleSubmit,
    values,
    handleChange,
    resetForm,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const changedValues = getChangedFields(initialValues, values);
      const fields = Object.entries(changedValues);
      if (fields.length > 0) {
        const toastId = toast.loading("Skill Is Updating...");
        try {
          await editSkill({ data: changedValues, id: skill._id }).unwrap();
          setOpen(false);
          await refetch();
          toast.dismiss(toastId);
          toast.success("Skill Updated successfully");
          resetForm();
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

  const [editSkill] = useEditSkillMutation();

  return (
    <>
      <Button
        onClick={() => setOpen((prev) => !prev)}
        variant="gradient"
        color="blue"
        className="w-fit px-3 py-2 text-black dark:text-white"
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
                handlerChange={handleChange}
                name={`name`}
                type="text"
                value={values.name}
                InputClassName={`${styles.input} placeholder:capitalize inline-block text-black dark:text-white`}
                label={`name`}
                placeholder={`name`}
                labalClassName="capitalize text-black dark:text-white"
              />
              <Inputs
                handlerChange={handleChange}
                name={`percentage`}
                type="number"
                value={values.percentage}
                InputClassName={`${styles.input} placeholder:capitalize inline-block text-black dark:text-white`}
                label={`percentage`}
                placeholder={`percentage`}
                labalClassName="capitalize text-black dark:text-white"
              />
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

export default EditSkill;
