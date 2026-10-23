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
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-primary/70" aria-hidden="true" />
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">{label}</p>
      </div>
      <h2 className="mt-4 max-w-3xl text-[clamp(2rem,1.45rem+2.4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground text-balance">
        {heading}
      </h2>
    </div>
  );
}
