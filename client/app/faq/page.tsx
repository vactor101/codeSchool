"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ/FAQ";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(4);
  const [route, setRoute] = useState("Login");
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Heading
        title={`${t('nav.faq')} - Code School`}
        description={t('hero.subtitle')}
        keywords="programming,mern,faq,questions,answers"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <br />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
