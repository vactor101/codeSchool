import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState, useCallback } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  // Memoize the createPaymentIntent call to prevent unnecessary re-renders
  const handleCreatePaymentIntent = useCallback(
    (amount: number) => {
      createPaymentIntent(amount);
    },
    [createPaymentIntent]
  );

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data && userData?.user) {
      const amount = Math.round(data.course.price * 100);
      handleCreatePaymentIntent(amount);
    }
  }, [config, data, userData, handleCreatePaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <div className="min-h-screen flex flex-col">
      <Heading
        title={data?.course?.name + " - Code School" || "Course Details - Code School"}
        description={
          "Code School is a programming community which is developed by Abdallah Abd El-Nasser for helping programmers"
        }
        keywords={data?.course?.tags || []}
      />
      
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          
          <main className="flex-grow">
            <div className="w-full px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
              {stripePromise && data?.course && (
                <CourseDetails
                  data={data.course}
                  stripePromise={stripePromise}
                  clientSecret={clientSecret}
                  setRoute={setRoute}
                  setOpen={setOpen}
                />
              )}
            </div>
          </main>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default CourseDetailsPage;
