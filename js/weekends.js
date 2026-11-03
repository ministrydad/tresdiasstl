/* =========================================================
   UPCOMING WEEKENDS — edit dates here.
   The Home page and the Attend a Weekend page both read this list.
   Attend a Weekend shows every weekend listed here; once one ends it is
   grayed out and marked "Weekend Passed". The Home page always shows
   the next upcoming Men's and Women's weekend.

   type:   "men" or "women"
   number: weekend number
   start / end: "YYYY-MM-DD"
   ========================================================= */
window.TD_WEEKENDS = [
  { type: "men",   number: 47, start: "2026-10-15", end: "2026-10-18" },
  { type: "men",   number: 48, start: "2027-04-08", end: "2027-04-11" },
  { type: "men",   number: 49, start: "2027-10-14", end: "2027-10-17" },
  { type: "women", number: 47, start: "2026-11-12", end: "2026-11-15" },
  { type: "women", number: 48, start: "2027-04-22", end: "2027-04-25" },
  { type: "women", number: 49, start: "2027-10-21", end: "2027-10-24" }
];

/* ---------- Helpers used by the pages (no need to edit below) ---------- */
(function () {
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const parse = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };

  function today() { const t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }

  function upcoming(type) {
    return window.TD_WEEKENDS
      .filter(w => w.type === type && parse(w.end) >= today())
      .sort((a, b) => parse(a.start) - parse(b.start));
  }

  function range(w) {
    const a = parse(w.start), b = parse(w.end);
    const sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
    if (sameMonth) return `${MONTHS[a.getMonth()]} ${a.getDate()} – ${b.getDate()}, ${b.getFullYear()}`;
    if (a.getFullYear() === b.getFullYear()) return `${MONTHS[a.getMonth()]} ${a.getDate()} – ${MONTHS[b.getMonth()]} ${b.getDate()}, ${b.getFullYear()}`;
    return `${MONTHS[a.getMonth()]} ${a.getDate()}, ${a.getFullYear()} – ${MONTHS[b.getMonth()]} ${b.getDate()}, ${b.getFullYear()}`;
  }

  window.TD = { upcoming, range, parse };
})();
