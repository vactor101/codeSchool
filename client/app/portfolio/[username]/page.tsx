import React from "react";
import GetPortfolioPage from "../../components/getPortfolio/GetPortfolioPage";
import { redirect } from "next/navigation";

const page = ({ params }: { params: any }) => {
  if (!params.username) {
    redirect("/");
  }
  return <GetPortfolioPage username={params.username} />;
};

export default page;
