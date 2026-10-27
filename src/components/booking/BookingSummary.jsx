import { Sparkles, Calendar, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { fromPrice } from "../../utils/format.js";
import { formatLong } from "../../utils/dates.js";

// text = admin ka Booking.summary: { title, status, serviceLabel, dateLabel, celebrationLabel, venueFallback, note, button, privacy }
const defaultText = {
  title: "Booking Summary", status: "In progress", serviceLabel: "Selected service", dateLabel: "Wedding date",
  celebrationLabel: "Celebration", venueFallback: "Venue to be shared",
  note: "Your date is not reserved until our team confirms it personally on WhatsApp.",
  button: "Confirm on WhatsApp", privacy: "Your details are only used to plan your Saanjh consultation.",
};

export default function BookingSummary({ text = defaultText, service, date, venue, ready, busy, error, onConfirm }) {
  return (
    <aside className="sum">
      <div className="sum-head">
        <h2 className="h3">{text.title}</h2>
        <span className="pill">{ready ? "Ready to send" : text.status}</span>
      </div>

      <ul className="sum-list">
        <li>
          <Sparkles size={18} strokeWidth={1.5} />
          <div>
            <small>{text.serviceLabel}</small>
            <b>{service ? service.name : "Choose a service"}</b>
            {service && <span>{fromPrice(service.price)}</span>}
          </div>
        </li>
        <li>
          <Calendar size={18} strokeWidth={1.5} />
          <div><small>{text.dateLabel}</small><b>{date ? formatLong(date) : "Choose a date"}</b></div>
        </li>
        <li>
          <MapPin size={18} strokeWidth={1.5} />
          <div><small>{text.celebrationLabel}</small><b>{venue || text.venueFallback}</b></div>
        </li>
      </ul>

      <p className="sum-note">{text.note}</p>
      <button type="button" className="btn btn-primary sum-btn" onClick={onConfirm} disabled={busy}>
        <MessageCircle size={17} strokeWidth={1.8} /> {busy ? "Sending…" : text.button}
      </button>
      {error && <p className="sum-err" role="alert">{error}</p>}
      <p className="sum-priv"><ShieldCheck size={15} strokeWidth={1.6} />{text.privacy}</p>
    </aside>
  );
}
