             "use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutMutation } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import AddPortfolio from "./AddPortfolio";
import GetPortfolioPage from "../getPortfolio/GetPortfolioPage";
import ContactMessages from "./ContactMessages/ContactMessages";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUser, FaLock, FaPortrait, FaEnvelope, FaEdit, FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UserAuth from "../../hooks/userAuth";

type Props = {
  user: any;
};
const Profile: FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

  // Replace useLogOutQuery with useLogOutMutation
  const [logOutMutation] = useLogOutMutation();

  const [active, setActive] = useState(1);

  // Update the logOutHandler to use the mutation
  const logOutHandler = async () => {
    setLogout(true);
    await logOutMutation(undefined);
    await signOut();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses);
    }
  }, [data,user.courses]);

  const getPageTitle = () => {
    switch (active) {
      case 1:
        return t("profile.myAccountTitle");
      case 2:
        return t("profile.changePasswordTitle");
      case 3:
        return t("profile.enrolledCoursesTitle");
      case 4:
        return user?.portfolioExist ? t("profile.viewMessagesTitle") : t("profile.addPortfolioTitle");
      case 5:
        return t("profile.editPortfolioTitle");
      case 8:
        return t("profile.viewPortfolioTitle");
      default:
        return t("profile.myAccountTitle");
    }
  };

  const getPageIcon = () => {
    switch (active) {
      case 1:
        return <FaUser className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 2:
        return <FaLock className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 3:
        return <FaGraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 4:
        return user?.portfolioExist ? <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" /> : <FaPortrait className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 5:
        return <FaEdit className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 8:
        return <FaPortrait className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <FaUser className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const isAuthenticated = UserAuth();

  if (isAuthenticated === "loading") {
    // Optionally, show a loading spinner here
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#E290AD] bg-gray-50 dark:bg-gray-950" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className={`flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 ${isRTL ? 'ml-3' : 'mr-3'}`}
            >
              {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            
            <div className={`flex items-center flex-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg ${isRTL ? 'ml-3' : 'mr-3'}`}>
                {getPageIcon()}
              </div>
              <div className="flex-1">
                <h1 className={`text-lg font-bold text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                  {getPageTitle()}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className={`flex gap-6 lg:gap-8 ${isRTL ? 'flex-row' : 'flex-row'}`}>
          
          {/* Sidebar */}
          <div className={`
            ${isMobileMenuOpen ? 'block' : 'hidden'} lg:block
            fixed lg:relative top-0 left-0 w-full h-full lg:w-auto lg:h-auto
            z-50 lg:z-auto
            ${isRTL ? 'lg:order-2' : 'lg:order-1'}
          `}>
            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={toggleMobileMenu}
              />
            )}
            
            {/* Sidebar Container */}
            <div className={`
              ${isMobileMenuOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'} 
              lg:translate-x-0
              fixed lg:relative
              ${isRTL ? 'right-0 lg:right-auto' : 'left-0 lg:left-auto'}
              top-0 lg:top-auto
              w-80 lg:w-[320px] xl:w-[350px]
              h-full lg:h-auto
              transition-transform duration-300 ease-in-out
              z-50 lg:z-auto
            `}>
              <div className={`
                h-full lg:h-auto
                lg:sticky lg:top-24
                bg-white dark:bg-gray-900 
                border-r border-gray-200 dark:border-gray-700
                ${isRTL ? 'border-r-0 border-l' : ''}
                rounded-none lg:rounded-xl 
                shadow-xl lg:shadow-lg
                overflow-hidden
              `}>
                <SideBarProfile
                  user={user}
                  active={active}
                  avatar={avatar}
                  setActive={setActive}
                  logOutHandler={logOutHandler}
                  isMobileMenuOpen={isMobileMenuOpen}
                  toggleMobileMenu={toggleMobileMenu}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`
            flex-1 min-w-0
            ${isRTL ? 'lg:order-1' : 'lg:order-2'}
          `}>
            
            {/* Desktop Page Header */}
            <motion.div 
              className="hidden lg:block w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  {getPageIcon()}
                </div>
                <div className="flex-1">
                  <h1 className={`text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white ${isRTL ? 'text-right' : 'text-left'}`}>
                    {getPageTitle()}
                  </h1>
                  <p className={`text-gray-600 dark:text-gray-400 mt-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t("profile.welcomeBack")}, {user.name}!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div
              key={active}
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {active === 1 && (
                <div className="p-4 sm:p-6 lg:p-8">
                  <ProfileInfo avatar={avatar} user={user} />
                </div>
              )}

              {active === 2 && (
                <div className="p-4 sm:p-6 lg:p-8">
                  <ChangePassword />
                </div>
              )}

              {active === 3 && (
                <div className="p-4 sm:p-6 lg:p-8">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="relative">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                        <div className="absolute inset-0 animate-ping rounded-full h-12 w-12 border border-purple-300 opacity-20"></div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {courses && courses.length > 0 ? (
                        <>
                          <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                              {t("profile.yourCourses")}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                              {t("profile.coursesCount", { count: courses.length })}
                            </p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                            {courses.map((item: any, index: number) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="h-full"
                              >
                                <CourseCard item={item} isProfile={true} />
                              </motion.div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="py-16 sm:py-20 text-center">
                          <div className="flex justify-center mb-6">
                            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
                              <FaGraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
                            </div>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            {t("profile.noCourses")}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            {t("profile.noCoursesDesc")}
                          </p>
                          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg">
                            {t("profile.browseCourses")}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {active === 4 && (
                <div className="p-4 sm:p-6 lg:p-8">
                  {!user.portfolioExist ? (
                    <AddPortfolio user={user} />
                  ) : (
                    <ContactMessages user={user} />
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
