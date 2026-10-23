/** Subtle, fixed decorative background: faint grid + two low-opacity glows. Never affects layout or readability. */
export function BackgroundEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="absolute -top-48 left-[12%] h-[440px] w-[440px] rounded-full bg-primary/12 blur-[130px]" />
      <div className="absolute top-[38%] right-[-12rem] h-[420px] w-[420px] rounded-full bg-accent/[0.07] blur-[130px]" />
    </div>
  );
}
