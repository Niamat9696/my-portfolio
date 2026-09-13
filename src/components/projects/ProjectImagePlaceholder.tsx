/** Tasteful abstract technical preview used when a project has no real screenshot yet (spec section 52). */
export function ProjectImagePlaceholder({ title }: { title: string }) {
  return (
    <div
      role="img"
      aria-label={`${title} preview placeholder`}
      className="relative flex h-full w-full items-center justify-center overflow-hidden bg-background-secondary"
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#1e293b" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute h-40 w-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
      <span className="relative font-mono text-sm text-foreground-secondary/70">
        {"<project />"}
      </span>
    </div>
  );
}
