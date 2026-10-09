// DUMMY DATA — baad me server se aayega (src/api/reviews.js dekho).
// Server ko GET /reviews par is shape ka JSON dena hai:
// {
//   summary: { average, total, distribution: {5,4,3,2,1}, text, note },
//   testimonials: [{ id, name, meta, quote, rating, image? }],   // image wala card photo-card banta hai
//   messages: [{ id, name, text, time }]                          // WhatsApp-style notes (6 dikhte hain: 3 upar, 3 neeche)
// }
const img = (seed) => `https://picsum.photos/seed/saanjh-${seed}/700/525`;

export const reviewsDummy = {
  summary: {
    average: 4.9,
    total: 200,
    distribution: { 5: 188, 4: 12, 3: 0, 2: 0, 1: 0 },
    text: "Across intimate ceremonies, grand celebrations, and every ritual in between.",
    note: "Based on verified client feedback collected after the wedding day.",
  },
  testimonials: [
    { id: 1, name: "Naina Shah", meta: "Jaipur wedding · March 2025", rating: 5, image: img("naina"),
      quote: "I felt like myself, only softer and more luminous. Every detail held through the final dance." },
    { id: 2, name: "Rhea Malhotra", meta: "Udaipur wedding · January 2025", rating: 5,
      quote: "Saanjh heard my vision before I could say it. The morning felt calm, considered, and so special." },
    { id: 3, name: "Ananya Rao", meta: "Delhi wedding · December 2024", rating: 5,
      quote: "The photographs glow because I did. I would choose this gentle, gifted team again and again." },
  ],
  messages: [
    { id: 1, name: "Tanya Kapoor", time: "11:42 AM", text: "Saanjh, I cannot stop looking at the photos. My skin looked like skin—just the happiest version of it. Thank you for keeping me so calm. 🤍" },
    { id: 2, name: "Meher Arora", time: "8:18 PM", text: "The haldi look lasted through all the hugs, tears and dancing. You understood exactly what I wanted. Still floating! ✨" },
    { id: 3, name: "Ishita Bansal", time: "10:06 PM", text: "Mumma said I looked like myself on my most beautiful day. That is everything I hoped for. Sending you the biggest hug! 🌸" },
    { id: 4, name: "Kavya Menon", time: "9:30 AM", text: "My mehndi is still so dark and the design is exactly what I imagined. Everyone keeps asking who made it! 🌿" },
    { id: 5, name: "Sana Qureshi", time: "7:55 PM", text: "You made the whole morning feel unhurried. I actually enjoyed getting ready, which I never thought I would. Thank you! 💛" },
    { id: 6, name: "Riya Desai", time: "12:20 PM", text: "My mum, aunts and I all looked like one beautiful story. Every moment of the Bride tribe booking was worth it. 🥹" },
  ],
};
