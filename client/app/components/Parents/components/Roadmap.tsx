import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import { check2, grid, loading1 } from "@/public/assests";
import { Gradient } from "./design/Roadmap";
import Image from "next/image";
import TagLine from "./Tagline";
import { Data, data } from "@/app/utils/parentsAndSchools";

const Roadmap = () => {
  const { parents }: Data = data;
  
  return (
    <Section className="overflow-hidden" id="roadmap">
      <div className="container px-4 sm:px-6 lg:px-8 pb-10 md:pb-16">
        <Heading 
          tag="Ready to get started" 
          title="What we're working on" 
          className="text-center"
        />

        <div className="relative grid gap-6 md:grid-cols-2 md:gap-6 lg:gap-8 md:pb-[7rem]">
          {parents.roadmapItems.map((item) => {
            const status = item.status === "done" ? "Done" : "In progress";

            return (
              <div
                className={`group relative p-0.25 rounded-3xl ${
                  item.colorful ? "bg-conic-gradient" : "bg-n-6"
                } transition-all duration-300 hover:shadow-lg hover:shadow-primary/20`}
                key={item.id}
              >
                <div className="relative h-full p-6 sm:p-8 lg:p-10 bg-n-8 rounded-[2.375rem] overflow-hidden">
                  {/* Grid background */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <Image
                      src={grid}
                      fill
                      className="object-cover"
                      alt="Grid background"
                    />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Date and Status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
                      <TagLine>{item.date}</TagLine>
                      <div className="flex items-center px-3 py-1 bg-n-1 rounded-full text-n-8">
                        <Image
                          className="mr-2"
                          src={item.status === "done" ? check2 : loading1}
                          width={16}
                          height={16}
                          alt={status}
                        />
                        <span className="text-xs font-medium">{status}</span>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative mb-6 md:mb-8 aspect-video rounded-xl overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={item.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h4 className="h4 mb-3 lg:mb-4">{item.title}</h4>
                      <p className="body-2 text-n-4 flex-1">{item.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Gradient />
        </div>

        <div className="flex justify-center mt-12 md:mt-16">
          <Button href="/roadmap" className="px-8 py-3">
            Our roadmap
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Roadmap;