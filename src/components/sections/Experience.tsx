import { getExperience, getExperienceSectionCopy, getUiLabels } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechPill } from "@/components/ui/TechPill";
import { Reveal } from "@/components/ui/Reveal";
import { formatDateRange } from "@/lib/format-date";

/** Developer-style log: each role is a "commit" on a vertical branch line. */
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

        <div className="relative mt-14 space-y-10 before:absolute before:bottom-6 before:left-[11px] before:top-6 before:w-px before:bg-linear-to-b before:from-violet before:via-primary/40 before:to-transparent sm:space-y-12">
          {entries.map((entry, index) => {
            const dateRange = formatDateRange(
              entry.startDate,
              entry.endDate,
              entry.isCurrent,
              uiLabels.presentLabel,
            );

            return (
              <Reveal key={entry.id} delay={index * 0.08} className="relative pl-11 sm:pl-16">
                <span
                  className="absolute left-0 top-6 z-10 grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-background"
                  aria-hidden="true"
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full bg-gradient-logo-dot ${entry.isCurrent ? "animate-signal" : ""}`}
                  />
                </span>

                <article className="gradient-border overflow-hidden rounded-2xl bg-card/55">
                  {/* Terminal-style header bar */}
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-white/7 bg-white/[0.02] px-5 py-3 font-mono text-[11px] uppercase tracking-wider text-foreground-secondary sm:px-7">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-gradient-logo">{entry.isCurrent ? "HEAD" : "commit"}</span>
                      <span aria-hidden="true">/</span>
                      {dateRange}
                    </span>
                    {entry.isCurrent && (
                      <span className="inline-flex items-center gap-2 text-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
                        {uiLabels.presentLabel}
                      </span>
                    )}
                  </div>

                  <div className="p-5 sm:p-7">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                      {entry.position}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-gradient-logo">{entry.company}</p>

                    {entry.description && (
                      <p className="mt-5 max-w-[70ch] text-base leading-7 text-foreground-secondary">
                        {entry.description}
                      </p>
                    )}

                    {entry.achievements.length > 0 && (
                      <ul className="mt-5 grid gap-2.5">
                        {entry.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex items-start gap-3 text-sm leading-6 text-foreground-secondary"
                          >
                            <span
                              className="mt-px shrink-0 font-mono text-sm font-semibold text-gradient-logo"
                              aria-hidden="true"
                            >
                              +
                            </span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.technologies.length > 0 && (
                      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/7 pt-5">
                        <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-foreground-secondary/70">
                          deps:
                        </span>
                        {entry.technologies.map((tech) => (
                          <TechPill key={tech} label={tech} />
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
