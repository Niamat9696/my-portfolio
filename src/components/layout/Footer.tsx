import { getConfiguredSocialLinks, getFooter, getPersonalInfo } from "@/lib/content";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { toGmailComposeUrl } from "@/lib/email";

export function Footer() {
  const footer = getFooter();
  const personal = getPersonalInfo();
  const socialLinks = getConfiguredSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-350 flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url.startsWith("mailto:") ? toGmailComposeUrl(link.url) : link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="text-foreground-secondary transition-all duration-200 hover:scale-105 hover:text-primary"
            >
              <SocialIcon icon={link.icon} className="h-5 w-5" />
            </a>
          ))}
        </div>
        <p className="text-sm text-foreground-secondary">
          © {year} {personal.name}. {footer.tagline}
        </p>
        {footer.builtWithLabel && (
          <p className="font-mono text-xs text-foreground-secondary/70">{footer.builtWithLabel}</p>
        )}
      </div>
    </footer>
  );
}
