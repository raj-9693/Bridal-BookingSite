import { MessageCircle } from "lucide-react";
import { brand } from "../data/content.js";

// whatsapp = sirf digits, country code ke saath (jaise 919876543210). Layout se aata hai.
export default function ChatButton({ whatsapp = brand.whatsapp }) {
  return (
    <a
      className="chat-fab"
      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi Saanjh, I would like to know more about bridal bookings.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} strokeWidth={1.8} />
    </a>
  );
}
