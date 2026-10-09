import { MessageCircle, CheckCheck } from "lucide-react";
import Reveal from "../Reveal.jsx";

// WhatsApp-style message card
export default function ChatCard({ m, index }) {
  return (
    <Reveal delay={(index % 3) * 90} className="chat">
      <header>
        <span className="chat-av"><MessageCircle size={16} strokeWidth={1.6} /></span>
        <div><b>{m.name}</b><small>online</small></div>
      </header>
      <div className="chat-bubble"><p>{m.text}</p></div>
      <time className="chat-time">{m.time} <CheckCheck size={14} strokeWidth={1.8} /></time>
    </Reveal>
  );
}
