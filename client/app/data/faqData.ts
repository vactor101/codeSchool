export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  order?: number;
  active?: boolean;
}

export interface FAQData {
  en: FAQItem[];
  ar: FAQItem[];
}

export const defaultFAQData: FAQData = {
  en: [
    {
      _id: "faq_en_1",
      question: "What age groups do you teach?",
      answer:
        "We offer coding courses for children aged 6-18, with age-appropriate curricula designed for different skill levels and learning capabilities.",
      order: 1,
      active: true,
    },
    {
      _id: "faq_en_2",
      question: "Do I need any prior coding experience?",
      answer:
        "No prior experience is needed! Our courses are designed for complete beginners. We start with the basics and gradually progress to more advanced concepts.",
      order: 2,
      active: true,
    },
    {
      _id: "faq_en_3",
      question: "What programming languages do you teach?",
      answer:
        "We teach various programming languages including Python, JavaScript, Scratch, HTML/CSS, and more. The language depends on the age group and course level.",
      order: 3,
      active: true,
    },
    {
      _id: "faq_en_4",
      question: "How long are the courses?",
      answer:
        "Course duration varies from 2-4 months depending on the program. Each session is typically 1-2 hours with interactive activities and projects.",
      order: 4,
      active: true,
    },
    {
      _id: "faq_en_5",
      question: "Do you offer certificates?",
      answer:
        "Yes! Students receive certificates of completion for each course they finish, which can be added to their portfolio or academic records.",
      order: 5,
      active: true,
    },
    {
      _id: "faq_en_6",
      question: "What if my child misses a class?",
      answer:
        "All classes are recorded and available for review. We also offer makeup sessions and one-on-one support to ensure no student falls behind.",
      order: 6,
      active: true,
    },
  ],
  ar: [
    {
      _id: "faq_ar_1",
      question: "ما هي الفئات العمرية التي تدرسونها؟",
      answer:
        "نقدم دورات البرمجة للأطفال من سن 6-18 سنة، مع مناهج مناسبة للعمر مصممة لمستويات مهارات وقدرات تعلم مختلفة.",
      order: 1,
      active: true,
    },
    {
      _id: "faq_ar_2",
      question: "هل أحتاج إلى خبرة سابقة في البرمجة؟",
      answer:
        "لا تحتاج إلى أي خبرة سابقة! دوراتنا مصممة للمبتدئين تماماً. نبدأ بالأساسيات ونتقدم تدريجياً إلى المفاهيم الأكثر تقدماً.",
      order: 2,
      active: true,
    },
    {
      _id: "faq_ar_3",
      question: "ما لغات البرمجة التي تدرسونها؟",
      answer:
        "نعلم لغات برمجة متنوعة منها Python، JavaScript، Scratch، HTML/CSS، وأكثر. اللغة تعتمد على الفئة العمرية ومستوى الدورة.",
      order: 3,
      active: true,
    },
    {
      _id: "faq_ar_4",
      question: "كم مدة الدورات؟",
      answer:
        "مدة الدورة تتراوح من 2-4 أشهر حسب البرنامج. كل جلسة عادة 1-2 ساعة مع أنشطة تفاعلية ومشاريع.",
      order: 4,
      active: true,
    },
    {
      _id: "faq_ar_5",
      question: "هل تقدمون شهادات؟",
      answer:
        "نعم! الطلاب يحصلون على شهادات إتمام لكل دورة ينهونها، والتي يمكن إضافتها إلى ملفهم الشخصي أو سجلاتهم الأكاديمية.",
      order: 5,
      active: true,
    },
    {
      _id: "faq_ar_6",
      question: "ماذا لو فوت طفلي حصة؟",
      answer:
        "جميع الحصص مسجلة ومتاحة للمراجعة. نقدم أيضاً جلسات تعويضية ودعم فردي لضمان عدم تأخر أي طالب.",
      order: 6,
      active: true,
    },
  ],
};

export const getFAQByLanguage = (language: "en" | "ar"): FAQItem[] => {
  return defaultFAQData[language] || defaultFAQData.en;
};
