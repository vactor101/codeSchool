"use client";
import Arrow from "@/public/assests/svg/Arrow";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import image from "@/assets/benefits/card-1.svg";
import { benefits } from "@/constants";
import { data, Data } from "@/app/utils/parentsAndSchools";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useSearchParams } from "next/dist/client/components/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
interface Params {
  blogId?: string;
}
const Page = () => {
  const params = useParams() as Params;
  const { schools }: Data = data;
  const item = schools.blogs[Number(params.blogId) - 1];

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={8}
      />
      <div className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%]">
        <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
          <h5 className="h5 mb-5">{item.title}</h5>
          <p className="body-2 mb-6 text-n-3">{item.text}</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
