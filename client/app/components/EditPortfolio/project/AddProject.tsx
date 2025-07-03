import { getChangedFields } from "@/app/utils/changedValue";
import {
  useAddCategoryMutation,
  useAddProjectMutation,
  useAddSkillMutation,
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
import Textarea from "../../UI/form/Textarea";
import Image from "next/image";
import portfolioImage from "@/public/assests/header-img-portfolio.svg";
import { AiOutlineCamera } from "react-icons/ai";
import CustomSelectorAdv from "../../UI/form/CustomSelectorAdv";

const AddProject = ({
  title,
  refetch,
}: {
  title: string;
  refetch: () => Promise<any>;
}) => {
  const [open, setOpen] = useState(false);

  const validationSchema = yup.object({
    name: yup.string().required("name is required"),
    description: yup.string().required("description is required"),
    link: yup.string().url().required("link is required"),
    image: yup.string().required("image is required"),
    categoryId: yup.string().required("category is required"),
  });

  const initialValues = {
    name: "",
    description: "",
    link: "",
    image: "",
    categoryId: "",
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
    validationSchema,
    onSubmit: async (values) => {
      const toastId = toast.loading("Project Is Adding...");
      try {
        await addProject({
          id: values.categoryId,
          data: {
            projects: [
              {
                name: values.name,
                description: values.description,
                link: values.link,
                image: values.image,
              },
            ],
          },
        }).unwrap();
        setOpen(false);
        await refetch();
        toast.dismiss(toastId);
        toast.success("Project Added successfully");
        resetForm();
      } catch (error: any) {
        toast.dismiss(toastId);
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
    },
  });

  const cancelAndRest = () => {
    resetForm();
    setOpen(false);
  };

  const [addProject] = useAddProjectMutation();
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
        className="w-fit px-3 my-16 text-black dark:text-white"
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
                    name="projectImage"
                    id="projectImage"
                    className="hidden"
                    onChange={imageHandler}
                    accept="image/png,image/jpg,image/jpeg,image/webp"
                  />
                  <label htmlFor="projectImage">
                    <div className="w-[30px] h-[30px] bg-blue-500 rounded-xl absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                      <AiOutlineCamera size={20} className="z-1" />
                    </div>
                  </label>
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
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
                error={errors.name}
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
                error={errors.link}
                labalClassName="capitalize text-black dark:text-white"
              />
              <Textarea
                handlerChange={handleChange}
                name={`description`}
                value={values.description}
                InputClassName={`${styles.input} placeholder:capitalize inline-block text-black dark:text-white`}
                label={`description`}
                placeholder={`description`}
                error={errors.description}
                labelClass="capitalize text-black dark:text-white"
              />
              <CustomSelectorAdv
                data={dataCate?.categories}
                error={errors.categoryId || errorCate?.data.message}
                handleChange={(value) => {
                  setFieldValue(
                    "categoryId",
                    value?.value.length > 0 ? value.value : ""
                  );
                }}
                label={"category"}
                loading={loadingCate || isFetchingCate}
                isClearable
                objLabel={`categoryName`}
                objValue="_id"
                value={values.categoryId}
                refetch={refetchCate}
                errorFetch={isErrorCate}
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

export default AddProject;
