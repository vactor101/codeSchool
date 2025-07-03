import Image from "next/image";
import React, { FC, useState } from "react";
import avatarDefault from "../../../public/assests/avatar.png";
import { RiLockPasswordLine, RiUser3Line, RiSettings3Line } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout, AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineAdminPanelSettings, MdOutlineDashboard } from "react-icons/md";
import { IoIosImages, IoMdNotifications } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { FaMessage, FaChevronRight, FaChevronLeft, FaGraduationCap } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { BiMenu, BiX, BiUser } from "react-icons/bi";
import { HiOutlineAcademicCap } from "react-icons/hi";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useDirection } from "@/hooks/useDirection";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
  isMobileMenuOpen?: boolean;
  toggleMobileMenu?: () => void;
};

interface MenuItem {
  id: number;
  titleKey: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  condition?: boolean;
  badge?: string;
  badgeColor?: string;
  category?: 'main' | 'portfolio' | 'admin';
}

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
  isMobileMenuOpen = false,
  toggleMobileMenu,
}) => {
  const { t } = useTranslation();
  const { isRTL } = useDirection();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Define menu items using the exact translation keys from lib/translations.ts
  const menuItems: MenuItem[] = [
    // Main Menu Items
    {
      id: 1,
      titleKey: t("sidebar.myAccount"),
      icon: <RiUser3Line size={18} />,
      onClick: () => {
        setActive(1);
        if (toggleMobileMenu && isMobileMenuOpen) toggleMobileMenu();
      },
      category: 'main'
    },
    {
      id: 2,
      titleKey: t("sidebar.changePassword"),
      icon: <RiLockPasswordLine size={18} />,
      onClick: () => {
        setActive(2);
        if (toggleMobileMenu && isMobileMenuOpen) toggleMobileMenu();
      },
      category: 'main'
    },
    {
      id: 3,
      titleKey: t("sidebar.enrolledCourses"),
      icon: <HiOutlineAcademicCap size={18} />,
      onClick: () => {
        setActive(3);
        if (toggleMobileMenu && isMobileMenuOpen) toggleMobileMenu();
      },
      badge: user?.courses?.length > 0 ? user.courses.length.toString() : undefined,
      badgeColor: "bg-gradient-to-r from-blue-500 to-blue-600",
      category: 'main'
    },
    
    // Portfolio Menu Items
    {
      id: 4,
      titleKey: user?.portfolioExist ? t("sidebar.viewMessages") : t("sidebar.addPortfolio"),
      icon: user?.portfolioExist ? <FaMessage size={18} /> : <IoIosImages size={18} />,
      onClick: () => {
        setActive(4);
        if (toggleMobileMenu && isMobileMenuOpen) toggleMobileMenu();
      },
      badge: user?.portfolioExist && user?.unreadMessages > 0 ? user.unreadMessages.toString() : undefined,
      badgeColor: "bg-gradient-to-r from-red-500 to-red-600",
      category: 'portfolio'
    },
    {
      id: 5,
      titleKey: t("sidebar.editPortfolio"),
      icon: <CiEdit size={18} />,
      onClick: () => {
        setActive(5);
        if (toggleMobileMenu && isMobileMenuOpen) toggleMobileMenu();
      },
      condition: user?.portfolioExist === true,
      category: 'portfolio'
    },
    {
      id: 8,
      titleKey: t("sidebar.viewPortfolio"),
      icon: <IoIosImages size={18} />,
      href: user?.portfolioUserName ? `/portfolio/${user.portfolioUserName}` : "#",
      condition: user?.portfolioExist === true && user?.portfolioUserName,
      category: 'portfolio'
    },
    
    // Admin Menu Items
    {
      id: 7,
      titleKey: t("sidebar.adminDashboard"),
      icon: <MdOutlineAdminPanelSettings size={18} />,
      href: "/admin",
      condition: user?.role === "admin",
      category: 'admin'
    },
  ];

  // Logout item using exact translation key
  const logoutItem: MenuItem = {
    id: 6,
    titleKey: t("sidebar.logout"),
    icon: <AiOutlineLogout size={18} />,
    onClick: () => {
      logOutHandler();
      if (toggleMobileMenu && isMobileMenuOpen) toggleMobileMenu();
    },
  };

  // Helper function to get user role translation using exact keys from translations
  const getUserRoleTranslation = (role: string): string => {
    if (!role) return t("sidebar.user");
    
    const normalizedRole = role.toLowerCase();
    
    switch(normalizedRole) {
      case 'admin':
        return t("sidebar.admin");
      case 'instructor':
      case 'teacher':
        return t("sidebar.instructor");
      case 'user':
      case 'student':
      default:
        return t("sidebar.user");
    }
  };

  // Helper function to get category titles using exact keys from translations
  const getCategoryTitle = (category: string): string => {
    switch(category) {
      case 'main':
        return t("profile.mainMenu");
      case 'portfolio':
        return t("profile.portfolioMenu");
      case 'admin':
        return t("profile.adminMenu");
      default:
        return "";
    }
  };

  // Helper function to check if user has portfolio access
  const hasPortfolioAccess = (): boolean => {
    return user?.portfolioExist === true || user?.role === 'admin' || user?.role === 'instructor';
  };

  // Helper function to get filtered menu items by category
  const getMenuItemsByCategory = (category: string): MenuItem[] => {
    return menuItems.filter(item => {
      if (item.category !== category) return false;
      if (item.condition === false) return false;
      if (category === 'portfolio' && !hasPortfolioAccess() && item.id !== 4) {
        return false;
      }
      return true;
    });
  };

  // Render category title
  const renderCategoryTitle = (category: string) => {
    if (isCollapsed) return null;
    
    const title = getCategoryTitle(category);
    if (!title) return null;

    return (
      <div className={`px-4 py-3 ${isRTL ? 'text-right' : 'text-left'}`}>
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {title}
        </h4>
      </div>
    );
  };

  // Render individual menu item
  const renderMenuItem = (item: MenuItem) => {
    if (item.condition === false) return null;

    const isActive = active === item.id;
    const isHovered = hoveredItem === item.id;
    
    const baseClasses = `
      group relative flex items-center w-full px-4 py-3 my-1 rounded-xl
      transition-all duration-300 ease-in-out cursor-pointer
      ${isRTL ? 'flex-row-reverse' : 'flex-row'}
      ${isActive 
        ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/25 transform scale-[1.02]' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20'
      }
      ${isHovered && !isActive ? 'bg-gray-50 dark:bg-gray-800/50 transform scale-[1.01]' : ''}
    `;

    const content = (
      <div
        className={baseClasses}
        onClick={item.onClick}
        onMouseEnter={() => setHoveredItem(item.id)}
        onMouseLeave={() => setHoveredItem(null)}
      >
        {/* Icon */}
        <div className={`flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'}`}>
          <div className={`
            p-2.5 rounded-xl transition-all duration-200
            ${isActive 
              ? 'bg-white/20 shadow-lg' 
              : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30'
            }
          `}>
            {React.cloneElement(item.icon as React.ReactElement, {
              className: `${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400'}`
            })}
          </div>
        </div>

        {/* Text and Badge */}
        <div className={`flex-1 ${isCollapsed ? 'hidden' : 'block'} ${isRTL ? 'text-right' : 'text-left'}`}>
          <span className="font-medium text-sm">
            {item.titleKey}
          </span>
          {item.badge && (
            <span className={`
              inline-flex items-center justify-center px-2.5 py-1 ${isRTL ? 'mr-2' : 'ml-2'} text-xs font-bold 
              text-white rounded-full shadow-sm ${item.badgeColor || 'bg-gray-500'}
              animate-pulse
            `}>
              {item.badge}
            </span>
          )}
        </div>

        {/* Arrow indicator for active item */}
        {isActive && !isCollapsed && (
          <div className={`flex-shrink-0 ${isRTL ? 'mr-2' : 'ml-2'}`}>
            <div className="p-1 bg-white/20 rounded-full">
              {isRTL ? <FaChevronLeft size={10} /> : <FaChevronRight size={10} />}
            </div>
          </div>
        )}

        {/* Tooltip for collapsed state */}
        {isCollapsed && (
          <div className={`
            absolute ${isRTL ? 'right-full mr-3' : 'left-full ml-3'} top-1/2 transform -translate-y-1/2
            bg-gray-900 dark:bg-gray-700 text-white text-sm px-3 py-2 rounded-lg
            opacity-0 group-hover:opacity-100 transition-all duration-200
            pointer-events-none whitespace-nowrap z-50 shadow-lg
          `}>
            {item.titleKey}
            {item.badge && (
              <span className={`${isRTL ? 'mr-2' : 'ml-2'} px-1.5 py-0.5 text-xs rounded-full ${item.badgeColor || 'bg-gray-500'}`}>
                {item.badge}
              </span>
            )}
            <div className={`
              absolute top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45
              ${isRTL ? 'right-0 translate-x-1' : 'left-0 -translate-x-1'}
            `} />
          </div>
        )}
      </div>
    );

    return item.href ? (
      <Link key={item.id} href={item.href} className="block">
        {content}
      </Link>
    ) : (
      <div key={item.id}>
        {content}
      </div>
    );
  };

  // Group menu items by category
  const mainItems = getMenuItemsByCategory('main');
  const portfolioItems = getMenuItemsByCategory('portfolio');
  const adminItems = getMenuItemsByCategory('admin');

  return (
    <div className={`
      w-full h-full
      bg-white dark:bg-gray-900 
      flex flex-col shadow-lg
      transition-all duration-300 ease-in-out
    `} dir={isRTL ? 'rtl' : 'ltr'}>
      
   
      
      {/* Mobile Header */}
      <div className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="relative">
              <Image
                src={user.avatar?.url || avatar || avatarDefault}
                alt={t("sidebar.userAvatar")}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-200 dark:border-purple-700 shadow-md"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
            </div>
            <div className={`${isRTL ? 'mr-3 text-right' : 'ml-3 text-left'}`}>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {user.name || t("sidebar.user")}
              </h3>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                {getUserRoleTranslation(user.role)}
              </p>
            </div>
          </div>
          
          {toggleMobileMenu && (
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
            >
              <FaTimes size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* User Avatar and Info */}
          <div className={`flex items-center flex-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="relative">
              <Image
                src={user.avatar?.url || avatar || avatarDefault}
                alt={t("sidebar.userAvatar")}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border-3 border-purple-200 dark:border-purple-700 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full animate-pulse"></div>
            </div>
            
            {!isCollapsed && (
              <div className={`${isRTL ? 'mr-3 text-right' : 'ml-3 text-left'}`}>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {user.name || t("sidebar.user")}
                </h3>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  {getUserRoleTranslation(user.role)}
                </p>
              </div>
            )}
          </div>

          {/* Collapse Toggle - Desktop Only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
              p-2 rounded-lg transition-all duration-200
              hover:bg-white/50 dark:hover:bg-gray-800/50
              text-gray-600 dark:text-gray-400 hover:text-purple-600
              ${isRTL ? 'mr-2' : 'ml-2'} shadow-sm
            `}
            aria-label={t(isCollapsed ? "sidebar.expand" : "sidebar.collapse")}
          >
            {isCollapsed ? <BiMenu size={20} /> : <BiX size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {/* Main Menu Items */}
        {mainItems.length > 0 && (
          <>
            {renderCategoryTitle('main')}
            <div className="space-y-1">
              {mainItems.map(renderMenuItem)}
            </div>
          </>
        )}

        {/* Portfolio Items */}
        {portfolioItems.length > 0 && (
          <>
            <div className="pt-4">
              {renderCategoryTitle('portfolio')}
            </div>
            <div className="space-y-1">
              {portfolioItems.map(renderMenuItem)}
            </div>
          </>
        )}

        {/* Admin Items */}
        {adminItems.length > 0 && (
          <>
            <div className="pt-4">
              {renderCategoryTitle('admin')}
            </div>
            <div className="space-y-1">
              {adminItems.map(renderMenuItem)}
            </div>
          </>
        )}

        {/* Divider */}
        <div className="my-6 border-t border-gray-200 dark:border-gray-700"></div>

        {/* Logout */}
        <div className="space-y-1">
          {renderMenuItem(logoutItem)}
        </div>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("sidebar.version")} 2.0.1
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              © 2024 {t("sidebar.codeSchool")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBarProfile;
