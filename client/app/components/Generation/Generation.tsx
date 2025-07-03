"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { Code, X, Play, Pause, MessageCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Link from "next/link";
import Image from "next/image"; // Add this import
import {
  Leader,
  Project,
  Tool,
  leaders,
  projects,
  tools,
  getLocalizedLeader,
  getLocalizedProject,
  getLocalizedTool,
  getLocalizedContent,
} from "../../data";
import DemoButton from "../BookButton/DemoButton";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";

const Generation: React.FC = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const { t, locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  // Get localized data
  const localizedLeaders = leaders.map((leader) =>
    getLocalizedLeader(leader, locale),
  );
  const localizedProjects = projects.map((project) =>
    getLocalizedProject(project, locale),
  );
  const localizedTools = tools.map((tool) => getLocalizedTool(tool, locale));

  // Animation controls
  const leadersControls = useAnimation();
  const projectsControls = useAnimation();
  const leadersContainerRef = useRef<HTMLDivElement>(null);
  const projectsContainerRef = useRef<HTMLDivElement>(null);

  // Animation functions - wrapped in useCallback to prevent unnecessary re-renders
  const startLeadersAnimation = useCallback(async () => {
    await leadersControls.start({
      x: ["0%", "-100%"],
      transition: {
        duration: 30,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [leadersControls]);

  const startProjectsAnimation = useCallback(async () => {
    await projectsControls.start({
      x: ["0%", "-100%"],
      transition: {
        duration: 40,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [projectsControls]);

  const stopAnimations = useCallback(async () => {
    await leadersControls.stop();
    await projectsControls.stop();
  }, [leadersControls, projectsControls]);

  const resetAnimations = useCallback(async () => {
    await leadersControls.start({ x: "0%" });
    await projectsControls.start({ x: "0%" });
  }, [leadersControls, projectsControls]);

  const toggleAutoScroll = () => {
    setAutoScrollEnabled(!autoScrollEnabled);
  };

  useEffect(() => {
    if (autoScrollEnabled) {
      startLeadersAnimation();
      startProjectsAnimation();
    } else {
      stopAnimations();
      resetAnimations();
    }
  }, [
    autoScrollEnabled,
    startLeadersAnimation,
    startProjectsAnimation,
    stopAnimations,
    resetAnimations,
  ]);

  const extractYoutubeId = (url: string | undefined): string | null => {
    if (!url) return null;

    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleLeaderClick = (leader: Leader) => {
    const videoId = extractYoutubeId(leader.video);

    if (!videoId) {
      toast.error(t("generation.invalidYouTubeUrl"));
      return;
    }

    setSelectedLeader(leader);
    setYoutubeId(videoId);
    setIsPlaying(true);
    setAutoScrollEnabled(false);
  };

  const closeModal = () => {
    setSelectedLeader(null);
    setYoutubeId(null);
    setIsPlaying(false);
    setAutoScrollEnabled(true);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          toast.error(t("generation.failedToPlayVideo") + ": " + error.message);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#b886f2] to-[#ed82c3] dark:from-[#070b1b] dark:to-[#111C43] transition-colors duration-500"
      dir={direction}
    >
      {/* Tools Section */}
      <section className="py-8 bg-white dark:bg-[#070b1b]">
        <div className="container mx-auto px-4">
          <h2
            className={`text-4xl font-bold text-center mb-8 text-black dark:text-white text-center`}
          >
            {t("generation.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {localizedTools.map((tool, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#111C43] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 me-4">
                    <Image
                      src={tool.icon}
                      alt={tool.title}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white flex-1">
                    {tool.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Tech Leaders with Auto-scroll */}
      <section className="py-8 bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43]">
        <div className="container mx-auto px-4 overflow-hidden">
          {/* Centered Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-black dark:text-white">
              {t("generation.meetTechLeaders")}
            </h2>
          </div>

          {/* Leaders Scroll Section */}
          <div
            className="relative overflow-hidden py-4"
            onMouseEnter={() => setAutoScrollEnabled(false)}
            onMouseLeave={() => setAutoScrollEnabled(true)}
          >
            <motion.div
              className="flex gap-8 w-max"
              animate={leadersControls}
              ref={leadersContainerRef}
            >
              {[...localizedLeaders, ...localizedLeaders].map(
                (leader, index) => (
                  <motion.div
                    key={`${index}-${leader.img}`}
                    className="flex-shrink-0 w-72 relative group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleLeaderClick(leader)}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-xl h-full">
                      <div className="relative w-full h-96">
                        <Image
                          src={leader.img}
                          alt={leader.name || t("generation.student")}
                          fill
                          className="object-cover transform group-hover:scale-105 transition duration-300"
                          sizes="(max-width: 768px) 100vw, 288px"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div
                        className={`absolute bottom-4 text-white ${isRTL ? "right-4" : "left-4"}`}
                      >
                        <Code className="w-8 h-8 mb-2" />
                        <p className="text-lg font-semibold text-center">
                          {leader.age} {t("generation.yearsOld")}
                        </p>
                        <p className="text-sm opacity-90">{leader.project}</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-purple-600" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>

          {/* Action Buttons - Now positioned after the scrolling section */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <motion.button
              className="bg-gradient-to-r from-[#b886f2] to-[#ed82c3] text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => toast.success(t("generation.seeMoreStudent"))}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("generation.seeMoreStudent")}
            </motion.button>
            <motion.button
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105"
              onClick={() => {
                const number = "201140474129";
                const message =
                  locale === "ar"
                    ? encodeURIComponent(
                        "مرحبًا! أريد معرفة المزيد عن طلابكم المتميزين ومشاريعهم.",
                      )
                    : encodeURIComponent(
                        "Hello! I want to know more about your outstanding students and their projects.",
                      );
                window.open(
                  `https://wa.me/${number}?text=${message}`,
                  "_blank",
                );
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-4 h-4" />
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </motion.button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedLeader && youtubeId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-4">
            {/* YouTube Player */}
            <div className="relative bg-black rounded-t-xl overflow-hidden">
              <LiteYouTubeEmbed
                id={youtubeId}
                title={selectedLeader.name || t("generation.studentProject")}
                wrapperClass="yt-lite rounded-lg"
                playerClass="absolute inset-0 w-full h-full"
                webp={true}
                poster="hqdefault"
                noCookie={true}
              />
            </div>

            {/* Business Card */}
            <div className="bg-white dark:bg-[#111C43] p-4 rounded-b-xl shadow-2xl">
              <div
                className={`flex items-start ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`relative w-16 h-16 rounded-full overflow-hidden border-4 border-purple-500 ${isRTL ? "ml-3" : "mr-3"}`}
                >
                  <Image
                    src={selectedLeader.img}
                    alt={selectedLeader.name || t("generation.student")}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedLeader.name || t("generation.student")}
                  </h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">
                    {selectedLeader.role || t("generation.coder")}
                  </p>
                  {selectedLeader.quote && (
                    <p className="text-gray-600 dark:text-gray-300 mt-1 italic text-sm">
                      &ldquo;{selectedLeader.quote}&rdquo;
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("generation.age")}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {selectedLeader.age}
                  </p>
                </div>
                <div className={isRTL ? "text-right" : "text-left"}>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t("generation.project")}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {selectedLeader.project}
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeModal}
              className={`absolute -top-10 text-white hover:text-purple-300 transition-colors ${isRTL ? "left-0" : "right-0"}`}
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* Student Projects with Auto-scroll */}
      <section className="py-8 bg-gradient-to-b from-[#ed82c3] to-[#b886f2] dark:from-[#111C43] dark:to-[#070b1b]">
        <div className="container mx-auto px-4 overflow-hidden">
          <h2 className="text-4xl font-bold text-center mb-8 text-white">
            {t("generation.studentProjects")}
          </h2>
          <div
            className="relative overflow-hidden py-4"
            onMouseEnter={() => setAutoScrollEnabled(false)}
            onMouseLeave={() => setAutoScrollEnabled(true)}
          >
            <motion.div
              className="flex gap-8 w-max"
              animate={projectsControls}
              ref={projectsContainerRef}
            >
              {[...localizedProjects, ...localizedProjects].map(
                (project, index) => (
                  <motion.div
                    key={`${index}-${project.gif}`}
                    className="flex-shrink-0 w-96 relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300 h-full">
                      <div className="relative w-full h-64">
                        <Image
                          src={project.gif}
                          alt={project.title}
                          fill
                          className="object-cover transform group-hover:scale-110 transition duration-500"
                          sizes="(max-width: 768px) 100vw, 384px"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xl font-bold">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <Link href="/courses">
              <button
                className="bg-white text-[#E290AD] px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                onClick={() => toast.success(t("generation.exploringProjects"))}
              >
                {t("generation.exploreAllProjects")}
              </button>
            </Link>
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              onClick={() => {
                const number = "201140474129";
                const message =
                  locale === "ar"
                    ? encodeURIComponent(
                        "مرحبًا! أريد معرفة المزيد عن مشاريع الطلاب والبرامج التعليمية.",
                      )
                    : encodeURIComponent(
                        "Hello! I want to know more about student projects and educational programs.",
                      );
                window.open(
                  `https://wa.me/${number}?text=${message}`,
                  "_blank",
                );
              }}
            >
              <MessageCircle className="w-4 h-4" />
              {locale === "ar" ? "تواصل معنا" : "Contact Us"}
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-8 bg-white dark:bg-[#070b1b]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 text-black dark:text-white">
              {t("generation.readyToStart")}
            </h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              {t("generation.readyToStartDesc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DemoButton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Generation;
