import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  const { data: userData, refetch } = useLoadUserQuery(undefined, {});
  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  const discountPercentage = ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased = user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    } else {
      setRoute("Login");
      openAuthModal(true);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="w-full flex flex-col lg:flex-row gap-8">
          {/* Left Column - Course Content */}
          <div className="w-full lg:w-[65%] lg:pr-6">
            <h1 className="text-2xl sm:text-3xl font-Poppins font-semibold text-black dark:text-white">
              {data.name}
            </h1>
            
            {/* Ratings and Students */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 gap-4">
              <div className="flex items-center gap-2">
                <Ratings rating={data.ratings} />
                <span className="text-black dark:text-white">
                  {data.reviews?.length} Reviews
                </span>
              </div>
              <span className="text-black dark:text-white">
                {data.purchased} Students
              </span>
            </div>

            {/* Benefits Section */}
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl font-Poppins font-semibold text-black dark:text-white mb-4">
                What you will learn from this course?
              </h2>
              <ul className="space-y-3">
                {data.benefits?.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="flex-shrink-0 text-black dark:text-white mt-1"
                    />
                    <p className="text-black dark:text-white">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Prerequisites Section */}
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl font-Poppins font-semibold text-black dark:text-white mb-4">
                What are the prerequisites for starting this course?
              </h2>
              <ul className="space-y-3">
                {data.prerequisites?.map((item: any, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="flex-shrink-0 text-black dark:text-white mt-1"
                    />
                    <p className="text-black dark:text-white">
                      {item.title}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Course Content */}
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl font-Poppins font-semibold text-black dark:text-white mb-4">
                Course Overview
              </h2>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </section>

            {/* Course Description */}
            <section className="mt-8">
              <h2 className="text-xl sm:text-2xl font-Poppins font-semibold text-black dark:text-white mb-4">
                Course Details
              </h2>
              <p className="text-base sm:text-lg whitespace-pre-line text-black dark:text-white">
                {data.description}
              </p>
            </section>

            {/* Reviews Section */}
            <section className="mt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <Ratings rating={data?.ratings} />
                <h3 className="text-xl font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating • {data?.reviews?.length} Reviews
                </h3>
              </div>
              
              <div className="space-y-6">
                {(data?.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) => (
                  <div key={index} className="pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 flex-shrink-0">
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          width={48}
                          height={48}
                          alt={item.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <h4 className="text-lg font-medium text-black dark:text-white">
                            {item.user.name}
                          </h4>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="mt-2 text-black dark:text-white">
                          {item.comment}
                        </p>
                        <time className="text-sm text-gray-500 dark:text-gray-400 mt-1 block">
                          {format(item.createdAt)}
                        </time>

                        {/* Comment Replies */}
                        {item.commentReplies.map((i: any, idx: number) => (
                          <div key={idx} className="mt-4 pl-4 sm:pl-8 border-l-2 border-gray-200 dark:border-gray-600">
                            <div className="flex gap-3">
                              <div className="w-10 h-10 flex-shrink-0">
                                <Image
                                  src={
                                    i.user.avatar
                                      ? i.user.avatar.url
                                      : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                  }
                                  width={40}
                                  height={40}
                                  alt={i.user.name}
                                  className="w-10 h-10 rounded-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-medium">{i.user.name}</h5>
                                  <VscVerifiedFilled className="text-blue-500" />
                                </div>
                                <p className="mt-1">{i.comment}</p>
                                <time className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                                  {format(i.createdAt)}
                                </time>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Purchase Section */}
          <div className="w-full lg:w-[35%]">
            <div className="sticky top-24 space-y-6">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              
              {/* Pricing */}
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                  {data.price === 0 ? "Free" : `$${data.price}`}
                </h2>
                {data.estimatedPrice > 0 && (
                  <>
                    <span className="text-lg line-through opacity-70 text-black dark:text-white">
                      ${data.estimatedPrice}
                    </span>
                    <span className="text-lg font-medium text-green-600 dark:text-green-400">
                      {discountPercentagePrice}% Off
                    </span>
                  </>
                )}
              </div>

              {/* Purchase Button */}
              <div className="flex justify-center">
                {isPurchased ? (
                  <Link
                    href={`/course-access/${data._id}`}
                    className={`${styles.button} !w-full max-w-xs !bg-green-600 hover:!bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <button
                    onClick={handleOrder}
                    className={`${styles.button} !w-full max-w-xs !bg-red-600 hover:!bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors`}
                  >
                    Buy Now {data.price > 0 ? `$${data.price}` : ''}
                  </button>
                )}
              </div>

              {/* Features List */}
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-black dark:text-white">
                  <IoCheckmarkDoneOutline className="text-green-500" />
                  Source code included
                </li>
                <li className="flex items-center gap-2 text-black dark:text-white">
                  <IoCheckmarkDoneOutline className="text-green-500" />
                  Full lifetime access
                </li>
                <li className="flex items-center gap-2 text-black dark:text-white">
                  <IoCheckmarkDoneOutline className="text-green-500" />
                  Certificate of completion
                </li>
                <li className="flex items-center gap-2 text-black dark:text-white">
                  <IoCheckmarkDoneOutline className="text-green-500" />
                  Premium Support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoCloseOutline size={28} />
              </button>
            </div>
            <div className="p-6">
              {stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckOutForm 
                    setOpen={setOpen} 
                    data={data} 
                    user={user} 
                    refetch={refetch} 
                  />
                </Elements>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;