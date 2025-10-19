import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "5xl" | "7xl";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "7xl": "max-w-7xl",
};

export function PageContainer({ children, className = "", maxWidth = "7xl" }: PageContainerProps) {
  return (
    <div className={`min-h-screen pt-24 pb-16 bg-muted/30 ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto`}>{children}</div>
    </div>
  );
}
