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
    <section id="projects" className="scroll-mt-24 py-24">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>
      </Container>

      <div className="mt-8 divide-y divide-border">
        {projects.map((project, index) => (
          <Reveal key={project.slug}>
            <ProjectCard project={project} reverse={index % 2 === 1} uiLabels={uiLabels} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
