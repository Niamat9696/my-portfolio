"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { toGmailComposeUrl } from "@/lib/email";
import type { ContactContent, PersonalInfo, SocialLink } from "@/types";

interface ContactProps {
  contact: ContactContent;
  personal: PersonalInfo;
  socialLinks: SocialLink[];
}

const iconMap = { github: GithubIcon, linkedin: LinkedinIcon, mail: Mail } as const;

export function Contact({ contact, personal, socialLinks }: ContactProps) {
  const [toastVisible, setToastVisible] = useState(false);

  async function handleCopyEmail() {
    if (!personal.email) return;
    await navigator.clipboard.writeText(personal.email);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-sm tracking-wide text-primary">{contact.sectionLabel}</p>
          <h2 className="mt-3 whitespace-pre-line text-[clamp(1.75rem,1.35rem+2vw,3rem)] font-semibold leading-tight tracking-tight text-foreground">
            {contact.heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {contact.description}
          </p>

          {personal.location && (
            <p className="mt-3 text-sm text-foreground-secondary">{personal.location}</p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {personal.email && (
              <>
                <Button href={toGmailComposeUrl(personal.email)} variant="primary" external>
                  {contact.ctaLabel}
                </Button>
                <Button variant="secondary" onClick={handleCopyEmail}>
                  {contact.copyEmailLabel}
                </Button>
              </>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            {socialLinks.map((link) => {
              if (!link.url) return null;
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              if (!Icon) return null;
              const isMail = link.url.startsWith("mailto:");
              return (
                <a
                  key={link.platform}
                  href={isMail ? toGmailComposeUrl(link.url) : link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  className="text-foreground-secondary transition-all duration-200 hover:scale-105 hover:text-primary"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </Container>

      <Toast message={contact.copiedLabel} visible={toastVisible} />
    </section>
  );
}
