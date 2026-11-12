export const SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];
export const MAX_DAYS_AHEAD = 90;

export function startOfDay(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
export function toKey(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
export function fromKey(k: string) {
  const [y, m, d] = k.split("-").map(Number);
  return new Date(y, m - 1, d);
}
export function addDays(d: Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
export function formatLong(d: Date) {
  const s = d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}
export function formatShort(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}
export function monthLabel(y: number, m: number) {
  const s = new Date(y, m, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/** Démonstration : dimanche fermé. */
export function isClosed(d: Date) {
  return d.getDay() === 0;
}
export function isBookable(d: Date, today = startOfDay()) {
  const max = addDays(today, MAX_DAYS_AHEAD);
  return d >= today && d <= max && !isClosed(d);
}
/** Créneaux fictifs déterministes ; aucun créneau passé pour aujourd'hui. */
export function slotsFor(d: Date, now = new Date()) {
  const seed = d.getDate() * 7 + d.getMonth() * 3;
  let list = SLOTS.filter((_, i) => (seed + i * 5) % 4 !== 0);
  if (toKey(d) === toKey(now)) {
    list = list.filter((s) => Number(s.slice(0, 2)) > now.getHours());
  }
  return list;
}
