import { getFeaturedProjects, getProjectsSectionCopy, getUiLabels } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function Projects() {
  const copy = getProjectsSectionCopy();
  const projects = getFeaturedProjects();
  const uiLabels = getUiLabels();

  return (
    <section id="projects" className="section-shell scroll-mt-24 border-y border-white/6 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>
      </Container>

      <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-10">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={0.04}>
            <ProjectCard project={project} reverse={index % 2 === 1} index={index} uiLabels={uiLabels} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
