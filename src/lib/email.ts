/**
 * A plain `mailto:` link silently no-ops when the browser has no desktop mail
 * client configured. Route email links through Gmail's web compose window
 * instead, which always opens in the browser.
 */
export function toGmailComposeUrl(mailtoOrEmail: string): string {
  const email = mailtoOrEmail.replace(/^mailto:/, "");
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
}
