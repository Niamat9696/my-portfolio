/** Formats an ISO "YYYY-MM" string as "Mon YYYY"; returns null for unconfirmed dates. */
export function formatMonthYear(value: string | null): string | null {
  if (!value) return null;
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return null;
  return new Date(year, month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function formatDateRange(
  startDate: string | null,
  endDate: string | null,
  isCurrent: boolean,
  presentLabel: string,
): string | null {
  const start = formatMonthYear(startDate);
  const end = isCurrent ? presentLabel : formatMonthYear(endDate);

  if (start && end) return `${start} — ${end}`;
  if (start) return start;
  if (end) return end;
  return null;
}
