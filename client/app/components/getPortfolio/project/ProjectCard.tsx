import Image from "next/image";
import { motion } from "framer-motion"; // Optional: for animations

interface Props {
  title: string;
  description: string;
  imgUrl: string;
  link: string;
  technologies?: string[];
}

export const ProjectCard = ({ title, description, imgUrl, link, technologies }: Props) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full group"
      >
        <div className="relative h-full rounded-xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-800 group-hover:border-purple-500">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={imgUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-300 mb-4">{description}</p>
              
              {technologies && technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 bg-purple-900/50 text-purple-200 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mt-4 flex items-center text-purple-300 group-hover:text-white transition-colors">
                <span>View Project</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};