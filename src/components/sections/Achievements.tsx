import { getAchievements, getAchievementsSectionCopy } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Achievements() {
  const items = getAchievements();
  if (items.length === 0) return null;

  const copy = getAchievementsSectionCopy();

  return (
    <section id="achievements" className="scroll-mt-24 py-24">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {items.map((achievement, index) => (
            <Reveal
              key={achievement.id}
              delay={index * 0.06}
              className="rounded-xl border border-border bg-card p-6"
            >
              <h3 className="text-lg font-semibold text-foreground">{achievement.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {achievement.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
