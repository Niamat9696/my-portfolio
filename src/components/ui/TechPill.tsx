interface TechPillProps {
  label: string;
  className?: string;
}

export function TechPill({ label, className = "" }: TechPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-foreground-secondary transition-colors duration-200 hover:border-accent/50 hover:text-foreground ${className}`.trim()}
    >
      {label}
    </span>
  );
}
