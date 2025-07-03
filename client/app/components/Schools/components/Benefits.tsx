"use client";
import { benefits } from "@/constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "@/public/assests/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "@/public/assests/svg/ClipPath";
import Image from "next/image";
import image from "@/public/assests/benefits/card-1.svg";
import Link from "next/link";
import { Data, data } from "@/app/utils/parentsAndSchools";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion, Variants } from "framer-motion"; // Import Variants type

const Benefits = () => {
  const { schools }: Data = data;
  const { locale } = useTranslation();
  const { isRTL, direction } = useDirection();

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  // Properly typed card variants
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  const hoverVariants: Variants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
      },
    },
  };

  return (
    <Section id="features" className="py-16 lg:py-24 overflow-hidden">
      <div className="container relative z-2 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Heading
            className={`max-w-md lg:max-w-2xl mx-auto ${isRTL ? "text-right" : "text-center"} capitalize`}
            title={
              locale === "ar" ? "اقرأ المزيد..." : `${schools.blogTitle} ...`
            }
            text={
              locale === "ar"
                ? "استكشف مقالاتنا المتخصصة حول تعليم البرمجة والتكنولوجيا في المدارس"
                : "Explore our specialized articles about programming and technology education in schools"
            }
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-items-center mt-12"
        >
          {schools.blogs.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="card relative w-full max-w-[24rem] p-0.5 bg-no-repeat bg-[length:100%_100%] group"
              style={{
                backgroundImage: `url(${image.src})`,
              }}
            >
              <motion.div
                variants={hoverVariants}
                className="relative z-2 flex flex-col min-h-[24rem] p-6 sm:p-8 bg-n-8 rounded-xl group-hover:shadow-2xl transition-shadow duration-300"
              >
                <h5
                  className={`h5 mb-4 text-white leading-tight ${isRTL ? "text-right" : "text-left"}`}
                >
                  {item.title}
                </h5>
                <p
                  className={`body-2 mb-6 text-n-3 line-clamp-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  {item.text.substring(0, 150)} ...
                </p>
                <div
                  className={`flex items-center mt-auto gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className="relative w-12 h-12 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={item.iconUrl}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <Link
                    href={`/blogs/${Number(item.id) + 1}`}
                    className={`${isRTL ? "mr-auto" : "ml-auto"} font-code text-xs font-bold text-n-1 uppercase tracking-wider hover:text-[#3b82f6] transition-colors flex items-center gap-2 group-hover:gap-3 transition-all duration-300`}
                    aria-label={`${locale === "ar" ? "اقرأ المزيد حول" : "Read more about"} ${item.title}`}
                  >
                    {locale === "ar" ? "اكتشف المزيد" : "Explore more"}
                    <span
                      className={`transform ${isRTL ? "rotate-180" : ""} group-hover:translate-x-1 transition-transform duration-300`}
                    >
                      <Arrow />
                    </span>
                  </Link>
                </div>
              </motion.div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8 rounded-xl overflow-hidden"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  )}
                </div>
              </div>

              <ClipPath />

              {/* Enhanced gradient overlay for Schools theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-[#1d4ed8]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`text-center mt-12 ${isRTL ? "text-right" : "text-center"}`}
        >
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {locale === "ar" ? "عرض جميع المقالات" : "View All Articles"}
            <span className={`transform ${isRTL ? "rotate-180" : ""}`}>
              <Arrow />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Enhanced styles for Schools Benefits */}
      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Enhanced card hover effects */
        .card {
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(29, 78, 216, 0.1) 100%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 1;
          border-radius: 1rem;
        }

        .card:hover::before {
          opacity: 1;
        }

        /* RTL improvements */
        [dir="rtl"] .ml-auto {
          margin-left: 0;
          margin-right: auto;
        }

        [dir="rtl"] .mr-auto {
          margin-right: 0;
          margin-left: auto;
        }
      `}</style>
    </Section>
  );
};

export default Benefits;
