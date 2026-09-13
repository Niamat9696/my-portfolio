import { getSkillGroups, getSkillsSectionCopy } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechPill } from "@/components/ui/TechPill";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  const copy = getSkillsSectionCopy();
  const groups = getSkillGroups();

  return (
    <section id="skills" className="scroll-mt-24 py-24">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.06} className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-mono text-sm uppercase tracking-wide text-foreground-secondary">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.technologies.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
