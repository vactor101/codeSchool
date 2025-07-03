import { getChangedFields } from "@/app/utils/changedValue";
import {
  useAddSkillMutation,
  useEditCategoryMutation,
  useEditProjectMutation,
  useEditSkillMutation,
  useGetAllCategoriesQuery,
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
import CustomSelectorAdv from "../../UI/form/CustomSelectorAdv";
import Textarea from "../../UI/form/Textarea";
import { AiOutlineCamera } from "react-icons/ai";
import Image from "next/image";

const EditProject = ({
  title,
  project,
  categoryId,
  refetch,
}: {
  title: string | React.ReactNode;
  project: any;
  categoryId: string;
  refetch: () => Promise<any>;
}) => {
  const [open, setOpen] = useState(false);

  const initialValues = {
    name: project.name,
    description: project.description,
    link: project.link,
    image: project.image.url,
    categoryId,
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
      const changedValues = getChangedFields(
        {
          name: initialValues.name,
          description: initialValues.description,
          image: initialValues.image,
          link: initialValues.link,
        },
        {
          name: values.name,
          description: values.description,
          image: values.image,
          link: values.link,
        }
      );
      const fields = Object.entries(changedValues);
      if (fields.length > 0 || values.categoryId !== initialValues.categoryId) {
        const toastId = toast.loading("Project Is Updating...");
        try {
          await editProject({
            data: { ...changedValues },
            categoryId: values.categoryId,
            projectId: project._id,
          }).unwrap();
          await refetch();
          cancelAndRest();
          toast.dismiss(toastId);
          toast.success("Project Updated successfully");
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

  const [editProject] = useEditProjectMutation();
  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("hello");

    const file = e.target.files?.[0];
    if (!file) {
      toast.error("Please select an image file");
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        setFieldValue("image", avatar);
      }
    };
    fileReader.readAsDataURL(file);
  };

  const {
    data: dataCate,
    isLoading: loadingCate,
    isError: isErrorCate,
    isFetching: isFetchingCate,
    error: errorCate,
    refetch: refetchCate,
  } = useGetAllCategoriesQuery<any>(undefined);

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
              <div className="flex justify-center col-span-2">
                <div className="relative">
                  {values.image ? (
                    <Image
                      src={values.image}
                      alt=""
                      width={256}
                      height={144}
                      className="cursor-pointer"
                    />
                  ) : (
                    <div className="h-36 w-64 bg-gray-600 rounded mx-auto"></div>
                  )}
                  <input
                    type="file"
                    name="projectImageEdit"
                    id="projectImageEdit"
                    className="hidden"
                    onChange={imageHandler}
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                  />
                  <label htmlFor="projectImageEdit">
                    <div className="w-[30px] h-[30px] bg-blue-500 rounded-xl absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                      <AiOutlineCamera size={20} className="z-1" />
                    </div>
                  </label>
                </div>
              </div>
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
                name={`link`}
                type="text"
                value={values.link}
                InputClassName={`${styles.input} placeholder:capitalize inline-block text-black dark:text-white`}
                label={`link`}
                placeholder={`link`}
                labalClassName="capitalize text-black dark:text-white"
              />
              <Textarea
                handlerChange={handleChange}
                name={`description`}
                value={values.description}
                InputClassName={`${styles.input} placeholder:capitalize inline-block text-black dark:text-white`}
                label={`description`}
                placeholder={`description`}
                labelClass="capitalize text-black dark:text-white"
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

export default EditProject;
