"use client";
import React from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import { NavBar } from "./navbar/Navbar";
import { Banner } from "./banner/Banner";
import { Skills } from "./skills/Skill";
import { Projects } from "./project/Projects";
import { useGetPortfolioForDashboardQuery } from "@/redux/features/portfolio/portfolioApi";
import Protected from "@/app/hooks/useProtected";
import { redirect } from "next/navigation";

const EditPortfolio = () => {
  const { data, isLoading, isFetching, refetch, isError } =
    useGetPortfolioForDashboardQuery(undefined);

  if (isError) {
    redirect("/profile");
  }
  return (
    <Protected>
      <div>
        {(isLoading || isFetching || isError) && <Loader />}
        {!isLoading && !isFetching && !isError && (
          <div>
            <Heading
              title={`${data.portfolio.name} - Portfolio`}
              description={data.portfolio.description}
            />
            <NavBar
              portfolio={data.portfolio}
              refetch={async () => await refetch().unwrap()}
            />
            <Banner portfolio={data.portfolio} refetch={refetch} />
            <Skills portfolio={data.portfolio} refetch={refetch} />
            <Projects portfolio={data.portfolio} refetch={refetch} />
          </div>
        )}
      </div>
    </Protected>
  );
};

export default EditPortfolio;
