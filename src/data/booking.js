import { addDaysYmd } from "../utils/dates.js";

// DUMMY DATA — baad me server se aayega (src/api/booking.js dekho).
//
// GET /booking/options  ->  {
//   services: [{ id, name, tagline, summary, price (number), icon: "sparkles|flower|heart|users" }],
//   unavailableDates: ["YYYY-MM-DD", ...],   // jo dates kisi aur bride ke liye hold hain
//   heldNote: "text under calendar"
// }
//
// POST /bookings  (body = form payload, neeche Booking.jsx me)  ->  { reference: "SAANJH-260210-AM" }
export const bookingOptionsDummy = {
  services: [
    { id: "bridal-makeup", name: "Bridal Makeup", icon: "sparkles", price: 18000,
      tagline: "Signature bridal artistry", summary: "Signature skin, hair and draping for your main ceremony." },
    { id: "bridal-mehndi", name: "Bridal Mehndi", icon: "flower", price: 8000,
      tagline: "Hand-drawn bridal henna", summary: "Personal, intricate henna for you and your closest people." },
    { id: "combo", name: "Combo Package", icon: "heart", price: 24000,
      tagline: "The complete Saanjh edit", summary: "Makeup and mehndi, held together in one considered plan." },
    { id: "party-makeup", name: "Party Makeup", icon: "users", price: 5500,
      tagline: "Festive, polished beauty", summary: "Polished, celebratory beauty for family and festivities." },
  ],
  // Dummy me aaj se kuch din aage ke dates "held" bante hain, taaki calendar hamesha demo kare
  unavailableDates: [addDaysYmd(6), addDaysYmd(13), addDaysYmd(19), addDaysYmd(27)],
  heldNote: "Grey dates are already held for another bride.",
};

// Confirmation page ka demo data (jab koi booking na ho aur seedha page khola jaye)
export const confirmationDummy = {
  reference: "SAANJH-260210-AM",
  booking: {
    serviceName: "Bridal Makeup",
    tagline: "Signature bridal artistry",
    price: 18000,
    date: "2026-02-10",
    venue: "",
    guests: "Around 35 guests",
    trial: true,
    name: "Ananya Mehra",
    phone: "",
  },
};
