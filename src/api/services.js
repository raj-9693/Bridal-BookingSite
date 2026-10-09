import { servicesDummy } from "../data/services.js";

// .env me VITE_API_URL=https://your-server.com/api
// Server: GET {VITE_API_URL}/services  ->  services.js jaisa object.
// URL nahi hoga to dummy data chalega. Result cache hota hai (Booking page bhi use karta hai).
const API = import.meta.env.VITE_API_URL;
let cache = null;

export function fetchServices() {
  if (cache) return cache;
  cache = (async () => {
    if (API) {
      const res = await fetch(`${API}/services`);
      if (!res.ok) throw new Error("Could not load services");
      return res.json();
    }
    await new Promise((r) => setTimeout(r, 500)); // loading state dikhane ke liye
    return servicesDummy;
  })().catch((e) => { cache = null; throw e; });
  return cache;
}
