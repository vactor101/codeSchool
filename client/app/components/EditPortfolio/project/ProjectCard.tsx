import Image from "next/image";

interface Props {
  title: string;
  description: string;
  imgUrl: string;
  link: string;
}
export const ProjectCard = ({ title, description, imgUrl, link }: Props) => {
  return (
    <a
      href={link}
      target="_blank"
      className="lg:col-span-4 sm:col-span-6 col-span-12 block"
    >
      <div className="relative rounded-3xl overflow-hidden mb-6 group">
        <div
          className="absolute opacity-85 w-full h-0 duration-500 group-hover:h-full"
          style={{
            background:
              "linear-gradient(90.21deg, #AA367C -5.91%, #4A2FBD 111.58%)",
          }}
        />
        <Image
          src={imgUrl}
          alt="project image"
          width={1000}
          height={500}
          className="object-cover h-[255px] w-full"
        />
        <div className="absolute text-center top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 w-full group-hover:top-1/2 group-hover:opacity-100 duration-300 text-white">
          <h4 className="text-2xl font-bold tracking-[0.8px] leading-[1.1em]">
            {title}
          </h4>
          <span className="italic font-normal tracking-[0.8px]">
            {description}
          </span>
        </div>
      </div>
    </a>
  );
};
