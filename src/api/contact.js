// POST /enquiries
// (GET ab api/Apiclients/ContactClient.js se aata hai. POST abhi pehle jaisa hai.)
// .env me VITE_API_URL=https://your-server.com/api ; URL nahi hoga to dummy "ok" milta hai.
const API = import.meta.env.VITE_API_URL;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

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
