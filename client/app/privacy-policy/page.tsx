"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Privacy Policy");

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] transition-colors duration-500">
      <Heading
        title="Privacy Policy - Code School"
        description="Learn how Code School collects, uses, and protects your personal information"
        keywords="privacy policy, data protection, code school privacy"
      />
      <Header 
        activeItem={5}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />
      
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Policy Content */}
          <div className="bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-8 md:p-12">
              <div className="space-y-12">
                {/* Introduction */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">1</span>
                    Introduction
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      Welcome to Code School (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                    </p>
                  </div>
                </section>

                {/* Information We Collect */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">2</span>
                    Information We Collect
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      We may collect personal information that you voluntarily provide to us when you register, enroll in courses, or communicate with us, including:
                    </p>
                    <ul className="space-y-2 pl-5">
                      {[
                        "Name, email address, and contact information",
                        "Payment and billing information",
                        "Student performance and progress data",
                        "Technical information (IP address, browser type, device information)"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">3</span>
                    How We Use Your Information
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      We use the information we collect to:
                    </p>
                    <ul className="space-y-2 pl-5">
                      {[
                        "Provide and maintain our services",
                        "Process transactions and send confirmations",
                        "Personalize your learning experience",
                        "Improve our website and services",
                        "Communicate with you about courses and updates",
                        "Ensure compliance with our terms and policies"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                {/* Data Security */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">4</span>
                    Data Security
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
                    </p>
                  </div>
                </section>

                {/* Cookies and Tracking */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">5</span>
                    Cookies and Tracking Technologies
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      We use cookies and similar tracking technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings.
                    </p>
                  </div>
                </section>

                {/* Third-Party Services */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">6</span>
                    Third-Party Services
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      We may employ third-party companies to facilitate our services (payment processors, analytics providers). These third parties have access to your information only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.
                    </p>
                  </div>
                </section>

                {/* Children's Privacy */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">7</span>
                    Children&apos;s Privacy
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      Our services are intended for students of all ages, but we require parental consent for children under 13 (or the applicable age in your jurisdiction). We do not knowingly collect personal information from children without verification of parental consent.
                    </p>
                  </div>
                </section>

                {/* Your Rights */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">8</span>
                    Your Rights
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      Depending on your location, you may have rights to:
                    </p>
                    <ul className="space-y-2 pl-5">
                      {[
                        "Access, correct, or delete your personal information",
                        "Object to or restrict processing of your data",
                        "Request data portability",
                        "Withdraw consent (where applicable)"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300">
                      To exercise these rights, please contact us at privacy@codeschool.com.
                    </p>
                  </div>
                </section>

                {/* Changes to Policy */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">9</span>
                    Changes to This Policy
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our website and updating the &ldquo;Last Updated&rdquo; date.
                    </p>
                  </div>
                </section>

                {/* Contact Us */}
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                    <span className="w-6 h-6 bg-purple-500 rounded-full mr-3 flex items-center justify-center text-white text-sm">10</span>
                    Contact Us
                  </h2>
                  <div className="pl-9 space-y-3">
                    <p className="text-gray-700 dark:text-gray-300">
                      If you have questions about this Privacy Policy, please contact us at:
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-3">
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Email:</span> privacy@codeschool.com<br />
                        <span className="font-medium">Address:</span> Nasr City, Cairo, Egypt
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
