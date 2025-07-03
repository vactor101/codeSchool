"use client";
import Image from "next/image";
import { brainwaveSymbol, check } from "@/public/assests";
import { collabApps, collabContent, collabText } from "@/constants";
import Button from "./Button";
import Section from "./Section";
import { LeftCurve, RightCurve } from "./design/Collaboration";
import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Message from "./message/Message";
import { data, Data } from "@/app/utils/parentsAndSchools";

const Collaboration = () => {
  const [open, setOpen] = useState(1);
  const { parents }: Data = data;

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <Section
      crosses
      className="py-12 md:py-16 lg:py-20 relative overflow-hidden"
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Enhanced Left Column - Content */}
          <div className="w-full xl:max-w-[28rem] order-2 xl:order-1">
            <div className="text-center xl:text-left mb-8 lg:mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-gradient-purple">
                {parents.collabTitle}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto xl:mx-0 rounded-full"></div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/10">
              <div className="space-y-4">
                {parents.collabItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <Accordion
                      open={open === index + 1}
                      className="border-none"
                    >
                      <AccordionHeader
                        onClick={() => handleOpen(index + 1)}
                        className="border-none text-white hover:text-purple-200 p-4 transition-colors duration-300"
                      >
                        <div className="flex items-center w-full">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                            <Image
                              src={check}
                              width={16}
                              height={16}
                              alt="check"
                              className="w-4 h-4 filter brightness-0 invert"
                            />
                          </div>
                          <span className="text-sm sm:text-base font-medium flex-1">
                            {item.title}
                          </span>
                          <div
                            className={`transform transition-transform duration-300 ${open === index + 1 ? "rotate-180" : ""}`}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </AccordionHeader>
                      <AccordionBody className="px-4 pb-4">
                        <p className="text-sm text-n-3 leading-relaxed pl-12">
                          {item.des}
                        </p>
                      </AccordionBody>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center xl:text-left">
              <Message>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-xl">
                  Try it now
                </button>
              </Message>
            </div>
          </div>

          {/* Enhanced Right Column - Visual */}
          <div className="flex-1 order-1 xl:order-2 w-full max-w-2xl xl:max-w-none">
            <div className="relative">
              {/* Main collaboration visual */}
              <div className="relative p-0.5 bg-conic-gradient rounded-3xl">
                <div className="relative bg-n-8 rounded-[2.4rem] overflow-hidden">
                  <div className="aspect-square lg:aspect-[4/3] relative">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20"></div>
                    </div>

                    {/* Center logo/symbol */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-32 h-32 lg:w-40 lg:h-40 animate-pulse-slow">
                        <Image
                          src={brainwaveSymbol}
                          fill
                          alt="Collaboration center"
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* Floating app icons */}
                    <div className="absolute inset-0">
                      {collabApps.map((app, index) => {
                        const positions = [
                          "top-4 left-4",
                          "top-4 right-4",
                          "bottom-4 left-4",
                          "bottom-4 right-4",
                          "top-1/2 left-4 -translate-y-1/2",
                          "top-1/2 right-4 -translate-y-1/2",
                          "top-4 left-1/2 -translate-x-1/2",
                          "bottom-4 left-1/2 -translate-x-1/2",
                        ];

                        return (
                          <div
                            key={app.id}
                            className={`absolute ${positions[index % positions.length]} animate-float`}
                            style={{ animationDelay: `${index * 0.5}s` }}
                          >
                            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-n-7 rounded-xl flex items-center justify-center border border-n-1/10 backdrop-blur-sm hover:scale-110 transition-transform duration-300">
                              <Image
                                src={app.icon}
                                width={app.width}
                                height={app.height}
                                alt={`App ${app.id}`}
                                className="w-6 h-6 lg:w-8 lg:h-8"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative curves */}
              <LeftCurve />
              <RightCurve />
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-400 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
    </Section>
  );
};

export default Collaboration;
