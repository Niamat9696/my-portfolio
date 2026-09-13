import { getProcess } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const process = getProcess();

  return (
    <section id="process" className="scroll-mt-24 py-24">
      <Container>
        <Reveal>
          <SectionHeading label={process.sectionLabel} heading={process.heading} />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3 lg:grid-cols-6">
          {process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06} className="border-t border-border pt-4">
              <span className="font-mono text-sm text-primary">{step.number}</span>
              <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
