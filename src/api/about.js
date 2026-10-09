import { aboutDummy } from "../data/about.js";

// .env me VITE_API_URL=https://your-server.com/api
// Server: GET {VITE_API_URL}/about  ->  about.js jaisa object. URL nahi hoga to dummy chalega.
const API = import.meta.env.VITE_API_URL;

export async function fetchAbout() {
  if (API) {
    const res = await fetch(`${API}/about`);
    if (!res.ok) throw new Error("Could not load about");
    return res.json();
  }
  await new Promise((r) => setTimeout(r, 500));
  return aboutDummy;
}
