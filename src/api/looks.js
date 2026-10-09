import { looksDummy } from "../data/looks.js";

// .env me VITE_API_URL=https://your-server.com/api rakho.
// Server ka GET {VITE_API_URL}/looks  ->  looks ka array (looks.js ka shape).
// URL nahi hoga to dummy data chalega.
const API = import.meta.env.VITE_API_URL;

export async function fetchLooks() {
  if (API) {
    const res = await fetch(`${API}/looks`);
    if (!res.ok) throw new Error("Could not load looks");
    return res.json();
  }
  return Promise.resolve(looksDummy);
}
