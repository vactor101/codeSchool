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
    <Section crosses className="py-12 md:py-16 lg:py-20">
      <div className="container flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
        {/* Left Column - Content */}
        <div className="w-full lg:max-w-[25rem]">
          <h2 className="h2 mb-6 md:mb-8 text-center lg:text-left">
            {parents.collabTitle}
          </h2>
          
          <ul className="max-w-full md:max-w-[22rem] mb-8 md:mb-14 mx-auto lg:mx-0">
            {parents.collabItems.map((item, index) => (
              <li className="mb-3 py-3 border-b border-n-6 last:border-0" key={index}>
                <Accordion 
                  open={open === index + 1}
                  className="border-none"
                >
                  <AccordionHeader
                    onClick={() => handleOpen(index + 1)}
                    className="border-none text-white hover:text-white p-0"
                  >
                    <div className="flex items-center">
                      <Image 
                        src={check} 
                        width={20} 
                        height={20} 
                        alt="check" 
                        className="w-5 h-5"
                      />
                      <h6 className="body-2 ml-4">{item.title}</h6>
                    </div>
                  </AccordionHeader>
                  <AccordionBody className="pt-2 pb-0">
                    {item.des && (
                      <p className="body-2 text-n-4">{item.des}</p>
                    )}
                  </AccordionBody>
                </Accordion>
              </li>
            ))}
          </ul>

          <div className="flex justify-center lg:justify-start">
            <Message>
              <Button className="px-8 py-3">Try it now</Button>
            </Message>
          </div>
        </div>

        {/* Right Column - Graphic */}
        <div className="w-full lg:ml-auto xl:w-[38rem] mt-0 lg:mt-4">
          <p className="body-2 mb-8 text-n-4 text-center md:mb-12 lg:mb-16 lg:w-[22rem] lg:mx-auto">
            {parents.collabText}
          </p>

          <div className="relative mx-auto w-full max-w-[22rem] aspect-square border border-n-6 rounded-full">
            <div className="absolute inset-0 flex items-center justify-center w-full h-full">
              <div className="flex w-48 md:w-60 aspect-square m-auto border border-n-6 rounded-full">
                <div className="w-[5rem] md:w-[6rem] aspect-square m-auto p-1 md:p-[0.2rem] bg-conic-gradient rounded-full">
                  <div className="flex items-center justify-center w-full h-full bg-n-8 rounded-full">
                    <Image
                      src={brainwaveSymbol}
                      width={40}
                      height={40}
                      alt="brainwave"
                      className="w-10 h-10 md:w-12 md:h-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <ul className="absolute inset-0">
              {collabApps.map((app, index) => (
                <li
                  key={app.id}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.2rem] md:-ml-[1.6rem] origin-bottom rotate-${
                    index * 45
                  }`}
                >
                  <div
                    className={`relative -top-[1.2rem] md:-top-[1.6rem] flex w-[2.8rem] md:w-[3.2rem] h-[2.8rem] md:h-[3.2rem] bg-n-7 border border-n-1/15 rounded-xl -rotate-${
                      index * 45
                    }`}
                  >
                    <Image
                      className="m-auto"
                      width={app.width}
                      height={app.height}
                      alt={app.title}
                      src={app.icon}
                      style={{
                        maxWidth: '60%',
                        height: 'auto'
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <LeftCurve />
            <RightCurve />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;