"use client";
import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { useTranslation } from '@/hooks/useTranslation';
import { useDirection } from '@/hooks/useDirection';

type Props = {}

const FAQ = (props: Props) => {
    const { t, locale } = useTranslation();
    const { isRTL, getTextAlign } = useDirection();
    
    // Pass both type and language to the query
    const { data, isLoading } = useGetHeroDataQuery({ 
        type: "FAQ", 
        lang: locale 
    }, {});
    
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setQuestions(data.layout?.faq || []);
        }
    }, [data]);

    const toggleQuestion = (id: any) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    };

    return (
        <section className={`w-full py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-b dark:from-[#070b1b] dark:to-[#111C43] ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="max-w-4xl mx-auto">
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-lg text-black dark:text-white">
                            {t('faq.loading')}
                        </p>
                    </div>
                ) : (
                    <>
                        <h1 className={`${styles.title} text-2xl sm:text-3xl md:text-4xl text-center mb-8 sm:mb-10 md:mb-12`}>
                            {t('faq.title')}
                        </h1>
                        
                        <div className="space-y-6">
                            {questions?.length > 0 ? (
                                <dl className="space-y-4 sm:space-y-6">
                                    {questions.map((q) => (
                                        <div 
                                            key={q._id}
                                            className={`${
                                                q._id !== questions[0]?._id && "border-t border-gray-200 dark:border-gray-700"
                                            } pt-4 sm:pt-6 transition-all duration-200`}
                                        >
                                            <dt className="text-base sm:text-lg">
                                                <button
                                                    className={`flex items-center justify-between w-full ${isRTL ? 'text-right' : 'text-left'} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-2 sm:p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                                                    onClick={() => toggleQuestion(q._id)}
                                                    aria-expanded={activeQuestion === q._id}
                                                    aria-controls={`faq-${q._id}`}
                                                >
                                                    <span className={`font-medium text-black dark:text-white ${isRTL ? 'text-right' : 'text-left'} ${isRTL ? 'order-2' : 'order-1'}`}>
                                                        {q.question}
                                                    </span>
                                                    <span className={`${isRTL ? 'mr-4 order-1' : 'ml-4 order-2'} flex-shrink-0`}>
                                                        {activeQuestion === q._id ? (
                                                            <HiMinus className="h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-white" />
                                                        ) : (
                                                            <HiPlus className="h-5 w-5 sm:h-6 sm:w-6 text-black dark:text-white" />
                                                        )}
                                                    </span>
                                                </button>
                                            </dt>
                                            {activeQuestion === q._id && (
                                                <dd 
                                                    id={`faq-${q._id}`}
                                                    className={`mt-2 ${isRTL ? 'pr-2 sm:pr-4 pl-6 sm:pl-8' : 'pl-2 sm:pl-4 pr-6 sm:pr-8'} animate-fadeIn`}
                                                >
                                                    <p className={`text-sm sm:text-base font-Poppins text-gray-700 dark:text-gray-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                                                        {q.answer}
                                                    </p>
                                                </dd>
                                            )}
                                        </div>
                                    ))}
                                </dl>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        {t('faq.noFaqsAvailable')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default FAQ;
