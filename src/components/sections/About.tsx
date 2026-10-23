import { getAbout, getNavigation } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CV_FILENAME, CV_PATH } from "@/constants/site";
import { withBasePath } from "@/lib/base-path";

export function About() {
  const about = getAbout();
  const navigation = getNavigation();

  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={about.sectionLabel} heading={about.heading} />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <Reveal delay={0.1} className="lg:pl-12">
            {about.paragraphs[0] && (
              <div className="relative border-l-2 border-primary pl-5 sm:pl-7">
                <span className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-accent shadow-[0_0_0_5px_rgba(34,211,238,0.08)]" aria-hidden="true" />
                <p className="max-w-[62ch] text-lg font-medium leading-8 text-foreground sm:text-xl sm:leading-9">
                  {about.paragraphs[0]}
                </p>
              </div>
            )}

            <div className="mt-9 grid gap-7 border-t border-white/8 pt-8 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {about.paragraphs.slice(1).map((paragraph, index) => (
                <div key={paragraph}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary-light">
                    {index === 0 ? "Across the stack" : "Built for the long term"}
                  </p>
                  <p className="mt-3 max-w-[58ch] text-base leading-7 text-foreground-secondary">
                    {paragraph}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex items-center gap-4">
              <Button href={withBasePath(CV_PATH)} download={CV_FILENAME} variant="secondary">
                {navigation.downloadCvLabel}
              </Button>
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-secondary/50 sm:inline">
                Full experience &amp; skills
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:pt-2">
            <div className="surface-grid relative overflow-hidden rounded-2xl border border-white/10 bg-card/75 p-6 shadow-[0_24px_80px_-48px_rgba(34,211,238,0.45)] sm:p-8">
              <div className="absolute right-0 top-0 h-24 w-24 bg-accent/5 blur-3xl" aria-hidden="true" />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                {about.summaryPanel.title}
              </p>
              <ul className="mt-6">
                {about.summaryPanel.items.map((focusItem, index) => (
                  <li key={focusItem} className="flex items-center gap-3 border-t border-white/8 py-3.5 text-sm text-foreground-secondary first:border-0 first:pt-0">
                    <span className="font-mono text-[10px] text-primary">0{index + 1}</span>
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
