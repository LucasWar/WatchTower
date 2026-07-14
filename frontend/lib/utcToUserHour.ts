export function utcToUserHour(
  utcDate: string | Date,
  includeDate?: number
): string {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const date = new Date(utcDate);

  if (includeDate === 1) {
    return date.toLocaleString("pt-BR", {
      timeZone: timezone,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return date.toLocaleTimeString("pt-BR", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}