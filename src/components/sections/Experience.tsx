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
    <section id="experience" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>

        <div className="relative mt-14 space-y-8 before:absolute before:bottom-8 before:left-[9px] before:top-4 before:w-px before:bg-linear-to-b before:from-violet before:via-primary/40 before:to-transparent">
          {entries.map((entry, index) => {
            const dateRange = formatDateRange(
              entry.startDate,
              entry.endDate,
              entry.isCurrent,
              uiLabels.presentLabel,
            );

            return (
              <Reveal key={entry.id} delay={index * 0.08} className="relative pl-10 sm:pl-14">
                <span
                  className="absolute left-0 top-7 z-10 h-[19px] w-[19px] rounded-full border-[5px] border-background bg-gradient-logo-dot shadow-[0_0_0_1px_rgba(124,58,237,0.4)]"
                  aria-hidden="true"
                />

                <article className="rounded-2xl border border-white/8 bg-card/45 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 sm:p-7">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{entry.position}</h3>
                    <p className="mt-1 text-sm font-medium text-gradient-logo">{entry.company}</p>
                  </div>
                  {dateRange && (
                    <p className="shrink-0 rounded-full border border-white/8 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-foreground-secondary">
                      {dateRange}
                    </p>
                  )}
                </div>

                {entry.description && (
                  <p className="mt-5 max-w-[70ch] text-base leading-7 text-foreground-secondary">
                    {entry.description}
                  </p>
                )}

                {entry.achievements.length > 0 && (
                  <ul className="mt-5 grid gap-2.5 lg:grid-cols-2 lg:gap-x-8">
                    {entry.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex items-start gap-2.5 text-sm leading-6 text-foreground-secondary"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gradient-logo-dot"
                          aria-hidden="true"
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}

                {entry.technologies.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-white/7 pt-5">
                    {entry.technologies.map((tech) => (
                      <TechPill key={tech} label={tech} />
                    ))}
                  </div>
                )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
