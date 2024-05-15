import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "quaternary";
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  onClick,
  children,
}) => {
  // Determine the CSS class based on the variant
  let buttonClass = "";

  switch (variant) {
    case "primary":
      buttonClass +=
        "text-[#112D31] border-[1.5px] border-[#112D31] font-bold shadow-[0_0_3px_3px_rgba(195,234,240,1)]";
      break;
    case "secondary":
      buttonClass += "border-[1.5px] border-[#AAABAA] text-[#555555]";
      break;
    case "tertiary":
      buttonClass +=
        "text-[#112D31]  border-dashed border-[1.5px] border-[#112D31] font-bold";
      break;
    case "quaternary":
      buttonClass +=
        "border-dashed border-[1.5px] border-[#AAABAA] text-[#555555]";
      break;
    default:
      break;
  }

  return (
    <button
      className={buttonClass + " min-w-max rounded-lg px-2 py-1 text-sm"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
