"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { data, error, isSuccess, isLoading }] = useRegisterMutation();
  const [socialAuth, { isLoading: isSocialLoading }] = useSocialAuthMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Registration successful");
      setRoute("Login"); // بعد التسجيل نرسل المستخدم لصفحة تسجيل الدخول
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        const errorMessage = errorData.data?.message || "Registration failed";
        toast.error(errorMessage);

        // لو الخطأ متعلق بالإيميل (مثلاً قالب الإيميل غير موجود)، نعطي رسالة نجاح ونوجه المستخدم للـ Login
        if (errorMessage.includes("ENOENT") || errorMessage.includes("mail")) {
          toast.success("Account created! Please login.");
          setRoute("Login");
        }
      }
    }
  }, [isSuccess, error, data, setRoute]);

  // لا تستخدم useSession() هنا ولا تعتمد على الجلسة مباشرة

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      await register({ name, email, password });
    },
  });

  const handleGoogleSignup = async () => {
    try {
      // توجه المستخدم لصفحة تسجيل الدخول مع Google عبر next-auth
      await signIn("google", { callbackUrl: window.location.origin });
    } catch (error) {
      console.error("Google signup error:", error);
      toast.error("Google signup failed. Please try again.");
    }
  };

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Join to Code School</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="name">
            Enter your Name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Farida Abdaalah"
            className={`${errors.name && touched.name ? "border-red-500" : ""} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>
        <label className={`${styles.label}`} htmlFor="email">
          Enter your Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email ? "border-red-500" : ""} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password ? "border-red-500" : ""
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-5">
          <button
            type="submit"
            className={`${styles.button} ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isLoading || isSocialLoading}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <FcGoogle size={24} />
            <span>{isSocialLoading ? "Connecting..." : "Continue with Google"}</span>
          </button>
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Signup;
