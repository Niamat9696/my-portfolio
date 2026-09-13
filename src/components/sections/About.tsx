import { getAbout, getNavigation } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function About() {
  const about = getAbout();
  const navigation = getNavigation();

  return (
    <section id="about" className="scroll-mt-24 py-24">
      <Container>
        <Reveal>
          <SectionHeading label={about.sectionLabel} heading={about.heading} />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1} className="space-y-5">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="max-w-[70ch] text-base leading-relaxed text-foreground-secondary sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
            <Button href="/cv" variant="secondary" className="mt-2">
              {navigation.downloadCvLabel}
            </Button>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-xl border border-border bg-card p-6">
              <p className="font-mono text-xs uppercase tracking-wide text-accent">
                {about.summaryPanel.title}
              </p>
              <ul className="mt-4 space-y-3">
                {about.summaryPanel.items.map((focusItem) => (
                  <li key={focusItem} className="flex items-start gap-2 text-sm text-foreground-secondary">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {focusItem}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
