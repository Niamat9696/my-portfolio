import { getConfiguredSocialLinks, getFooter, getPersonalInfo } from "@/lib/content";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { toGmailComposeUrl } from "@/lib/email";

export function Footer() {
  const footer = getFooter();
  const personal = getPersonalInfo();
  const socialLinks = getConfiguredSocialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-background-secondary/30">
      <div className="mx-auto flex max-w-320 flex-col items-center gap-5 px-5 py-10 text-center sm:px-7 lg:flex-row lg:justify-between lg:px-8 lg:text-left">
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url.startsWith("mailto:") ? toGmailComposeUrl(link.url) : link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className="text-foreground-secondary transition-all duration-200 hover:scale-105 hover:text-accent"
            >
              <SocialIcon icon={link.icon} className="h-5 w-5" />
            </a>
          ))}
        </div>
        <div className="lg:order-first">
          <p className="text-sm text-foreground-secondary">
            © {year} {personal.name}. {footer.tagline}
          </p>
          {footer.builtWithLabel && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-foreground-secondary/60">{footer.builtWithLabel}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
