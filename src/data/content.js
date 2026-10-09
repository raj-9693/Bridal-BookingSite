export const brand = {
  name: "Saanjh",
  email: "hello@saanjhbeauty.in",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  address: ["Mehrauli, New Delhi", "By appointment only"],
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Gallery", to: "/gallery" },
  { label: "Services", to: "/services" },
  { label: "Reviews", to: "/reviews" },
  { label: "About", to: "/about" },
  { label: "Booking", to: "/booking" },
  { label: "Contact", to: "/contact" },
];

export const stats = [
  { value: "650+", label: "Brides styled" },
  { value: "12 yrs", label: "Of artistry" },
  { value: "4.9/5", label: "Bride love" },
];

export const services = [
  { icon: "sparkles", title: "Bridal artistry", text: "Camera-ready skin and timeless detail for your main ceremony.", price: "From ₹18,000",
    details: ["Skin prep & HD makeup", "Hair styling & dupatta setting", "Trial session included", "Touch-up kit for the day"] },
  { icon: "flower", title: "Mehendi & haldi", text: "Fresh, radiant looks that stay light through joyous long days.", price: "From ₹8,000",
    details: ["Dewy, light-wear makeup", "Floral or braided hair", "Waterproof finish", "On-location service"] },
  { icon: "heart", title: "Engagement glow", text: "Polished romance for the first beautiful chapter of your story.", price: "From ₹10,000",
    details: ["Soft glam makeup", "Hair styling", "Saree or lehenga draping help", "Photo-ready finish"] },
  { icon: "users", title: "Bride tribe", text: "Coordinated hair and makeup for the people closest to you.", price: "Custom quote",
    details: ["Mother, sisters & friends", "Looks matched to your theme", "Team of artists on the day", "Group timing plan"] },
];

export const gallery = [
  { id: 1, src: "/images/bride-1.jpg", caption: "Ayesha · Mehendi morning", tag: "Mehendi" },
  { id: 2, src: "/images/bride-2.jpg", caption: "Ira · Temple ceremony", tag: "Bridal" },
  { id: 3, src: "/images/bride-3.jpg", caption: "Meher · The reception edit", tag: "Reception" },
  { id: 4, src: "/images/bride-4.jpg", caption: "Naina · Jaipur wedding", tag: "Bridal" },
  { id: 5, src: "/images/bride-5.jpg", caption: "Rhea · Engagement evening", tag: "Engagement" },
  { id: 6, src: "/images/bride-6.jpg", caption: "Ananya · Haldi morning", tag: "Mehendi" },
];

export const reviews = [
  { quote: "I felt like myself, only softer and more luminous. Every detail held through the final dance.", name: "Naina Shah", meta: "Jaipur wedding · March 2025" },
  { quote: "Saanjh heard my vision before I could say it. The morning felt calm, considered, and so special.", name: "Rhea Malhotra", meta: "Udaipur wedding · January 2025" },
  { quote: "The photographs glow because I did. I would choose this gentle, gifted team again and again.", name: "Ananya Rao", meta: "Delhi wedding · December 2024" },
  { quote: "My mother and sisters were styled too, and everything looked like one story. Truly thoughtful.", name: "Meher Kapoor", meta: "Delhi wedding · November 2024" },
  { quote: "The trial made all the difference. By the wedding morning, I had nothing left to worry about.", name: "Ira Sethi", meta: "Jodhpur wedding · February 2025" },
  { quote: "Calm, punctual and so kind. The makeup lasted from the haldi to the last photo.", name: "Ayesha Khan", meta: "Lucknow wedding · October 2024" },
];

export const values = [
  { icon: "heartHandshake", title: "You, amplified", text: "Your features, your rituals, your glow." },
  { icon: "palette", title: "Intentional artistry", text: "Every detail is planned around your vision." },
  { icon: "clock", title: "Calm mornings", text: "A considered rhythm for your wedding day." },
  { icon: "pin", title: "Where you are", text: "Studio and destination bookings across India." },
];

// Page ke hisaab se neeche wale CTA ka text. Jis page ka entry nahi, wahan default text aata hai.
export const ctaByPath = {
  "/gallery": {
    title: "Let’s create a look that feels like you.",
    text: "Tell us about your celebrations, and we will build a beauty plan around every meaningful moment.",
  },
  "/reviews": { tone: "dark" },
  "/booking": { hideCta: true },
"/booking/confirmation": { hideCta: true },
"/contact": { hideCta: true },
};
