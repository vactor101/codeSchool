"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Parents from "../components/Parents/Parents";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Parents us - Code School"
        description="Code School is a learning management system for helping programmers."
        keywords="programming,mern"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Parents />
      <Footer />
    </div>
  );
};

export default Page;
