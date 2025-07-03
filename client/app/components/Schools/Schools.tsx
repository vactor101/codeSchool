import React from "react";
import Hero from "./components/Hero";
import Benefits from "./components/Benefits";
import Collaboration from "./components/Collaboration";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Roadmap from "./components/Roadmap";

const Schools = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-n-8 to-n-6 overflow-x-hidden">
      <div className="relative">
        <Hero />
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          <Benefits />
          <Collaboration />
          <Services />
          <Roadmap />
        </div>
      </div>
    </div>
  );
};

export default Schools;
