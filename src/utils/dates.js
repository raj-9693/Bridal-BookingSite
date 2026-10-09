// Dates "YYYY-MM-DD" string me chalte hain (timezone ki dikkat nahi aati)
const pad = (n) => String(n).padStart(2, "0");
export const ymd = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
export const todayYmd = () => { const t = new Date(); return ymd(t.getFullYear(), t.getMonth(), t.getDate()); };
export const addDaysYmd = (n) => { const t = new Date(); t.setDate(t.getDate() + n); return ymd(t.getFullYear(), t.getMonth(), t.getDate()); };
export const parseYmd = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
export const formatLong = (s) =>
  s ? parseYmd(s).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "";
