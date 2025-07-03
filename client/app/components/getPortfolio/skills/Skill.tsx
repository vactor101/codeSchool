"use client";
import colorSharp from "@/public/assests/portfolio/img/color-sharp.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const portfolioData = {
  skillsTitle: "My Expertise",
  skillsSubtitle: "Technologies I Master",
  skillsDesc: "Here are my core competencies and proficiency levels",
  skills: [
    {
      _id: "1",
      name: "JavaScript",
      percentage: 90
    },
    {
      _id: "2",
      name: "React",
      percentage: 85
    },
  ]
}


interface Skill {
  _id: string;
  name: string;
  percentage: number;
  icon?: string;
}

interface SkillsProps {
  portfolio: {
    skillsTitle?: string;
    skillsSubtitle?: string;
    skillsDesc?: string;
    skills: Skill[];
  };
}

export const Skills = ({ portfolio }: SkillsProps) => {
  return (
    <section
      className="relative py-20 bg-black bg-left bg-no-repeat"
      style={{ backgroundImage: `url(${colorSharp.src})` }}
      id="skills"
    >
      <div className="container mx-auto px-4">
        <div className="bg-[#151515] rounded-3xl text-center p-8 md:p-16 lg:px-20 lg:py-16">
          {/* Header Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-2">
              {portfolio.skillsTitle || "My Skills"}
            </h2>
            <h3 className="text-xl text-purple-400 mb-4">
              {portfolio.skillsSubtitle || "Technical Proficiencies"}
            </h3>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              {portfolio.skillsDesc || "Here are the technologies and skills I've mastered"}
            </p>
          </div>

          {/* Skills Slider */}
          <div className="relative">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1280: {
                  slidesPerView: 4,
                },
              }}
              modules={[Autoplay, Pagination]}
              className="w-full py-8"
            >
              {portfolio.skills.length > 0 ? (
                portfolio.skills.map((skill: Skill) => (
                  <SwiperSlide key={skill._id}>
                    <div className="flex flex-col items-center p-6 group">
                      {/* Skill Meter */}
                      <div className="relative w-40 h-40 mb-6 flex justify-center items-center">
                        {/* Circular Background */}
                        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-gray-800"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-purple-600 group-hover:text-purple-400 transition-colors duration-300"
                            strokeWidth="8"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                            strokeDasharray={`${2 * Math.PI * 40}`}
                            strokeDashoffset={`${2 * Math.PI * 40 * (1 - skill.percentage / 100)}`}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        {/* Percentage Text */}
                        <span className="text-3xl font-bold text-white">
                          {skill.percentage}%
                        </span>
                      </div>
                      {/* Skill Name */}
                      <h4 className="text-xl font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {skill.name}
                      </h4>
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div className="col-span-full p-6 rounded-lg text-xl text-white font-bold bg-purple-900/50">
                  No skills available
                </div>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};