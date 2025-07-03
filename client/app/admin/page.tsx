"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";

type Props = {};

const AdminPage = (props: Props) => {
  return (
    <AdminProtected>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0F1419] dark:to-[#111C43]">
        <Heading
          title="Code School - Admin Dashboard"
          description="Code School admin panel for managing platform content, users, courses, and analytics"
          keywords="Admin,Dashboard,Programming,MERN,Redux,Machine Learning,Analytics"
        />

        <div className="flex min-h-screen">
          {/* Sidebar */}
          <div className="fixed left-0 top-0 h-full z-50 transition-all duration-300 1500px:w-[16%] lg:w-[20%] md:w-[25%] hidden md:block">
            <AdminSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 md:ml-[25%] lg:ml-[20%] 1500px:ml-[16%] transition-all duration-300">
            <div className="p-4 lg:p-6">
              <DashboardHero isDashboard={true} />
            </div>
          </div>
        </div>

        {/* Mobile sidebar overlay can be added here if needed */}
      </div>
    </AdminProtected>
  );
};

export default AdminPage;
