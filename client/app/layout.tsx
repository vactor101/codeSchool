"use client";
import "./globals.css";
import { Poppins, Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import React, { FC, useEffect, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import socketIO from "socket.io-client";
import ButtonGradient from "@/public/assests/svg/ButtonGradient";
import { usePathname } from "next/navigation";
import WhatsAppButton from "./components/WhatsApp/WhatsAppButton";
import BookButton from "./components/BookButton/BookButton";
import { LocaleProvider } from "@/contexts/LocaleContext";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${poppins.variable} ${josefin.variable}`}>
        <LocaleProvider>
          <Providers>
            <SessionProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
              >
                <Custom>
                  <ButtonGradient />
                  <div className="overflow-hidden">{children}</div>
                </Custom>
                <Toaster position="top-center" reverseOrder={false} />
              </ThemeProvider>
            </SessionProvider>
          </Providers>
          <WhatsAppButton />
          <BookButton />
        </LocaleProvider>
      </body>
    </html>
  );
}

const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading } = useLoadUserQuery(
    {},
    {
      skip: !isMounted, // Only run the query after component mounts on client
    },
  );
  const pathname = usePathname();

  // Ensure component is mounted on client before running queries
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      socketId.on("connection", () => {});
    }
  }, [isMounted]);

  // Apply dynamic body classes based on pathname
  useEffect(() => {
    if (isMounted) {
      const bodyClasses = `${
        pathname === "/Parents" || pathname === "/Schools"
          ? "bg-n-8"
          : "!bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] duration-300"
      } duration-300`;

      document.body.className = `${poppins.variable} ${josefin.variable} ${bodyClasses}`;
    }
  }, [pathname, isMounted]);

  // Show consistent loading state during hydration
  if (!isMounted) {
    return <div>{children}</div>;
  }

  return <div>{isLoading ? <Loader /> : <div>{children}</div>}</div>;
};
