/** Seuls des choix NON sensibles sont conservés (sessionStorage, durée de l'onglet). */
export interface BookingChoice {
  service: string | null;
  date: string | null; // YYYY-MM-DD
  slot: string | null;
}
const KEY = "ekohfit-demo-booking";

export function saveBooking(b: BookingChoice) {
  try { sessionStorage.setItem(KEY, JSON.stringify(b)); } catch { /* stockage indisponible */ }
}
export function loadBooking(): BookingChoice | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BookingChoice) : null;
  } catch { return null; }
}
export function clearBooking() {
  try { sessionStorage.removeItem(KEY); } catch { /* noop */ }
}
