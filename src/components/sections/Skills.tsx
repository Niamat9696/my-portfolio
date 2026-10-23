import { getSkillGroups, getSkillsSectionCopy } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechPill } from "@/components/ui/TechPill";
import { Reveal } from "@/components/ui/Reveal";
import { Bot, Braces, CloudCog, Code2, Database, GitBranch, KeyRound, PlugZap } from "lucide-react";

const iconMap = {
  frontend: Code2,
  backend: Braces,
  databases: Database,
  "auth-security": KeyRound,
  ai: Bot,
  "cloud-devops": CloudCog,
  integrations: PlugZap,
  tools: GitBranch,
} as const;

export function Skills() {
  const copy = getSkillsSectionCopy();
  const groups = getSkillGroups();

  return (
    <section id="skills" className="section-shell scroll-mt-24 border-y border-white/6 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => {
            const Icon = iconMap[group.id as keyof typeof iconMap] ?? Code2;
            return (
            <Reveal key={group.id} delay={index * 0.05} className={`group rounded-2xl border border-white/8 bg-card/55 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 sm:p-6 ${index === 0 || index === 5 ? "lg:col-span-2" : ""}`}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">
                  {group.label}
                </h3>
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/8 bg-white/[0.025] text-primary transition-colors group-hover:text-accent">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.technologies.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
            </Reveal>
          )})}
        </div>
      </Container>
    </section>
  );
}
