"use client";
import React, { FC, useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { check } from "../../../public/assests";
import Button from "../../components/Parents/components/Button";
import Link from "next/link";
import {
  ageRanges,
  durations,
  allCourses,
  pricingTiers,
  Course,
  PricingTier
} from '../../data';
import { smallSphere, stars } from "@/public/assests";
import { useTranslation } from '@/hooks/useTranslation';
import { useDirection } from '@/hooks/useDirection';

type Props = {};

const LearningPath: FC<Props> = () => {
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>('5-8');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRTL } = useDirection();

  const ageRanges = ['5-8', '9-13', '14-18'];
  const durations = [
    { key: 'twoMonth', value: '2 Month', label: t('learningPath.twoMonth') },
    { key: 'threeMonths', value: '3 Monthes', label: t('learningPath.threeMonths') },
    { key: 'fourMonths', value: '4 Monthes', label: t('learningPath.fourMonths') }
  ];

  useEffect(() => {
    if (selectedAgeRange) {
      const courses = allCourses.filter(course => course.ageRange === selectedAgeRange);
      setFilteredCourses(courses);
      setSelectedCourse(courses.length > 0 ? courses[0].id : '');
    } else {
      setFilteredCourses([]);
      setSelectedCourse('');
    }
  }, [selectedAgeRange]);

  const getPricingTier = () => {
    switch(selectedDuration) {
      case '2 Month': return pricingTiers.find(tier => tier.title === 'Basic');
      case '3 Monthes': return pricingTiers.find(tier => tier.title === 'Premium');
      case '4 Monthes': return pricingTiers.find(tier => tier.title === 'Enterprise');
      default: return pricingTiers[0];
    }
  };

  const currentPricingTier = getPricingTier();

  return (
    <div className={`py-8 md:py-16 !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] duration-300 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#000000c7] dark:text-white mb-6 md:mb-8">
          {t('learningPath.title')}
        </h2>
        
        <p className="text-center text-sm md:text-base text-[#000000ac] dark:text-[#edfff4] mb-8 md:mb-12">
          {t('learningPath.subtitle')}
        </p>

        {/* Age Range Selection */}
        <div className="mb-8 md:mb-12 overflow-x-auto pb-2">
          <h3 className="text-lg md:text-xl font-semibold text-[#000000c7] dark:text-white mb-4 md:mb-6"  style={{ 
      textAlign: isRTL ? 'right' : 'left',

    }}>
            {t('learningPath.selectAgeRange')}
          </h3>
          <div className="flex justify-center gap-3 md:gap-4 w-full">
            {ageRanges.map((ageRange) => (
              <button
                key={ageRange}
                onClick={() => setSelectedAgeRange(ageRange)}
                className={`relative px-6 py-4 rounded-xl text-sm md:text-base font-medium transition-all duration-300 overflow-hidden min-w-[120px] md:min-w-[140px]
                  ${selectedAgeRange === ageRange 
                    ? 'bg-gradient-to-tr from-[#b886f2] to-[#ed82c3] text-white shadow-lg md:transform md:scale-105'
                    : 'bg-white dark:bg-[#070b2b]/50 text-[#000000c7] dark:text-white hover:shadow-md border border-gray-200 dark:border-gray-700'}`}
              >
                {selectedAgeRange === ageRange && (
                  <span className="absolute inset-0 bg-white opacity-20 rounded-full scale-0 animate-ripple"></span>
                )}
                <div className="flex flex-col items-center justify-center">
                  <span className={`${selectedAgeRange === ageRange ? 'text-white' : 'text-[#b886f2] dark:text-[#ed82c3]'} text-base md:text-xl font-bold mb-1`} >
                    {ageRange} {t('learningPath.years')}
                  </span>
                  <span className="text-xs opacity-80"  style={{ 
      textAlign: isRTL ? 'right' : 'left',

    }}>
                    {selectedAgeRange === ageRange ? t('learningPath.selected') : t('learningPath.select')}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Course Images */}
        {selectedAgeRange && filteredCourses.length > 0 && (
          <div className="mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-semibold text-[#000000c7] dark:text-white mb-4 md:mb-6"  style={{ 
      textAlign: isRTL ? 'right' : 'left',

    }}>
              {t('learningPath.recommendedCourses', { age: selectedAgeRange })}
            </h3>
            <div className="w-full grid grid-cols-1 gap-8">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => setSelectedCourse(course.id)}
                  className={`w-full transition-all duration-300 cursor-pointer hover:shadow-lg rounded-lg overflow-hidden border ${
                    selectedCourse === course.id 
                      ? 'border-[#b886f2] dark:border-[#ed82c3] shadow-lg' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="relative w-full h-80 md:h-96"> 
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      className="object-fit w-full h-full"
                      sizes="(max-width: 768px) 100vw, 80vw" 
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Duration Selection 
        {selectedCourse && (
          <div className="mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-semibold text-[#000000c7] dark:text-white mb-4 md:mb-6"  style={{ 
      textAlign: isRTL ? 'right' : 'left',

    }}>
              {t('learningPath.selectDuration')}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {durations.map((duration) => (
                <button
                  key={duration.key}
                  onClick={() => setSelectedDuration(duration.value)}
                  className={`px-6 py-3 rounded-lg transition-colors text-sm md:text-base min-w-[120px] ${
                    selectedDuration === duration.value
                      ? 'bg-gradient-to-tr from-[#b886f2] to-[#ed82c3] text-white shadow-lg md:transform md:scale-105'
                      : 'bg-white dark:bg-[#070b2b]/50 text-[#000000c7] dark:text-white hover:shadow-md border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {duration.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Section */}
        {/* {selectedDuration && currentPricingTier && (
          <div className="relative z-2 mt-12">
            {/* Course and Duration Info 
            <div className="mb-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-[#000000c7] dark:text-white mb-2">
                {filteredCourses.find(c => c.id === selectedCourse)?.title}
              </h3>
              <div className="bg-[#b886f2] dark:bg-[#a06de0] text-white inline-block px-4 py-2 rounded-full mb-4">
                {t('learningPath.selectedDuration')}: {durations.find(d => d.value === selectedDuration)?.label}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md px-6 bg-n-8 border border-n-6 rounded-[2rem] py-8">
                <h4 className="h4 mb-4 text-center text-color-2">
                  {currentPricingTier.title} {t('learningPath.plan')}
                </h4>
                <p className="body-2 min-h-[4rem] mb-3 text-n-1/50 text-center">
                  {currentPricingTier.description}
                </p>

                <div className="flex items-center justify-center h-[5.5rem] mb-6">
                  {currentPricingTier.price && (
                    <>
                      <div className="h3">LE</div>
                      <div className="text-[5.5rem] leading-none font-bold">
                        {currentPricingTier.price}
                      </div>
                    </>
                  )}
                </div>

                <Button
                  className="w-full mb-6"
                  href={currentPricingTier.price ? "/pricing" : "mailto:contact@jsmastery.pro"}
                  white={!!currentPricingTier.price}
                >
                  {currentPricingTier.price ? t('learningPath.getStarted') : t('learningPath.contactUs')}
                </Button>

                <ul className="space-y-4">
                  {currentPricingTier.features.map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-start py-2 border-t border-n-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <Image src={check} width={24} height={24} alt="Check" className={isRTL ? 'ml-4' : 'mr-4'} />
                      <p className={`body-2 ${isRTL ? 'text-right' : 'text-left'}`}>{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center mt-8 md:mt-10">
              <Link
                href="/pricing"
                className="text-xs sm:text-sm font-code font-bold tracking-wider uppercase border-b border-transparent hover:border-current transition-colors duration-200 py-1"
                aria-label="View full pricing details"
              >
                {t('learningPath.seeFullDetails')}
              </Link>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default LearningPath;
