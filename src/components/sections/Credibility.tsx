import { getCredibilityItems } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Credibility() {
  const items = getCredibilityItems();

  return (
    <section aria-label="Credibility highlights" className="relative border-y border-white/8 bg-background-secondary/35 py-8 backdrop-blur-sm">
      <Container>
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08} className="relative px-3 text-left sm:px-5 md:not-last:border-r md:border-white/8">
              {item.value && (
                <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {item.value}
                </p>
              )}
              <p className="mt-1.5 max-w-36 font-mono text-[10px] uppercase leading-4 tracking-[0.13em] text-foreground-secondary">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
