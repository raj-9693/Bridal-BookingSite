import { Link, useLocation } from "react-router-dom";
import { CircleCheck, Calendar, MapPin, Users, Sparkles, MessageCircle, ArrowUpRight, ArrowRight } from "lucide-react";
import { confirmationDummy } from "../data/booking.js";
import { brand } from "../data/content.js";
import { formatPrice } from "../utils/format.js";
import { formatLong } from "../utils/dates.js";
import "../styles/booking.css";

// Development me seedha /booking/confirmation kholne par demo data dikhta hai.
// Production me isse false kar do: tab booking na ho to Booking page par bhej diya jayega.
const DEMO_FALLBACK = true;

const readSaved = () => {
  try { return JSON.parse(sessionStorage.getItem("saanjh:lastBooking")); } catch { return null; }
};

export default function BookingConfirmation() {
  const { state } = useLocation();
  const rec = (state?.reference ? state : readSaved()) || (DEMO_FALLBACK ? confirmationDummy : null);

  if (!rec) {
    return (
      <section className="done-page"><div className="container">
        <h1 className="h1">No booking found.</h1>
        <p className="done-lead">Start a new inquiry and we will hold space for your day.</p>
        <Link to="/booking" className="btn btn-primary" style={{ marginTop: 28 }}>Go to booking <ArrowRight size={15} /></Link>
      </div></section>
    );
  }

  const b = rec.booking;
  const first = (b.name || "").trim().split(/\s+/)[0] || "dear bride";
  const wa = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `Hi Saanjh! This is ${b.name}. I just sent an inquiry (${rec.reference}) for ${b.serviceName} on ${formatLong(b.date)}.`
  )}`;

  const details = [
    { icon: Calendar, label: "Wedding date", value: formatLong(b.date) },
    { icon: MapPin, label: "Venue", value: b.venue || "To be shared with our team" },
    { icon: Users, label: "Mehndi guests", value: b.guests || "Not shared yet" },
    { icon: Sparkles, label: "Trial session", value: b.trial ? "Requested" : "Not requested" },
  ];

  return (
    <section className="done-page">
      <div className="container">
        <div className="done-ring"><CircleCheck size={48} strokeWidth={1.4} /></div>
        <p className="eyebrow">Inquiry received</p>
        <h1 className="h1">Your Saanjh is on its way.</h1>
        <p className="done-lead">
          Thank you, {first}. We’ve received your bridal beauty inquiry and will personally look at your date before
          we say yes. Your celebration deserves that care.
        </p>

        <div className="done-grid">
          <article className="recap">
            <div className="recap-top">
              <div>
                <p className="eyebrow">Your booking recap</p>
                <h2>{b.serviceName}</h2>
                <p className="recap-sub">{b.tagline} · From {formatPrice(b.price)}</p>
              </div>
              <span className="pill">Pending confirmation</span>
            </div>

            <dl className="recap-det">
              {details.map(({ icon: I, label, value }) => (
                <div key={label}>
                  <I size={18} strokeWidth={1.5} />
                  <div><dt>{label}</dt><dd>{value}</dd></div>
                </div>
              ))}
            </dl>

            <div className="next">
              <h3>What happens next</h3>
              <ol>
                <li><span className="n">1</span>Our bridal team checks your date and travel requirements.</li>
                <li><span className="n">2</span>We send a personal confirmation and exact quotation on WhatsApp within 24 hours.</li>
                <li><span className="n">3</span>Once you’re happy, we secure your Saanjh with an advance.</li>
              </ol>
            </div>
          </article>

          <div className="side-col">
            <div className="talk">
              <span className="talk-ic"><MessageCircle size={22} strokeWidth={1.5} /></span>
              <h2>Want to share your vision now?</h2>
              <p>Send us your inspiration photos, ceremony timings, or a small note. A real Saanjh artist will pick it up from here.</p>
              <a href={wa} target="_blank" rel="noreferrer" className="btn btn-light talk-btn">
                Continue on WhatsApp <ArrowUpRight size={15} />
              </a>
              <div className="talk-ref">
                <p>Reference: {rec.reference}</p>
                <p>We’ve also sent a copy to your WhatsApp number.</p>
              </div>
            </div>
            <Link to="/gallery" className="btn btn-outline side-btn">Explore more bridal looks <ArrowRight size={15} /></Link>
          </div>
        </div>

        <div className="divider done-div" aria-hidden><span>❧</span></div>
      </div>
    </section>
  );
}
