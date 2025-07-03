"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

const Certificate = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto rounded-3xl shadow-2xl overflow-hidden relative"
    >
      <Image
        src={require("../../../public/assests/cer.jpg")}
        alt="Certificate of Completion"
        className="w-full h-auto"
        priority
      />
    </motion.div>
  );
};

export default Certificate;