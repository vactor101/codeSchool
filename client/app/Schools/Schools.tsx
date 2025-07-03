import React, { useState } from "react";
import { styles } from "../styles/style";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Schools from "../components/Schools/Schools";
import Footer from "../components/Footer";

type Props = {};

const Policy = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");
  return (
    <>
      <Heading
        title="Courses - Code School"
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
      <Schools />
      <Footer />
    </>
  );
};

export default Policy;