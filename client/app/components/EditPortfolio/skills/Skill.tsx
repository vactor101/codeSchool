"use client";

import meter1 from "@/public/assests/portfolio/img/meter1.svg";
import meter2 from "@/public/assests/portfolio/img/meter2.svg";
import meter3 from "@/public/assests/portfolio/img/meter3.svg";
import colorSharp from "@/public/assests/portfolio/img/color-sharp.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import DescEdit from "../DescEdit";
import AddSkill from "./AddSkill";
import EditSkill from "./EditSkill";
import DeleteBtn from "../deletebtn/DeleteBtn";
import { useDeleteSkillMutation } from "@/redux/features/portfolio/portfolioApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export const Skills = ({
  portfolio,
  refetch,
}: {
  portfolio: any;
  refetch: () => Promise<any>;
}) => {
  const [deleteData, { isLoading: deleteLoading, originalArgs }] =
    useDeleteSkillMutation();

  return (
    <section
      className={`relative py-12 bg-left bg-no-repeat bg-black`}
      style={{ backgroundImage: `url(${colorSharp.src})` }}
      id="skills"
    >
      <div className="container mx-auto">
        <div className="bg-[#151515] rounded-[64px] text-center px-12 py-16 text-white">
          <h2 className="text-4xl font-bold">Skills</h2>
          <DescEdit
            className="text-gray-400 text-lg leading-relaxed mt-4 w-[52ch]"
            data={portfolio.skillsDesc}
            name="skillsDesc"
            refetch={refetch}
          />
          <AddSkill refetch={refetch} title="add skils" />
          <Swiper
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2000,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            modules={[Autoplay]}
            className="text-white"
          >
            {portfolio.skills.length > 0 ? (
              portfolio.skills.map((skill: any) => (
                <SwiperSlide key={skill._id}>
                  <div className="item flex flex-col items-center">
                    <div className="w-40 h-40 mb-5 bg-transparent flex justify-center items-center rounded-full border-8 border-deep-purple-800 text-2xl font-bold">
                      {skill.percentage}%
                    </div>
                    <h5 className="text-lg font-semibold mb-5">{skill.name}</h5>
                    <div className="flex items-center justify-between gap-2">
                      <EditSkill
                        refetch={refetch}
                        skill={skill}
                        title={<FontAwesomeIcon icon={faPenToSquare} />}
                      />
                      <DeleteBtn
                        id={skill._id}
                        refetch={refetch}
                        title={<FontAwesomeIcon icon={faTrash} />}
                        loading={deleteLoading && originalArgs === skill._id}
                        deleteEl={(value) => deleteData(value).unwrap()}
                        name="Skill"
                        className="!px-3 !py-[10px]"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <div className="p-5 rounded-lg text-2xl text-white font-bold bg-deep-purple-800">
                there is no skills
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
