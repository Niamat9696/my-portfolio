import { ArrowDown } from "lucide-react";

const layers = ["Frontend", "API", "Services", "Database", "External Integrations"];

/** Simple vertical architecture flow diagram matching the design system, per spec section 14. */
export function ArchitectureDiagram() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-8">
      {layers.map((layer, index) => (
        <div key={layer} className="flex flex-col items-center gap-2">
          <div className="rounded-lg border border-border bg-background-secondary px-6 py-3 font-mono text-sm text-foreground">
            {layer}
          </div>
          {index < layers.length - 1 && (
            <ArrowDown className="h-4 w-4 text-foreground-secondary" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}
