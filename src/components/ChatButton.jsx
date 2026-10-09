import { MessageCircle } from "lucide-react";
import { brand } from "../data/content.js";

export default function ChatButton() {
  return (
    <a
      className="chat-fab"
      href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent("Hi Saanjh, I would like to know more about bridal bookings.")}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={26} strokeWidth={1.8} />
    </a>
  );
}
