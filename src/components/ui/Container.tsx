import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centered content container shared across the site. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-320 px-5 sm:px-7 lg:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
