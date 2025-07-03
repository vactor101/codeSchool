"use client";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "@/public/assests/portfolio/img/project-img1.png";
import projImg2 from "@/public/assests/portfolio/img/project-img2.png";
import projImg3 from "@/public/assests/portfolio/img/project-img3.png";
import colorSharp2 from "@/public/assests/portfolio/img/color-sharp2.png";
import "animate.css";
import {
  Tabs,
  Tab,
  Button,
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";
import DescEdit from "../DescEdit";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import {
  useDeleteCategoryMutation,
  useDeleteProjectMutation,
} from "@/redux/features/portfolio/portfolioApi";
import DeleteBtn from "../deletebtn/DeleteBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddProject from "./AddProject";
import Link from "next/link";
import EditProject from "./EditProject";

export const Projects = ({
  portfolio,
  refetch,
}: {
  portfolio: any;
  refetch: () => Promise<any>;
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const projects = [
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg3,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg1,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg2,
    },
    {
      title: "Business Startup",
      description: "Design & Development",
      imgUrl: projImg3,
    },
  ];

  const [deleteData, { isLoading: deleteLoading, originalArgs }] =
    useDeleteCategoryMutation();
  const [
    deleteDataPro,
    { isLoading: deleteLoadingPro, originalArgs: originalArgsPro },
  ] = useDeleteProjectMutation();

  return (
    <section className="project bg-black py-20 relative" id="projects">
      <div className="container">
        <div>
          <div className={"animate__animated animate__fadeIn"}>
            <h2 className="text-4xl font-bold text-center text-white">
              Projects
            </h2>
            {/* <p className="text-lg text-gray-400 text-center mx-auto my-6 w-2/3">
              {portfolio.projectsDesc}
            </p> */}
            <DescEdit
              divClassName="mx-auto w-fit"
              className="text-lg text-gray-400 text-center mx-auto my-6 w-[52ch]"
              data={portfolio.projectsDesc}
              name="projectsDesc"
              refetch={refetch}
            />
            <div className="mx-auto w-fit">
              <AddCategory refetch={refetch} title="add category" />
            </div>
            <Tabs value="all">
              <div className="lg:w-1/2 lg:mx-auto mx-20 mb-5">
                <TabsHeader
                  className="rounded-none bg-transparent p-0 mb-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5"
                  indicatorProps={{
                    className: "hidden",
                  }}
                >
                  <Tab
                    value={"all"}
                    onClick={() => setActiveTab("all")}
                    className={`border  rounded-2xl flex justify-center items-center h-fit w-full py-3 px-2 font-bold ${
                      activeTab === "all"
                        ? "text-white border-purple-500"
                        : "text-white border-white"
                    } capitalize transition-all duration-300 relative overflow-hidden`}
                  >
                    <div
                      className={`w-full ${
                        activeTab === "all" ? "h-full" : "h-0"
                      } top-0 left-0 absolute bg-purple-500 -z-10 duration-300`}
                    />
                    all
                  </Tab>
                  {portfolio.projects.length > 0 &&
                    portfolio.projects.map((category: any) => (
                      <div key={category._id}>
                        <Tab
                          value={category.categoryName}
                          onClick={() => setActiveTab(category.categoryName)}
                          className={`border  rounded-2xl flex justify-center items-center w-full h-fit mb-2 py-3 px-2 font-bold ${
                            activeTab === category.categoryName
                              ? "text-white border-purple-500"
                              : "text-white border-white"
                          } capitalize transition-all duration-300 relative overflow-hidden`}
                        >
                          <div
                            className={`w-full ${
                              activeTab === category.categoryName
                                ? "h-full"
                                : "h-0"
                            } top-0 left-0 absolute bg-purple-500 -z-10 duration-300`}
                          />
                          {category.categoryName}
                        </Tab>
                        <div className="flex items-center justify-between gap-2">
                          <EditCategory
                            category={category}
                            refetch={refetch}
                            title={<FontAwesomeIcon icon={faPenToSquare} />}
                          />
                          <DeleteBtn
                            id={category._id}
                            refetch={refetch}
                            title={<FontAwesomeIcon icon={faTrash} />}
                            loading={
                              deleteLoading && originalArgs === category._id
                            }
                            deleteEl={(value) => deleteData(value).unwrap()}
                            name="Category"
                            className="!px-3 !py-[10px]"
                          />
                        </div>
                      </div>
                    ))}
                </TabsHeader>
              </div>
              <div className="mx-auto w-fit">
                <AddProject refetch={refetch} title="add project" />
              </div>
              <TabsBody>
                <TabPanel value={"all"}>
                  <div className="grid grid-cols-12 gap-5">
                    {portfolio.projects.length > 0 &&
                      (portfolio.projects.every(
                        (projectCategory: any) =>
                          !projectCategory.projects ||
                          projectCategory.projects.length === 0
                      ) ? (
                        <div className="col-span-full p-5 rounded-lg text-2xl text-white font-bold bg-deep-purple-800 text-center">
                          There are no projects
                        </div>
                      ) : (
                        portfolio.projects.map(
                          (projectCategory: any, index: number) =>
                            projectCategory.projects.length > 0 &&
                            projectCategory.projects.map((project: any) => (
                              <div
                                key={project._id}
                                className="lg:col-span-4 sm:col-span-6 col-span-12"
                              >
                                <ProjectCard
                                  description={project.description}
                                  imgUrl={project.image.url}
                                  title={project.name}
                                  link={project.link}
                                />
                                <div className="flex justify-between items-center">
                                  <EditProject
                                    categoryId={projectCategory._id}
                                    project={project}
                                    refetch={refetch}
                                    title={
                                      <FontAwesomeIcon icon={faPenToSquare} />
                                    }
                                  />
                                  <DeleteBtn
                                    id={project._id}
                                    refetch={refetch}
                                    title={<FontAwesomeIcon icon={faTrash} />}
                                    loading={
                                      deleteLoadingPro &&
                                      originalArgsPro === project._id
                                    }
                                    deleteEl={(value) =>
                                      deleteDataPro({
                                        projectId: value,
                                        categoryId: projectCategory._id,
                                      }).unwrap()
                                    }
                                    name="Project"
                                    className="!px-3 !py-[10px]"
                                  />
                                </div>
                              </div>
                            ))
                        )
                      ))}
                  </div>
                </TabPanel>

                {portfolio.projects.length > 0 ? (
                  portfolio.projects.map(
                    (projectCategory: any, index: number) => (
                      <TabPanel
                        value={projectCategory.categoryName}
                        key={projectCategory._id}
                      >
                        <div className="grid grid-cols-12 gap-5">
                          {projectCategory.projects.length > 0 ? (
                            projectCategory.projects.map((project: any) => (
                              <div
                                key={project._id}
                                className="lg:col-span-4 sm:col-span-6 col-span-12"
                              >
                                <ProjectCard
                                  description={project.description}
                                  imgUrl={project.image.url}
                                  title={project.name}
                                  link={project.link}
                                />
                                <div className="flex justify-between items-center">
                                  <EditProject
                                    categoryId={projectCategory._id}
                                    project={project}
                                    refetch={refetch}
                                    title={
                                      <FontAwesomeIcon icon={faPenToSquare} />
                                    }
                                  />
                                  <DeleteBtn
                                    id={project._id}
                                    refetch={refetch}
                                    title={<FontAwesomeIcon icon={faTrash} />}
                                    loading={
                                      deleteLoadingPro &&
                                      originalArgsPro === project._id
                                    }
                                    deleteEl={(value) =>
                                      deleteDataPro({
                                        projectId: value,
                                        categoryId: projectCategory._id,
                                      }).unwrap()
                                    }
                                    name="Project"
                                    className="!px-3 !py-[10px]"
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div
                              key={index}
                              className="col-span-full p-5 rounded-lg text-2xl text-white font-bold bg-deep-purple-800 text-center"
                            >
                              there is no projects
                            </div>
                          )}
                        </div>
                      </TabPanel>
                    )
                  )
                ) : (
                  <div className="col-span-full p-5 rounded-lg text-2xl text-white font-bold bg-deep-purple-800 text-center">
                    there is no projects
                  </div>
                )}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>

      <Image
        className="absolute top-20 right-0 w-1/3 z-[-4] opacity-50"
        src={colorSharp2}
        alt="background-shape"
      />
    </section>
  );
};
