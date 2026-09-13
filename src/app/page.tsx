import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Process } from "@/components/sections/Process";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import {
  getConfiguredSocialLinks,
  getContact,
  getHero,
  getPersonalInfo,
  getUiLabels,
} from "@/lib/content";

export default function Home() {
  const personal = getPersonalInfo();
  const hero = getHero();
  const contact = getContact();
  const socialLinks = getConfiguredSocialLinks();
  const uiLabels = getUiLabels();

  return (
    <>
      <Hero hero={hero} personal={personal} socialLinks={socialLinks} uiLabels={uiLabels} />
      <Credibility />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Process />
      <Achievements />
      <Contact contact={contact} personal={personal} socialLinks={socialLinks} />
    </>
  );
}
