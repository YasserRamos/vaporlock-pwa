import type { HTMLAttributes, ReactNode } from "react";

type ComicPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  accent?: "red" | "orange" | "teal";
};

const accents = {
  red: "border-t-[#bd4034]",
  orange: "border-t-[#e38a42]",
  teal: "border-t-[#5ca8a0]",
};

export default function ComicPanel({
  children,
  accent = "orange",
  className = "",
  ...props
}: ComicPanelProps) {
  return (
    <div
      className={`comic-panel border-t-[6px] ${accents[accent]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
