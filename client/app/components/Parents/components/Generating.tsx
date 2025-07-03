/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Logonet from "@/public/assests/Logonet.png";
import { data, Data } from "@/app/utils/parentsAndSchools";

const Generating = ({ className }: { className: string }) => {
  const { parents }: Data = data;
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <Image className="w-5 h-5 mr-4" src={Logonet} alt="Loading" />
      {parents.sliderInfo}
    </div>
  );
};

export default Generating;
