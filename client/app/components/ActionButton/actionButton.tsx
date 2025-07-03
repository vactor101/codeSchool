import React from "react";
import { FaWhatsapp, FaGlobe } from "react-icons/fa";

type ButtonType = "default" | "whatsapp" | "language";

interface ActionButtonProps {
  type?: ButtonType;
  label?: string;
  onClick?: () => void;
  href?: string;
  dir?: "left" | "right"; // 'left' = LTR (English), 'right' = RTL (Arabic)
  toggleLang?: (lang: "en" | "ar") => void;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type = "default",
  label,
  onClick,
  href,
  dir = "left",
  toggleLang,
  className = "",
}) => {
  const isRTL = dir === "right";

  const handleWhatsApp = () => {
    const number = "201110050892";
    const message = isRTL
      ? encodeURIComponent("مرحبًا، لدي سؤال بخصوص الدورات التدريبية الخاصة بكم!")
      : encodeURIComponent("Hello, I have a question about your courses!");
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  const handleLanguageToggle = () => {
    const newLang = isRTL ? "en" : "ar";
    if (toggleLang) toggleLang(newLang);
  };

  const handleClick = () => {
    if (type === "whatsapp") {
      handleWhatsApp();
    } else if (type === "language") {
      handleLanguageToggle();
    } else if (onClick) {
      onClick();
    }
  };

  const renderIcon = () => {
    const iconClass = isRTL ? "ml-1" : "mr-1";
    switch (type) {
      case "whatsapp":
        return <FaWhatsapp className={`inline ${iconClass}`} />;
      case "language":
        return <FaGlobe className={`inline ${iconClass}`} />;
      default:
        return null;
    }
  };

  const getLabel = (): string => {
    if (label) return label;

    switch (type) {
      case "whatsapp":
        return isRTL ? "راسلنا على واتساب" : "Message Us on WhatsApp";
      case "language":
        return isRTL ? "English" : "العربية";
      default:
        return isRTL ? "اضغط هنا" : "Click here";
    }
  };

  const finalLabel = (
    <span className={`inline-flex items-center`}>
      {isRTL ? (
        <>
          {getLabel()}
          {renderIcon()}
        </>
      ) : (
        <>
          {renderIcon()}
          {getLabel()}
        </>
      )}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`bg-gradient-to-tr from-[#b886f2] to-[#ed82c3] bg-clip-text text-transparent hover:underline cursor-pointer ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {finalLabel}
      </a>
    );
  }

  return (
    <span
      onClick={handleClick}
      className={` bg-gradient-to-tr from-[#b886f2] to-[#ed82c3] bg-clip-text text-transparent hover:underline cursor-pointer ${className}`}
    >
      {finalLabel}
    </span>
  );
};

export default ActionButton;
