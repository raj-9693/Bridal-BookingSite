// DUMMY DATA — baad me server se aayega (src/api/services.js dekho).
// Server ko GET /services par is shape ka JSON dena hai:
// {
//   packages: [{ id, name, tagline, price (number), priceNote, image, popular (bool),
//                features: [4 short lines for the card], includes: [keys from comparisonFeatures] }],
//   comparisonFeatures: [{ key, label }],
//   faqs: [{ id, question, answer }],
//   note: "text under the cards"
// }
const img = (seed) => `https://picsum.photos/seed/saanjh-${seed}/700/520`;

export const servicesDummy = {
  packages: [
    { id: "bridal-makeup", name: "Bridal Makeup", tagline: "For the main ceremony", price: 18000, priceNote: "onwards",
      image: img("pkg-bridal"), popular: false,
      features: ["Personal beauty consultation", "HD or airbrush complexion", "Hair styling & dupatta setting", "Touch-up kit"],
      includes: ["consultation", "styling", "touchup"] },
    { id: "bridal-mehndi", name: "Bridal Mehndi", tagline: "For hands that tell a story", price: 7500, priceNote: "onwards",
      image: img("pkg-mehndi"), popular: false,
      features: ["Custom bridal design", "Premium natural henna", "Both hands & feet", "Aftercare guidance"],
      includes: ["consultation", "mehndi"] },
    { id: "combo", name: "Combo Package", tagline: "The complete Saanjh edit", price: 32000, priceNote: "onwards",
      image: img("pkg-combo"), popular: true,
      features: ["Bridal makeup & hair", "Bridal mehndi design", "One pre-wedding look", "Priority date support"],
      includes: ["consultation", "styling", "mehndi", "prewedding", "touchup"] },
    { id: "party-makeup", name: "Party Makeup", tagline: "For every celebration after", price: 8500, priceNote: "onwards",
      image: img("pkg-party"), popular: false,
      features: ["Soft glam or festive makeup", "Event-ready hair styling", "Lashes included", "60-minute session"],
      includes: ["styling"] },
  ],
  comparisonFeatures: [
    { key: "consultation", label: "Personal consultation" },
    { key: "styling", label: "Makeup & hair styling" },
    { key: "mehndi", label: "Bridal mehndi" },
    { key: "prewedding", label: "Pre-wedding event look" },
    { key: "touchup", label: "Touch-up kit" },
  ],
  faqs: [
    { id: 1, question: "Can I book a bridal makeup trial?",
      answer: "Yes. Trials are available for bridal makeup bookings and are best scheduled 6–10 weeks before your celebration. We use the session to refine your skin finish, eye mood and hair direction." },
    { id: 2, question: "Do you travel for weddings?",
      answer: "Yes, we take destination and on-location bookings across India. Travel and stay are planned with you during your consultation." },
    { id: 3, question: "What advance payment secures my date?",
      answer: "A booking advance confirms your date and artist. The amount depends on your package and is shared with your quote after the consultation." },
    { id: 4, question: "Which products do you use?",
      answer: "We use skin-friendly, long-wear professional products chosen for your skin type and the weather on your day. Please share any allergies or sensitivities when you book." },
  ],
  note: "Final pricing is shaped by your event date, city, ceremony timing and bridal party needs. A custom quote follows your consultation.",
};
