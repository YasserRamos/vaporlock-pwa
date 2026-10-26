import type { ButtonHTMLAttributes, ReactNode } from "react";

type ComicButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "red" | "paper" | "teal";
};

const variants = {
  red: "bg-[#bd4034] text-white",
  paper: "bg-[#f4e8cf] text-[#11131a]",
  teal: "bg-[#5ca8a0] text-[#11131a]",
};

export default function ComicButton({
  children,
  variant = "red",
  className = "",
  ...props
}: ComicButtonProps) {
  return (
    <button
      className={`comic-button ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
