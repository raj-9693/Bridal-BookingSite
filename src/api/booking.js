import { bookingOptionsDummy } from "../data/booking.js";

// .env me VITE_API_URL=https://your-server.com/api
// URL nahi hoga to dummy data chalega.
const API = import.meta.env.VITE_API_URL;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// GET /booking/options
export async function fetchBookingOptions() {
  if (API) {
    const res = await fetch(`${API}/booking/options`);
    if (!res.ok) throw new Error("Could not load booking options");
    return res.json();
  }
  await wait(500);
  return bookingOptionsDummy;
}

// POST /bookings  -> { reference }
export async function submitBooking(payload) {
  if (API) {
    const res = await fetch(`${API}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Could not send booking");
    return res.json();
  }
  await wait(800);
  // Dummy reference: SAANJH-YYMMDD-INITIALS
  const d = (payload.date || "").replaceAll("-", "").slice(2);
  const initials = payload.name.trim().split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return { reference: `SAANJH-${d}-${initials}` };
}
