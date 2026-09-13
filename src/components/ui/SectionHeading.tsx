interface SectionHeadingProps {
  label: string;
  heading: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  heading,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"} ${className}`.trim()}>
      <p className="font-mono text-sm tracking-wide text-primary">{label}</p>
      <h2 className="mt-3 text-[clamp(1.75rem,1.35rem+2vw,3rem)] font-semibold leading-tight tracking-tight text-foreground text-balance">
        {heading}
      </h2>
    </div>
  );
}
