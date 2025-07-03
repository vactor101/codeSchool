import { useAddPortfolioMutation } from "@/redux/features/portfolio/portfolioApi";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Inputs from "../UI/form/Inputs";
import { styles } from "../../../app/styles/style";
import Textarea from "../UI/form/Textarea";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import avatarIcon from "../../../public/assests/avatar.png";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { handleChangeImage } from "@/app/utils/handleChangeImage";
import portfolioImage from "@/public/assests/header-img-portfolio.svg";
import { Button } from "@material-tailwind/react";

const AddPortfolio = ({ user }: { user: any }) => {
  const [addPortfolio] = useAddPortfolioMutation();
  const [positions, setPositions] = useState<(string | null)[]>([]);

  const handleAddPosition = () => {
    setPositions((prev) => [...prev, null]);
  };

  const handleDeletePosition = (value: number) => {
    const res = positions.filter((val, _, arr) => arr.indexOf(val) !== value);
    setPositions(res);
  };

  const router = useRouter();
  const validationSchema = Yup.object({
    userName: Yup.string().required("Username is required"),
    facebookLink: Yup.string()
      .url("Invalid URL")
      .required("Facebook link is required"),
    instagramLink: Yup.string()
      .url("Invalid URL")
      .required("Instagram link is required"),
    linkedinLink: Yup.string()
      .url("Invalid URL")
      .required("LinkedIn link is required"),
    githubLink: Yup.string()
      .url("Invalid URL")
      .required("Github link is required"),
    description: Yup.string().required("Description is required"),
    skillsDesc: Yup.string().required("Skills description is required"),
    projectsDesc: Yup.string().required("Projects description is required"),
    phoneNumber: Yup.string().required("phone Number is required"),
    image: Yup.mixed().notRequired(),
    positions: Yup.array(),
  });
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      userName: user.name.split(" ").join("-").toLowerCase(),
      facebookLink: "https://tiptap.dev/docs/editor/extensions/nodes/image",
      instagramLink: "https://tiptap.dev/docs/editor/extensions/nodes/image",
      linkedinLink: "https://tiptap.dev/docs/editor/extensions/nodes/image",
      githubLink: "https://tiptap.dev/docs/editor/extensions/nodes/image",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsam",
      skillsDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsam",
      projectsDesc:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsam",
      image: "",
      phoneNumber: "",
      positions: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const toastId = toast.loading("loading....");
      try {
        await addPortfolio(values).unwrap();
        toast.dismiss(toastId);
        toast.success("Portfolio added successfully");
        resetForm();
        window.location.reload();
      } catch (error: any) {
        toast.dismiss(toastId);
        if (error.data) {
          toast.error(error.data.message);
        } else {
          toast.error("something went wrong, please try again");
        }
      }
    },
  });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        setFieldValue("image", avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);

    handleChangeImage(e, "image", setImage, setFieldValue);
  };

  const [image, setImage] = useState("");

  return (
    <>
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={values.image ? values.image : portfolioImage}
                  alt=""
                  width={120}
                  height={120}
                  className="w-[120px] h-[120px] cursor-pointer rounded-full"
                />
                <input
                  type="file"
                  name=""
                  id="avatar"
                  className="hidden"
                  onChange={imageHandler}
                  accept="image/png,image/jpg,image/jpeg,image/webp"
                />
                <label htmlFor="avatar">
                  <div className="w-[30px] h-[30px] bg-blue-500 rounded-xl absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
                    <AiOutlineCamera size={20} className="z-1" />
                  </div>
                </label>
              </div>
            </div>
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
              InputClassName={`${styles.input} placeholder:capitalize`}
              error={errors.userName}
              label="User Name"
              placeholder="User Name"
              labalClassName="capitalize"
            />
            <Inputs
              handlerChange={handleChange}
              name="phoneNumber"
              type="text"
              value={values.phoneNumber}
              InputClassName={`${styles.input} placeholder:capitalize`}
              error={errors.phoneNumber}
              label="phone Number"
              max={11}
              placeholder="phone Number"
              labalClassName="capitalize"
            />
            <Button
              onClick={handleAddPosition}
              color="light-blue"
              className="block ml-auto"
            >
              add position
            </Button>
            {positions.map((_, index) => (
              <div key={index}>
                <Inputs
                  handlerChange={handleChange}
                  name={`positions[${index}]`}
                  type="text"
                  value={values.positions[index]}
                  InputClassName={`${styles.input} placeholder:capitalize inline-block`}
                  label={`positions ${index + 1}`}
                  placeholder={`positions ${index + 1}`}
                  labalClassName="capitalize"
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
           
            <button
              className={`w-full mx-auto h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
            >
              Add
            </button>
          </div>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  );
};

export default AddPortfolio;
