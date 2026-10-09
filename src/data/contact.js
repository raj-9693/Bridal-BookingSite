import { brand } from "./content.js";

// DUMMY DATA — baad me server se aayega (src/api/contact.js dekho).
//
// GET /contact  ->  {
//   phone, whatsapp (digits only, country code ke saath), instagram (handle, @ ke bina),
//   address: ["line 1", "line 2"], hours: { line, note },
//   mapUrl, mapNote, replyNote, services: ["Bridal Makeup", ...]
// }
//
// POST /enquiries  (body: { name, phone, date, interest, message })  ->  { ok: true }
export const contactDummy = {
  phone: brand.phone,
  whatsapp: brand.whatsapp,
  instagram: "saanjhbeauty",
  address: brand.address,
  hours: { line: "Tue-Sun · 10am-7pm", note: "Mondays reserved for our bridal kits" },
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Mehrauli%2C+New+Delhi",
  mapNote: "A quiet, sunlit space for your consultation.",
  replyNote: "We usually reply within one working day.",
  services: ["Bridal Makeup", "Bridal Mehndi", "Combo Package", "Party Makeup"],
};
