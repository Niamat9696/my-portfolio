import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-medium active:scale-[0.97] " +
  "transition-all duration-200 ease-out focus-visible:outline-none " +
  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-logo border border-white/10 text-white px-5 py-2.5 text-sm hover:-translate-y-px hover:shadow-[0_12px_30px_-12px_rgba(124,58,237,0.75),0_8px_24px_-14px_rgba(34,211,238,0.7)] active:translate-y-0",
  secondary:
    "bg-white/[0.025] text-foreground px-5 py-2.5 text-sm border border-white/12 hover:border-accent/45 hover:bg-white/[0.055] hover:-translate-y-px active:translate-y-0",
  ghost:
    "bg-transparent text-foreground-secondary px-3 py-2 text-sm hover:text-foreground hover:bg-white/[0.03]",
  icon: "bg-transparent text-foreground-secondary p-2 hover:text-foreground hover:bg-white/[0.03] hover:scale-105",
};

interface CommonProps {
  variant?: ButtonVariant;
  className?: string;
}

interface ButtonAsLink extends CommonProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  children: ReactNode;
}

interface ButtonAsButton extends CommonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
  children: ReactNode;
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    const { href, external, ...rest } = props;
    const isMailto = href.startsWith("mailto:");
    const isExternal = !isMailto && (external === true || /^https?:\/\//.test(href));

    // Mail links and file downloads must not go through client-side routing.
    if (isMailto || rest.download !== undefined) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      );
    }

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
