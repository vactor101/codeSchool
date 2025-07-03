import { useGetContactMessagesQuery } from "@/redux/features/portfolio/portfolioApi";
import React, { useState } from "react";
import MessageCard from "./MessageCard";
import { ImSpinner11 } from "react-icons/im";

const ContactMessages = ({ user }: { user: any }) => {
  const { isLoading, data, refetch, isFetching, isError } =
    useGetContactMessagesQuery(undefined);
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <div className="w-full pl-6 800px:pl-10">
      <h1 className="text-black dark:text-white text-2xl text-center font-bold mb-10">
        Contact Messages
      </h1>
      <button
        disabled={isLoading || isFetching}
        onClick={refetch}
        className={`w-10 h-10 duration-300 bg-[#0d288d] rounded flex justify-center items-center ml-auto mb-5`}
      >
        <ImSpinner11
          className={`${isLoading || isFetching ? "animate-spin" : ""} `}
        />
      </button>
      {isError ? (
        <div className="col-span-full p-5 rounded-lg text-2xl text-black dark:text-white font-bold bg-[#0d288d] text-center">
          something went wrong please try again
        </div>
      ) : (
        <>
          {isLoading || isFetching ? (
            <div className="overflow-hidden">
              <div className="h-[120px] bg-gray-300 animate-pulse mb-1 rounded-lg"></div>
              <div className="h-[120px] bg-gray-300 animate-pulse mb-1 rounded-lg"></div>
              <div className="h-[120px] bg-gray-300 animate-pulse mb-1 rounded-lg"></div>
            </div>
          ) : (
            <>
              {data.contacts.length > 0 ? (
                data.contacts.map((message: any, index: number) => (
                  <MessageCard
                    handleOpen={handleOpen}
                    message={message}
                    open={open}
                    key={message._id}
                    index={index + 1}
                  />
                ))
              ) : (
                <div className="col-span-full p-5 rounded-lg text-2xl text-black dark:text-white font-bold bg-[#0d288d] text-center">
                  there is no message
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ContactMessages;
