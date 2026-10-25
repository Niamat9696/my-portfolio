import { ArrowDown, ArrowRight, Braces, Database, PanelsTopLeft, PlugZap, Server } from "lucide-react";

const layers = [
  { label: "Frontend", icon: PanelsTopLeft },
  { label: "API", icon: Braces },
  { label: "Services", icon: Server },
  { label: "Database", icon: Database },
  { label: "Integrations", icon: PlugZap },
];

/** Responsive system-flow summary matching the project case-study design language. */
export function ArchitectureDiagram() {
  return (
    <div className="surface-grid overflow-hidden rounded-2xl border border-white/8 bg-background/45 p-4 sm:p-6">
      <div className="flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
        {layers.map(({ label, icon: Icon }, index) => (
          <div key={label} className="contents">
            <div className="flex min-h-20 flex-1 items-center gap-3 rounded-xl border border-primary/15 bg-card/90 px-4 py-3 shadow-[0_12px_35px_-28px_rgba(59,130,246,0.8)] lg:min-w-0 lg:flex-col lg:justify-center lg:gap-2 lg:text-center">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/15 bg-primary/[0.07] icon-gradient">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground">
                {label}
              </span>
            </div>
            {index < layers.length - 1 && (
              <>
                <ArrowDown className="icon-gradient mx-auto h-4 w-4 opacity-60 lg:hidden" aria-hidden="true" />
                <ArrowRight className="icon-gradient hidden h-4 w-4 shrink-0 opacity-60 lg:block" aria-hidden="true" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
