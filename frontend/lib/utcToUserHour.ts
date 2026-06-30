export function utcToUserHour(utcDate: string | Date): string {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(timezone)
  return new Date(utcDate).toLocaleTimeString("pt-BR", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}