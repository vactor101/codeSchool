"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import KidsProfile from "@/app/components/Admin/KidsProfile/KidsProfile";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

const page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Code School - Admin"
          description="Code School is a platform for students to learn and get help from teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <KidsProfile />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
