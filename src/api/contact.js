import { contactDummy } from "../data/contact.js";

// .env me VITE_API_URL=https://your-server.com/api
// URL nahi hoga to dummy data chalega.
const API = import.meta.env.VITE_API_URL;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// GET /contact
export async function fetchContact() {
  if (API) {
    const res = await fetch(`${API}/contact`);
    if (!res.ok) throw new Error("Could not load contact details");
    return res.json();
  }
  await wait(400);
  return contactDummy;
}

// POST /enquiries
export async function submitEnquiry(payload) {
  if (API) {
    const res = await fetch(`${API}/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Could not send enquiry");
    return res.json();
  }
  await wait(700);
  return { ok: true };
}
