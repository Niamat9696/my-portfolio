"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import type { NavigationContent, SocialLink, UiLabels } from "@/types";

interface NavbarProps {
  navigation: NavigationContent;
  socialLinks: SocialLink[];
  uiLabels: UiLabels;
}

export function Navbar({ navigation, socialLinks, uiLabels }: NavbarProps) {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navigation.links.map((link) => link.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#" className="font-mono text-lg font-semibold text-foreground">
          {navigation.brand}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navigation.links.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:text-foreground hover:after:scale-x-100 ${
                    isActive ? "text-foreground after:scale-x-100" : "text-foreground-secondary"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {socialLinks.map((link) =>
            link.url ? (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-foreground-secondary transition-all duration-200 hover:scale-105 hover:text-primary"
              >
                <SocialIcon icon={link.icon} className="h-5 w-5" />
              </a>
            ) : null,
          )}
          <Button href="/cv" variant="primary" className="ml-1">
            {navigation.downloadCvLabel}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={uiLabels.openMenuLabel}
          className="text-foreground md:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-50 bg-background transition-opacity duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <span className="font-mono text-lg font-semibold text-foreground">
            {navigation.brand}
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label={uiLabels.closeMenuLabel}
            className="text-foreground"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-6 pt-6">
          {navigation.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-lg text-foreground-secondary transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="px-6 pt-4">
          <Button href="/cv" variant="primary" className="w-full" onClick={() => setMenuOpen(false)}>
            {navigation.downloadCvLabel}
          </Button>
        </div>

        <div className="flex gap-4 px-6 pt-8">
          {socialLinks.map((link) =>
            link.url ? (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-foreground-secondary transition-colors duration-200 hover:text-primary"
              >
                <SocialIcon icon={link.icon} className="h-5 w-5" />
              </a>
            ) : null,
          )}
        </div>
      </div>
    </header>
  );
}
