// DUMMY DATA — baad me server se aayega (src/api/about.js dekho).
//
// GET /about  ->  {
//   founder: { name, heading, paragraphs[], quote, image, stats: [{ value, label }] },
//   bandStats: [{ value, label }],              // maroon band (4 numbers)
//   process: [{ n, title, text }],
//   team: [{ id, name, role, bio, years (number), tags[], image }],   // artists ke profiles
//   travel: { text, cities[] },
//   kit: { title, text, brands[], note }
// }
const img = (seed, w = 700, h = 875) => `https://picsum.photos/seed/saanjh-${seed}/${w}/${h}`;

export const aboutDummy = {
  founder: {
    name: "Riya",
    heading: "A softer way to get ready.",
    paragraphs: [
      "I began Saanjh with a simple belief: beauty on a wedding day should never feel like a costume. It should feel like recognition—your features, your rituals, your joy, brought gently into focus.",
      "For over twelve years, I have worked with brides across intimate home ceremonies and grand destination celebrations. Every look starts with a conversation, and every brushstroke has a reason.",
    ],
    quote: "A bride should look like herself, remembered beautifully.",
    image: img("riya", 800, 1040),
    stats: [
      { value: "12 years", label: "Bridal artistry" },
      { value: "650+ brides", label: "Loved looks" },
    ],
  },

  bandStats: [
    { value: "4.9/5", label: "Bride rating" },
    { value: "18", label: "Cities travelled" },
    { value: "200+", label: "Love notes" },
    { value: "1:1", label: "Personal attention" },
  ],

  process: [
    { n: "01", title: "Consultation", text: "We speak about your ceremonies, wardrobe, skin, references, and the feeling you want to carry." },
    { n: "02", title: "Your trial", text: "A relaxed studio session to refine tones, texture, hair, and every personal finishing touch." },
    { n: "03", title: "Wedding day", text: "A calm, beautifully paced morning where your look comes together without rush." },
    { n: "04", title: "Touch-ups", text: "A final check before you step out, plus thoughtful guidance for effortless wear through celebration." },
  ],

  team: [
    { id: 1, name: "Meera Joshi", role: "Lead Mehndi Artist", years: 9, tags: ["Bridal mehndi", "Rajasthani"],
      bio: "Fine-line bridal henna with story-led motifs, drawn slowly so every curve is kept.", image: img("meera") },
    { id: 2, name: "Pooja Verma", role: "Senior Dulhan Makeup Artist", years: 8, tags: ["HD finish", "Airbrush"],
      bio: "Luminous skin and a soft, long-wear bridal finish that still looks like you.", image: img("pooja") },
    { id: 3, name: "Sana Siddiqui", role: "Hair & Dupatta Stylist", years: 7, tags: ["Bridal buns", "Dupatta setting"],
      bio: "Braids, buns and veil setting that stay perfectly in place from pheras to the last dance.", image: img("sana") },
    { id: 4, name: "Aarti Nair", role: "Arabic Mehndi Artist", years: 6, tags: ["Arabic", "Guest mehndi"],
      bio: "Flowing vines with generous negative space, for brides and the whole mehndi circle.", image: img("aarti") },
    { id: 5, name: "Simran Gill", role: "Party & Reception Makeup Artist", years: 6, tags: ["Soft glam", "Reception"],
      bio: "Polished, camera-ready looks for sangeet nights, receptions and every celebration after.", image: img("simran") },
    { id: 6, name: "Neha Chawla", role: "Saree & Lehenga Draping Specialist", years: 10, tags: ["Draping", "Jewellery styling"],
      bio: "Pleats, pallus and dupattas set with care, so you can sit, dance and hug freely.", image: img("neha") },
    { id: 7, name: "Divya Menon", role: "Skin Prep & Glow Artist", years: 5, tags: ["Skin prep", "Sensitive skin"],
      bio: "Gentle skin preparation in the weeks before your wedding, so makeup sits like skin.", image: img("divya") },
    { id: 8, name: "Rohan Bhatia", role: "Groom & Family Grooming", years: 5, tags: ["Groom styling", "Family looks"],
      bio: "Clean, understated grooming for the groom and family, matched to the wedding story.", image: img("rohan") },
  ],

  travel: {
    text: "Our studio is in New Delhi, with destination bridal bookings across India and beyond. Travel planning is always handled with clarity and care.",
    cities: ["Delhi NCR", "Jaipur", "Udaipur", "Mumbai", "Goa", "Worldwide"],
  },

  kit: {
    title: "Trusted by artists. Chosen for your skin.",
    text: "We edit every kit around performance, comfort, and photography—not trends alone.",
    brands: ["MAC Cosmetics", "NARS", "Charlotte Tilbury", "Dior Beauty", "Huda Beauty", "Bobbi Brown"],
    note: "Every product is selected after your consultation, with sensitivity and undertone in mind.",
  },
};
