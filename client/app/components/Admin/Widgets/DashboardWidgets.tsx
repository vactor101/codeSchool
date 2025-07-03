import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrdersAnalytics from "../Analytics/OrdersAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "@/redux/features/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [ordersComparePercentage, setOrdersComparePercentage] = useState<any>();
  const [userComparePercentage, setuserComparePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticsQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const usersLastTwoMonths = data.users.last12Months.slice(-2);
        const ordersLastTwoMonths = ordersData.orders.last12Months.slice(-2);

        if (
          usersLastTwoMonths.length === 2 &&
          ordersLastTwoMonths.length === 2
        ) {
          const usersCurrentMonth = usersLastTwoMonths[1].count;
          const usersPreviousMonth = usersLastTwoMonths[0].count;
          const ordersCurrentMonth = ordersLastTwoMonths[1].count;
          const ordersPreviousMonth = ordersLastTwoMonths[0].count;

          const usersPercentChange =
            usersPreviousMonth !== 0
              ? ((usersCurrentMonth - usersPreviousMonth) /
                  usersPreviousMonth) *
                100
              : 100;

          const ordersPercentChange =
            ordersPreviousMonth !== 0
              ? ((ordersCurrentMonth - ordersPreviousMonth) /
                  ordersPreviousMonth) *
                100
              : 100;

          setuserComparePercentage({
            currentMonth: usersCurrentMonth,
            previousMonth: usersPreviousMonth,
            percentChange: usersPercentChange,
          });

          setOrdersComparePercentage({
            currentMonth: ordersCurrentMonth,
            previousMonth: ordersPreviousMonth,
            percentChange: ordersPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, ordersData]);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome back! Here&apos;s what&apos;s happening with your platform.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-3 gap-6 mb-8">
        {/* Main Analytics Chart */}
        <div className="lg:col-span-2 xl:col-span-2">
          <div className="bg-white dark:bg-[#111C43] rounded-xl shadow-lg p-6 h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              User Analytics
            </h3>
            <UserAnalytics isDashboard={true} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="space-y-6">
          {/* Sales Card */}
          <div className="bg-white dark:bg-[#111C43] rounded-xl shadow-lg p-6 border-l-4 border-[#45CBA0]">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <BiBorderLeft className="text-[#45CBA0] text-2xl mr-2" />
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    Sales
                  </h5>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {ordersComparePercentage?.currentMonth || 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Orders this month
                </p>
              </div>
              <div className="text-center">
                <CircularProgressWithLabel
                  value={ordersComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <p
                  className={`text-sm mt-2 font-medium ${
                    ordersComparePercentage?.percentChange > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {ordersComparePercentage?.percentChange > 0
                    ? "+" + ordersComparePercentage?.percentChange.toFixed(1)
                    : ordersComparePercentage?.percentChange?.toFixed(1) || 0}
                  %
                </p>
              </div>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white dark:bg-[#111C43] rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <PiUsersFourLight className="text-blue-500 text-2xl mr-2" />
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    Users
                  </h5>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userComparePercentage?.currentMonth || 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  New users this month
                </p>
              </div>
              <div className="text-center">
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <p
                  className={`text-sm mt-2 font-medium ${
                    userComparePercentage?.percentChange > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(1)
                    : userComparePercentage?.percentChange?.toFixed(1) || 0}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Orders Analytics */}
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-[#111C43] rounded-xl shadow-lg p-6 h-[400px]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Orders Analytics
            </h3>
            <OrdersAnalytics isDashboard={true} />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-[#111C43] rounded-xl shadow-lg p-6 h-[400px]">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Transactions
            </h3>
            <div className="overflow-hidden">
              <AllInvoices isDashboard={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
