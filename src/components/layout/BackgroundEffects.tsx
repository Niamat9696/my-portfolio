/** Subtle, fixed decorative background: faint grid + two low-opacity glows. Never affects layout or readability. */
export function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute top-1/3 right-0 h-[360px] w-[360px] rounded-full bg-accent/10 blur-[120px]" />
    </div>
  );
}
