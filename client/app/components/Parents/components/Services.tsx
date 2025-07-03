"use client";
import Section from "./Section";
import Heading from "./Heading";
import { service1, service2, service3, check } from "@/public/assests";
import service4 from "@/public/assests/services/service-3 - Copy.png";
import { brainwaveServices, brainwaveServicesIcons } from "@/constants";
import {
  PhotoChatMessage,
  Gradient,
  VideoBar,
  VideoChatMessage,
} from "./design/Services";
import Generating from "./Generating";
import Image from "next/image";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import { data, Data } from "@/app/utils/parentsAndSchools";

const Services = () => {
  const [open, setOpen] = useState(0);
  const { parents }: Data = data;

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <Section id="how-to-use" className="py-12 md:py-16 lg:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <Heading 
          title={parents.servicesTitle} 
          text={parents.servicesText} 
          className="text-center"
        />

        <div className="relative">
          {/* Main Service Card */}
          <div className="relative z-1 flex flex-col md:flex-row items-center h-auto md:h-[39rem] mb-8 p-6 md:p-8 lg:p-12 xl:p-20 border border-n-1/10 rounded-3xl overflow-hidden bg-n-8/50 backdrop-blur">
            <div className="relative w-full md:w-3/5 h-64 md:h-full mb-6 md:mb-0 md:absolute md:top-0 md:left-0">
              <Image
                className="w-full h-full object-cover md:object-right rounded-xl"
                fill
                alt="Smartest AI"
                src={service1}
                priority
              />
            </div>

            <div className="relative z-1 w-full md:max-w-[17rem] md:ml-auto">
              <h4 className="h4 mb-4 text-center md:text-left">{parents.servicesKeyTitle}</h4>
              <p className="body-2 mb-6 md:mb-[3rem] text-n-3 text-center md:text-left">
                {parents.servicesKeyDes}
              </p>
              <ul className="body-2">
                {parents.servicesKey.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start py-4 border-t border-n-6"
                  >
                    <Accordion open={open === index + 1} className="w-full">
                      <AccordionHeader
                        onClick={() => handleOpen(index + 1)}
                        className="border-none text-white hover:text-white p-0"
                      >
                        <div className="flex items-center">
                          <Image
                            width={20}
                            height={20}
                            src={check}
                            alt="check"
                            className="w-5 h-5"
                          />
                          <p className="ml-3 text-sm">{item.title}</p>
                        </div>
                      </AccordionHeader>
                      <AccordionBody className="pt-2 pb-0">
                        <p className="body-2 text-n-4">{item.des}</p>
                      </AccordionBody>
                    </Accordion>
                  </li>
                ))}
              </ul>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          {/* Tabs Section */}
          <Tabs value={parents.servicesTabs[0].label.toLowerCase()}>
            <div className="relative z-1 grid gap-6 lg:grid-cols-2">
              {/* Left Tab Content */}
              <TabsBody className="lg:order-1">
                {parents.servicesTabs.map((value) => (
                  <TabPanel 
                    key={value.label} 
                    value={value.label.toLowerCase()}
                    className="p-0"
                  >
                    <div className="relative min-h-[30rem] md:min-h-[39rem] border border-n-1/10 rounded-3xl overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={value.image}
                          className="h-full w-full object-cover"
                          fill
                          alt={value.label}
                        />
                      </div>

                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12 bg-gradient-to-b from-n-8/0 to-n-8/90">
                        <h4 className="h4 mb-2 md:mb-4">{value.label}</h4>
                        <p className="body-2 mb-4 md:mb-[3rem] text-n-3">
                        Automatically enhance your photos using our AI
                        app&apos;s photo editing feature. Try it now!
                        </p>
                      </div>

                      <PhotoChatMessage text={value.text} />
                    </div>
                  </TabPanel>
                ))}
              </TabsBody>

              {/* Right Tab Selector */}
              <div className="sm:p-4 bg-n-7 rounded-3xl overflow-hidden lg:min-h-[46rem] lg:order-2">
                <div className="py-8 sm:px-4 px-2 xl:px-8">
                  <h4 className="h4 mb-4 text-center md:text-left">{parents.servicesTabsTitle}</h4>
                  <p className="body-2 mb-6 md:mb-8 text-n-3 text-center md:text-left">
                    {parents.servicesTabsDes}
                  </p>

                  <div className="flex flex-col items-center">
                    <TabsHeader
                      indicatorProps={{
                        className: "w-10 mx-auto bg-[#0c0f14]",
                      }}
                      className="bg-transparent flex flex-wrap justify-center gap-4"
                    >
                      {parents.servicesTabs.map(({ value, label }) => (
                        <Tab 
                          key={label} 
                          value={label.toLowerCase()}
                          className="w-16 h-16 md:w-20 md:h-20"
                        >
                          <div className="rounded-2xl flex items-center justify-center w-full h-full p-1 bg-conic-gradient">
                            <div className="flex items-center justify-center w-full h-full bg-n-7 rounded-[1rem]">
                              <Image
                                src={value}
                                width={24}
                                height={24}
                                alt={label}
                                className="w-6 h-6"
                              />
                            </div>
                          </div>
                        </Tab>
                      ))}
                    </TabsHeader>

                    <TabsBody className="w-full mt-6">
                      {parents.servicesTabs.map(({ label, video, text }) => (
                        <TabPanel 
                          key={label} 
                          value={label.toLowerCase()}
                          className="p-0"
                        >
                          <div className="py-4 text-center md:text-left">{text}</div>
                          <div className="relative h-[16rem] sm:h-[20rem] md:h-[25rem] bg-n-8 rounded-xl overflow-hidden">
                            <video
                              className="h-full w-full object-cover rounded-lg"
                              controls
                              playsInline
                            >
                              <source src={video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        </TabPanel>
                      ))}
                    </TabsBody>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>

          <Gradient />
        </div>
      </div>
    </Section>
  );
};

export default Services;