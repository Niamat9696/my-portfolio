import { getCredibilityItems } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Credibility() {
  const items = getCredibilityItems();

  return (
    <section aria-label="Credibility highlights" className="border-y border-border py-10">
      <Container>
        <div className="grid grid-cols-2 gap-y-8 divide-border sm:grid-cols-2 md:grid-cols-4 md:divide-x">
          {items.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08} className="px-4 text-center md:px-6">
              {item.value && (
                <p className="font-mono text-2xl font-semibold text-foreground sm:text-3xl">
                  {item.value}
                </p>
              )}
              <p className="mt-1 text-sm text-foreground-secondary">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
