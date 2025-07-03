"use client";
import { useSendNewsletterMutation } from "@/redux/features/portfolio/portfolioApi";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

export const Newsletter = ({ portfolio }: { portfolio: any }) => {
  const [sendNewsletter] = useSendNewsletterMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const toastId = toast.loading("Sending Email...");
      try {
        await sendNewsletter({
          ...values,
          portfolioId: portfolio.portfolioId,
        }).unwrap();
        toast.dismiss(toastId);
        toast.success("Email sent successfully!");
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

  return (
    <div className="container text-[#121212] mt-[-122px] mb-20 800px:px-[125px] 800px:py-[85px] px-10 py-5 rounded-[55px] lg:col-span-12 col-span-12 wow slideInUp bg-white">
      <div className="grid grid-cols-12 items-center gap-5">
        <div className="xl:col-span-5 lg:col-span-6 col-span-12">
          <h3 className="font-bold tracking-[0.5px] leading-snug 800px:text-2xl text-lg lg:w-1/2">
            Subscribe to our Newsletter
            <br /> & Never miss latest updates
          </h3>
        </div>
        <div className="lg:col-span-6 xl:col-span-7 col-span-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="bg-white p-1 rounded-2xl relative z-0 flex items-center border border-[#4a2fbd]">
              <input
                type="email"
                name="email"
                className="w-full outline-none border-none text-[#121212] font-medium px-[15px] py-0 border-0 bg-transparent"
                placeholder="Email Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#4a2fbd] to-[#aa367c] text-white font-medium tracking-[0.5px] 800px:px-[65px] px-5 800px:py-5 py-2 rounded-[18px]"
              >
                Submit
              </button>
            </div>
          </form>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 mt-2">{formik.errors.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};
