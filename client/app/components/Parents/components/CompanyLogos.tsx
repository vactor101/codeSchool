import Image from "next/image";
import { companyLogos } from "@/constants";
import { Data, data } from "@/app/utils/parentsAndSchools";

const CompanyLogos = ({ className }: { className: string }) => {
  const { parents }: Data = data;
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
        {parents.sliderTextUnder}
      </h5>
      <ul className="flex">
        {parents.companyLogos.map((logo, index) => (
          <li
            className="flex items-center justify-center flex-1 h-[8.5rem]"
            key={index}
          >
            <Image src={logo} width={134} height={28} alt={logo.src} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyLogos;
