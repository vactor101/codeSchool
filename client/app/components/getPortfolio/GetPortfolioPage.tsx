"use client";
import React from "react";
import { NavBar } from "./navbar/Navbar";
import { Banner } from "./banner/Banner";
import { Skills } from "./skills/Skill";
import { Projects } from "./project/Projects";
import { Contact } from "./contact/Contact";
import Footer from "./footer/Footer";
import { useGetPortfolioQuery } from "@/redux/features/portfolio/portfolioApi";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import { redirect } from "next/navigation";

const GetPortfolioPage = ({ username }: { username: string }) => {
  const { data, isLoading, isError } = useGetPortfolioQuery(username);

  if (isError) {
    redirect("/");
  }
  return (
    <div>
      {(isLoading || isError) && <Loader />}
      {!isLoading && !isError && (
        <>
          <Heading
            title={`${data.portfolio.name} - Portfolio`}
            description={data.portfolio.description}
          />
          <NavBar portfolio={data.portfolio} />
          <Banner portfolio={data.portfolio} />
          <Skills portfolio={data.portfolio} />
          <Projects portfolio={data.portfolio} />
          <Contact portfolio={data.portfolio} />
          <Footer portfolio={data.portfolio} />
        </>
      )}
    </div>
  );
};

export default GetPortfolioPage;
