import React from "react";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";

const Schools = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <Collaboration />
      <Services />
      {/* <Pricing /> */}
      <Roadmap />
    </>
  );
};

export default Schools;
