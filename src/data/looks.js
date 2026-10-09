// DUMMY DATA — baad me server se aayega (src/api/looks.js dekho).
// Server ko isi shape me JSON dena hai:
// { id, category, label, title, bride, description, services: [], image }
const img = (seed) => `https://picsum.photos/seed/saanjh-${seed}/900/1200`;

export const looksDummy = [
  { id: 1, category: "Dulhan Makeup", label: "Dulhan makeup", title: "Rhea’s palace vows", bride: "Rhea",
    description: "Soft-focus skin, rose-toned eyes and an antique gold lip brought together a look that felt ceremonial, confident and completely Rhea.",
    services: ["Bridal makeup", "Hair styling", "Dupatta setting"], image: img("rhea") },
  { id: 2, category: "Bridal Mehndi", label: "Bridal mehndi", title: "The floral veil", bride: "Aanya",
    description: "A delicate rose, soft gold bangles and fine henna detail that framed every quiet moment of the morning.",
    services: ["Bridal mehndi", "Nail care", "Jewellery styling"], image: img("floral") },
  { id: 3, category: "Party Makeup", label: "Party makeup", title: "Meher’s evening edit", bride: "Meher",
    description: "Warm bronze eyes, a luminous base and a deep berry lip made for candlelight and long conversations.",
    services: ["Party makeup", "Soft waves", "Saree draping"], image: img("meher") },
  { id: 4, category: "Arabic Mehndi", label: "Arabic mehndi", title: "Fine line romance", bride: "Zoya",
    description: "Flowing Arabic vines with generous negative space, designed to look elegant in every photograph.",
    services: ["Arabic mehndi", "Aftercare kit"], image: img("fineline") },
  { id: 5, category: "Dulhan Makeup", label: "Haldi glow", title: "A sunlit celebration", bride: "Ananya",
    description: "Fresh dewy skin, marigold tones and flowers in the hair for a joyful, laughter-filled haldi morning.",
    services: ["Haldi makeup", "Floral hair styling"], image: img("haldi") },
  { id: 5.5, category: "Dulhan Makeup", label: "Dulhan makeup", title: "Blush & pearl", bride: "Ira",
    description: "Pearl details, a soft blush palette and a sheer veil for a timeless, romantic bridal portrait.",
    services: ["Bridal makeup", "Hair styling", "Veil setting"], image: img("blush") },
  { id: 7, category: "Party Makeup", label: "Reception look", title: "Wine & gold", bride: "Naina",
    description: "Deep wine tones with gold highlights, polished for a grand reception and a night of dancing.",
    services: ["Reception makeup", "Sleek hair styling", "Draping"], image: img("wine") },
  { id: 8, category: "Bridal Mehndi", label: "Bridal mehndi", title: "Henna heirloom", bride: "Kavya",
    description: "Traditional motifs worked slowly and carefully, a design to keep and remember for years.",
    services: ["Bridal mehndi", "Mehndi for family"], image: img("heirloom") },
].map((l, i) => ({ ...l, id: i + 1 }));

// Chips ka order. Server se nayi category aayi to wo end me add ho jayegi.
export const categoryOrder = ["Dulhan Makeup", "Bridal Mehndi", "Arabic Mehndi", "Party Makeup"];
