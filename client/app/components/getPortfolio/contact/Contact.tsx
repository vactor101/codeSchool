"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import contactImg from "@/public/assests/portfolio/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";
import Image from "next/image";
import Inputs from "@/app/components/UI/form/Inputs";
import Textarea from "@/app/components/UI/form/Textarea";
import { useSendMessageContactMutation } from "@/redux/features/portfolio/portfolioApi";
import toast from "react-hot-toast";

export const Contact = ({ portfolio }: { portfolio: any }) => {
  const [sendMessage] = useSendMessageContactMutation();
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    message: Yup.string().required("Message is required"),
  });

  const { handleChange, errors, values, resetForm, touched, handleSubmit } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      },
      validationSchema,
      onSubmit: async (values, { resetForm }) => {
        const toastId = toast.loading("Sending Message...");
        try {
          await sendMessage({
            ...values,
            portfolioId: portfolio.portfolioId,
          }).unwrap();
          toast.dismiss(toastId);
          toast.success("Message sent successfully!");
          resetForm();
        } catch (error: any) {
          toast.dismiss(toastId);
          if (error.data.message) {
            toast.error(error.data.message);
          } else {
            toast.error("Something went wrong, please try again!");
          }
        }
      },
    });

  console.log(errors);

  return (
    <section
      className="bg-gradient-to-r from-[#AA367C] to-[#4A2FBD] pt-[60px] pb-[120px]"
      id="connect"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-2 items-center">
          <div className="md:col-span-6 col-span-12">
            <TrackVisibility>
              {({ isVisible }) => (
                <Image
                  className={`w-[92%] ${
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }`}
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </div>
          <div className="md:col-span-6 col-span-12">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={`p-8 rounded-lg ${
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }`}
                >
                  <h2 className="text-5xl font-bold text-white mb-10">
                    Get In Touch
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Inputs
                        handlerChange={handleChange}
                        name="firstName"
                        type="text"
                        value={values.firstName}
                        InputClassName={"input"}
                        placeholder="first Name"
                        error={errors.firstName}
                        half
                      />
                      <Inputs
                        handlerChange={handleChange}
                        name="lastName"
                        type="text"
                        value={values.lastName}
                        InputClassName={"input"}
                        placeholder="last Name"
                        error={errors.lastName}
                        half
                      />
                      <Inputs
                        handlerChange={handleChange}
                        name="email"
                        type="email"
                        value={values.email}
                        InputClassName={"input"}
                        placeholder="email"
                        error={errors.email}
                        half
                      />
                      <Inputs
                        handlerChange={handleChange}
                        name="phoneNumber"
                        type="tel"
                        value={values.phoneNumber}
                        InputClassName={"input"}
                        placeholder="phoneNumber"
                        error={errors.phoneNumber}
                        half
                      />
                      <Textarea
                        handlerChange={handleChange}
                        name="message"
                        value={values.message}
                        InputClassName={"input min-h-40"}
                        placeholder="message"
                        error={errors.message}
                        labelClass="capitalize"
                      />
                    </div>
                    <div className="z-10 relative">
                      <button
                        type="submit"
                        className="relative overflow-hidden capitalize group px-10 py-5 text-lg font-semibold text-white border border-white transition bg-transparent hover:text-gray-900"
                      >
                        <span className="absolute block w-full -left-full group-hover:left-0 top-0 bg-white h-full z-[-1] duration-300"></span>
                        send
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </div>
        </div>
      </div>
    </section>
  );
};
