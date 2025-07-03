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
  TabsHeader,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import Image from "next/image";
import { useState } from "react";

interface ProjectCategory {
  _id: string;
  categoryName: string;
  projects: Project[];
}

interface Project {
  _id: string;
  name: string;
  description: string;
  image: {
    url: string;
  };
  link: string;
  technologies?: string[];
}

interface ProjectsProps {
  portfolio: {
    projectsTitle: string;
    projectsSubtitle: string;
    projectsDesc: string;
    projects: ProjectCategory[];
  };
}

export const Projects = ({ portfolio }: ProjectsProps) => {
  const [activeTab, setActiveTab] = useState("all");
  
  // Demo projects data using your imported images
  const demoProjects = [
    {
      _id: "1",
      name: "E-commerce Platform",
      description: "Full-featured online store",
      image: { url: projImg1.src },
      link: "#",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      _id: "2",
      name: "Mobile Application",
      description: "Cross-platform mobile app",
      image: { url: projImg2.src },
      link: "#",
      technologies: ["Flutter", "Firebase"]
    },
    {
      _id: "3",
      name: "Dashboard UI",
      description: "Analytics dashboard",
      image: { url: projImg3.src },
      link: "#",
      technologies: ["React", "Tailwind CSS"]
    },
    {
      _id: "4",
      name: "Portfolio Website",
      description: "Creative portfolio design",
      image: { url: projImg1.src },
      link: "#",
      technologies: ["Next.js", "Framer Motion"]
    },
    {
      _id: "5",
      name: "Blog System",
      description: "Content management system",
      image: { url: projImg2.src },
      link: "#",
      technologies: ["WordPress", "PHP"]
    },
    {
      _id: "6",
      name: "Landing Page",
      description: "Marketing landing page",
      image: { url: projImg3.src },
      link: "#",
      technologies: ["HTML", "CSS", "JavaScript"]
    }
  ];

  // If no portfolio data is provided, use demo data
  const projectsData = portfolio?.projects?.length > 0 ? portfolio : {
    projectsTitle: "Our Projects",
    projectsSubtitle: "Featured Work",
    projectsDesc: "Explore our collection of recent projects",
    projects: [
      {
        _id: "cat1",
        categoryName: "Web Development",
        projects: demoProjects.slice(0, 3)
      },
      {
        _id: "cat2",
        categoryName: "Mobile Apps",
        projects: demoProjects.slice(3, 6)
      }
    ]
  };

  return (
    <section className="project bg-black py-20 relative" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="animate__animated animate__fadeIn">
            <h2 className="text-4xl font-bold text-center text-white mb-4">
              {projectsData.projectsTitle}
            </h2>
            <h3 className="text-xl text-purple-400 mb-6">
              {projectsData.projectsSubtitle}
            </h3>
            <p className="text-lg text-gray-400 mx-auto max-w-2xl">
              {projectsData.projectsDesc}
            </p>
          </div>
        </div>

        <Tabs value={activeTab} orientation="horizontal" className="overflow-visible">
  <div className="flex justify-center mb-12">
    <TabsHeader
      className="bg-transparent p-0 flex flex-nowrap overflow-x-auto pb-2 scrollbar-hide"
      indicatorProps={{
        className: "hidden",
      }}
    >
      <div className="flex space-x-4">
        <Tab
          value="all"
          onClick={() => setActiveTab("all")}
          className={`whitespace-nowrap px-6 py-3 rounded-full font-semibold transition-all ${
            activeTab === "all"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
              : "text-gray-300 hover:text-white border border-gray-700 hover:border-purple-400"
          }`}
        >
          All Projects
        </Tab>
        
        {projectsData.projects.map((category) => (
          <Tab
            key={category._id}
            value={category.categoryName}
            onClick={() => setActiveTab(category.categoryName)}
            className={`whitespace-nowrap px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === category.categoryName
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                : "text-gray-300 hover:text-white border border-gray-700 hover:border-purple-400"
            }`}
          >
            {category.categoryName}
          </Tab>
        ))}
      </div>
    </TabsHeader>
  </div>

  <TabsBody className="overflow-visible">
    {/* All Projects Tab */}
    <TabPanel value="all" className="p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoProjects.map(project => (
          <ProjectCard 
            key={project._id}
            title={project.name}
            description={project.description}
            imgUrl={project.image.url}
            link={project.link}
            technologies={project.technologies}
          />
        ))}
      </div>
    </TabPanel>

    {/* Category-specific Tabs */}
    {projectsData.projects.map((category) => (
      <TabPanel key={category._id} value={category.categoryName} className="p-0">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{category.categoryName}</h3>
          <p className="text-gray-400">Projects showcasing our {category.categoryName.toLowerCase()} expertise</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.name}
              description={project.description}
              imgUrl={project.image.url}
              link={project.link}
              technologies={project.technologies}
            />
          ))}
        </div>
      </TabPanel>
    ))}
  </TabsBody>
</Tabs>

        <Image
          className="absolute top-20 right-0 w-1/3 max-w-md z-[-4] opacity-30"
          src={colorSharp2}
          alt="background-shape"
          priority
        />
      </div>
    </section>
  );
};