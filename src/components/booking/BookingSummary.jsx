import { Sparkles, Calendar, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { formatPrice } from "../../utils/format.js";
import { formatLong } from "../../utils/dates.js";

export default function BookingSummary({ service, date, venue, ready, busy, error, onConfirm }) {
  return (
    <aside className="sum">
      <div className="sum-head">
        <h2 className="h3">Booking Summary</h2>
        <span className="pill">{ready ? "Ready to send" : "In progress"}</span>
      </div>

      <ul className="sum-list">
        <li>
          <Sparkles size={18} strokeWidth={1.5} />
          <div>
            <small>Selected service</small>
            <b>{service ? service.name : "Choose a service"}</b>
            {service && <span>From {formatPrice(service.price)}</span>}
          </div>
        </li>
        <li>
          <Calendar size={18} strokeWidth={1.5} />
          <div><small>Wedding date</small><b>{date ? formatLong(date) : "Choose a date"}</b></div>
        </li>
        <li>
          <MapPin size={18} strokeWidth={1.5} />
          <div><small>Celebration</small><b>{venue || "Venue to be shared"}</b></div>
        </li>
      </ul>

      <p className="sum-note">Your date is not reserved until our team confirms it personally on WhatsApp.</p>
      <button type="button" className="btn btn-primary sum-btn" onClick={onConfirm} disabled={busy}>
        <MessageCircle size={17} strokeWidth={1.8} /> {busy ? "Sending…" : "Confirm on WhatsApp"}
      </button>
      {error && <p className="sum-err" role="alert">{error}</p>}
      <p className="sum-priv"><ShieldCheck size={15} strokeWidth={1.6} />Your details are only used to plan your Saanjh consultation.</p>
    </aside>
  );
}
