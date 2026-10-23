import { getAchievements, getAchievementsSectionCopy } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Achievements() {
  const items = getAchievements();
  if (items.length === 0) return null;

  const copy = getAchievementsSectionCopy();

  return (
    <section id="achievements" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 sm:grid-cols-2">
          {items.map((achievement, index) => (
            <Reveal
              key={achievement.id}
              delay={index * 0.06}
              className="bg-background p-6 transition-colors hover:bg-card/70 sm:p-8"
            >
              <p className="font-mono text-[10px] text-primary">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{achievement.title}</h3>
              <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                {achievement.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
