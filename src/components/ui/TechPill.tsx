interface TechPillProps {
  label: string;
  className?: string;
}

export function TechPill({ label, className = "" }: TechPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-white/8 bg-white/[0.025] px-2.5 py-1 font-mono text-[11px] text-foreground-secondary transition-all duration-200 hover:-translate-y-px hover:border-accent/45 hover:bg-accent/[0.05] hover:text-foreground ${className}`.trim()}
    >
      {label}
    </span>
  );
}
