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
    <Section id="how-to-use" className="py-12 md:py-16 lg:py-20 relative">
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Enhanced Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <Heading
            title={parents.servicesTitle}
            text={parents.servicesText}
            className="mb-6"
          />
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative space-y-8 lg:space-y-12">
          {/* Enhanced Main Service Card */}
          <div className="relative z-1 flex flex-col lg:flex-row items-center min-h-[500px] lg:h-[39rem] p-6 sm:p-8 lg:p-12 xl:p-16 border border-n-1/10 rounded-3xl overflow-hidden bg-gradient-to-br from-n-8/60 via-n-8/80 to-n-8/60 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-500">
            <div className="relative w-full lg:w-3/5 h-64 sm:h-80 lg:h-full mb-8 lg:mb-0 lg:absolute lg:top-0 lg:left-0 rounded-2xl overflow-hidden group">
              <Image
                className="w-full h-full object-cover lg:object-right transition-transform duration-700 group-hover:scale-110"
                fill
                alt="Smartest AI"
                src={service1}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-purple-900/60"></div>
            </div>

            <div className="relative z-10 w-full lg:max-w-[20rem] lg:ml-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20">
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-center lg:text-left text-white">
                {parents.servicesKeyTitle}
              </h4>
              <p className="text-sm sm:text-base mb-6 lg:mb-8 text-n-2 text-center lg:text-left leading-relaxed">
                {parents.servicesKeyDes}
              </p>
              <div className="space-y-3">
                {parents.servicesKey.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <Accordion open={open === index + 1} className="w-full">
                      <AccordionHeader
                        onClick={() => handleOpen(index + 1)}
                        className="border-none text-white hover:text-purple-200 p-4 transition-colors duration-300"
                      >
                        <div className="flex items-center w-full">
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                            <Image
                              width={16}
                              height={16}
                              src={check}
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
                        <p className="text-sm text-n-3 leading-relaxed pl-11">
                          {item.des}
                        </p>
                      </AccordionBody>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>

            <Generating className="absolute left-4 right-4 bottom-4 border-n-1/10 border lg:left-1/2 lg-right-auto lg:bottom-8 lg:-translate-x-1/2" />
          </div>

          {/* Enhanced Tabs Section */}
          <Tabs value={parents.servicesTabs[0].label.toLowerCase()}>
            <div className="relative z-1 grid gap-8 lg:gap-12 xl:grid-cols-2">
              {/* Enhanced Left Tab Content */}
              <TabsBody className="xl:order-1">
                {parents.servicesTabs.map((value) => (
                  <TabPanel
                    key={value.label}
                    value={value.label.toLowerCase()}
                    className="p-0"
                  >
                    <div className="relative min-h-[350px] sm:min-h-[400px] lg:min-h-[450px] border border-n-1/10 rounded-3xl overflow-hidden group shadow-2xl hover:shadow-3xl transition-all duration-500">
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
                  <h4 className="h4 mb-4 text-center md:text-left">
                    {parents.servicesTabsTitle}
                  </h4>
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
                          <div className="py-4 text-center md:text-left">
                            {text}
                          </div>
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
