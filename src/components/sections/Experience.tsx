import { getExperience, getExperienceSectionCopy, getUiLabels } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechPill } from "@/components/ui/TechPill";
import { Reveal } from "@/components/ui/Reveal";
import { formatDateRange } from "@/lib/format-date";

export function Experience() {
  const copy = getExperienceSectionCopy();
  const entries = getExperience();
  const uiLabels = getUiLabels();

  return (
    <section id="experience" className="scroll-mt-24 py-24">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>

        <div className="relative mt-12 space-y-10 border-l border-border pl-8">
          {entries.map((entry, index) => {
            const dateRange = formatDateRange(
              entry.startDate,
              entry.endDate,
              entry.isCurrent,
              uiLabels.presentLabel,
            );

            return (
              <Reveal key={entry.id} delay={index * 0.08} className="relative">
                <span
                  className="absolute -left-[2.31rem] top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary"
                  aria-hidden="true"
                />

                <h3 className="text-xl font-semibold text-foreground">{entry.position}</h3>
                <p className="mt-1 text-foreground-secondary">{entry.company}</p>
                {dateRange && (
                  <p className="mt-1 font-mono text-xs text-foreground-secondary/70">
                    {dateRange}
                  </p>
                )}

                {entry.description && (
                  <p className="mt-4 max-w-[65ch] text-base leading-relaxed text-foreground-secondary">
                    {entry.description}
                  </p>
                )}

                {entry.achievements.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {entry.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2 text-sm text-foreground-secondary"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}

                {entry.technologies.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.technologies.map((tech) => (
                      <TechPill key={tech} label={tech} />
                    ))}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
