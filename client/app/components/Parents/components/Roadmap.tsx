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
    <Section className="overflow-hidden relative" id="roadmap">
      <div className="container px-4 sm:px-6 lg:px-8 pb-12 md:pb-20">
        {/* Enhanced Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <Heading
            tag="Ready to get started"
            title="What we're working on"
            className="mb-6"
          />
          <p className="text-n-3 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover our exciting roadmap and upcoming features that will
            enhance your child&apos;s learning experience.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="relative grid gap-8 lg:grid-cols-2 xl:gap-10 pb-12 md:pb-20">
          {parents.roadmapItems.map((item, index) => {
            const status = item.status === "done" ? "Done" : "In progress";

            return (
              <div
                className={`group relative p-1 rounded-3xl ${
                  item.colorful
                    ? "bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600"
                    : "bg-gradient-to-br from-gray-600 to-gray-700"
                } transition-all duration-500 hover:shadow-2xl hover:scale-105 card-hover animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                key={item.id}
              >
                <div className="relative h-full min-h-[300px] p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-n-8 via-n-7 to-n-8 rounded-[2.375rem] overflow-hidden backdrop-blur-xl">
                  {/* Enhanced Grid background */}
                  <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <Image
                      src={grid}
                      fill
                      className="object-cover"
                      alt="Grid background"
                    />
                  </div>

                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 animate-pulse-slow"></div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Enhanced Date and Status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
                      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                        <TagLine className="text-white font-medium">
                          {item.date}
                        </TagLine>
                      </div>
                      <div
                        className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                          item.status === "done"
                            ? "bg-green-500/20 text-green-300 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            item.status === "done"
                              ? "bg-green-400"
                              : "bg-yellow-400"
                          } animate-pulse`}
                        ></div>
                        <Image
                          className="mr-2"
                          src={item.status === "done" ? check2 : loading1}
                          width={16}
                          height={16}
                          alt={status}
                        />
                        <span>{status}</span>
                      </div>
                    </div>

                    {/* Enhanced Image */}
                    <div className="relative mb-6 md:mb-8 aspect-video rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={item.imageUrl}
                        fill
                        className="object-cover"
                        alt={item.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-purple-200 transition-colors duration-300">
                        {item.title}
                      </h4>
                      <p className="text-n-3 leading-relaxed text-sm sm:text-base flex-1">
                        {item.text}
                      </p>

                      {/* Progress indicator for in-progress items */}
                      {item.status !== "done" && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-n-4 mb-2">
                            <span>Progress</span>
                            <span>75%</span>
                          </div>
                          <div className="w-full bg-n-6 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse"
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Call-to-Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-purple-100 mb-6">
              Join our community and help shape the future of coding education
              for kids.
            </p>
            <Button
              white
              className="px-8 py-3 transform hover:scale-105 transition-all duration-300"
            >
              Get Started Today
            </Button>
          </div>
        </div>
      </div>

      <Gradient />

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-pink-400 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
    </Section>
  );
};

export default Roadmap;
