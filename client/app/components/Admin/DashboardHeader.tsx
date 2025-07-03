"use client";
import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState, useCallback } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
      new Audio(
        "https://res.cloudinary.com/damk25wo5/video/upload/v1693465789/notification_vcetjn.mp3",
      ),
  );

  const playNotificationSound = useCallback(() => {
    audio.play();
  }, [audio]);

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread"),
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess, audio, refetch]);

  useEffect(() => {
    socketId.on("newNotification", (data) => {
      refetch();
      playNotificationSound();
    });
  }, [refetch, playNotificationSound]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="sticky top-0 z-50 bg-white/80 dark:bg-[#111C43]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - could add breadcrumbs or title here */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Admin Dashboard
          </h2>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />

          <div className="relative">
            <button
              className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setOpen(!open)}
            >
              <IoMdNotificationsOutline className="text-xl text-gray-700 dark:text-gray-300" />
              {notifications && notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium">
                  {notifications.length > 99 ? "99+" : notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {open && (
              <div className="absolute right-0 top-full mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-[#111C43] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications && notifications.length > 0 ? (
                    notifications.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {item.title}
                          </h4>
                          <button
                            className="text-xs text-blue-600 dark:text-blue-400 hover:underline ml-2 flex-shrink-0"
                            onClick={() =>
                              handleNotificationStatusChange(item._id)
                            }
                          >
                            Mark as read
                          </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {item.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {format(item.createdAt)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        No notifications
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
