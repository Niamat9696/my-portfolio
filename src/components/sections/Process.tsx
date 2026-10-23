import { getProcess } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  const process = getProcess();

  return (
    <section id="process" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={process.sectionLabel} heading={process.heading} />
        </Reveal>

        <div className="relative mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-6 lg:gap-0">
          <div className="absolute left-[8%] right-[8%] top-6 hidden h-px bg-linear-to-r from-transparent via-primary/35 to-transparent lg:block" aria-hidden="true" />
          {process.steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06} className="group relative rounded-xl border border-white/8 bg-background/70 p-5 lg:rounded-none lg:border-x-0 lg:border-b-0 lg:bg-transparent lg:px-4 lg:pt-0">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-primary/30 bg-background font-mono text-xs text-primary transition-colors group-hover:border-accent/50 group-hover:text-accent">{step.number}</span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
