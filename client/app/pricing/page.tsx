"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingSection from "../components/Pricing/PricingSection";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(2);
  const [route, setRoute] = useState("Login");
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Heading
        title={`${t("pricing.title") || "Pricing"} - Code School`}
        description={
          t("pricing.description") ||
          "Choose the perfect plan for your child's coding journey"
        }
        keywords="pricing,courses,coding,education,children"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Page;
