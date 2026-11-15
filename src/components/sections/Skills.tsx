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

function MarqueeChip({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-3 rounded-xl border border-white/8 bg-card/60 py-2 pl-2 pr-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent/45">
      <span
        className="grid h-8 w-8 place-items-center rounded-lg border border-white/8 bg-white/[0.03] font-mono text-xs font-semibold text-gradient-logo"
        aria-hidden="true"
      >
        {label.charAt(0).toUpperCase()}
      </span>
      {label}
    </span>
  );
}

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee">
      <div className={`marquee-track${reverse ? " reverse" : ""}`}>
        {items.map((tech) => (
          <MarqueeChip key={tech} label={tech} />
        ))}
        {/* Duplicate set makes the loop seamless; hidden from assistive tech. */}
        <div className="contents" aria-hidden="true">
          {items.map((tech) => (
            <MarqueeChip key={`dup-${tech}`} label={tech} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Skills() {
  const copy = getSkillsSectionCopy();
  const groups = getSkillGroups();

  const allTech = Array.from(new Set(groups.flatMap((group) => group.technologies)));
  const half = Math.ceil(allTech.length / 2);
  const rowA = allTech.slice(0, half);
  const rowB = allTech.slice(half);

  return (
    <section id="skills" className="section-shell scroll-mt-24 border-y border-white/6 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>
      </Container>

      <Reveal className="mt-12 space-y-3">
        <MarqueeRow items={rowA} />
        {rowB.length > 0 && <MarqueeRow items={rowB} reverse />}
      </Reveal>

      <Container>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group, index) => {
            const Icon = iconMap[group.id as keyof typeof iconMap] ?? Code2;
            return (
              <Reveal
                key={group.id}
                delay={index * 0.05}
                className={`group gradient-border relative rounded-2xl bg-card/55 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6 ${
                  index === 0 || index === 5 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/8 bg-white/[0.03] icon-gradient transition-[filter] group-hover:brightness-125">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-tight text-foreground">{group.label}</h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-secondary/70">
                      {String(group.technologies.length).padStart(2, "0")} items
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.technologies.map((tech) => (
                    <TechPill key={tech} label={tech} />
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
