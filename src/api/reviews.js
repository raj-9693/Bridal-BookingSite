import { reviewsDummy } from "../data/reviews.js";

// .env me VITE_API_URL=https://your-server.com/api
// Server: GET {VITE_API_URL}/reviews  ->  reviews.js jaisa object.
// URL nahi hoga to dummy data chalega.
const API = import.meta.env.VITE_API_URL;

export async function fetchReviews() {
  if (API) {
    const res = await fetch(`${API}/reviews`);
    if (!res.ok) throw new Error("Could not load reviews");
    return res.json();
  }
  await new Promise((r) => setTimeout(r, 500)); // loading state dikhane ke liye
  return reviewsDummy;
}
