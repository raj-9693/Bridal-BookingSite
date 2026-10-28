import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowRight, ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import Stepper from "../components/booking/Stepper.jsx";
import ServiceOption from "../components/booking/ServiceOption.jsx";
import Calendar from "../components/booking/Calendar.jsx";
import Switch from "../components/booking/Switch.jsx";
import BookingSummary from "../components/booking/BookingSummary.jsx";
import Lines from "../components/Lines.jsx";
import BookingSkeleton from "../components/skeletons/BookingSkeleton.jsx";
import { Sh, ShLines } from "../components/Shimmer.jsx";
import { getDetaBooking } from "../api/Apiclients/BookingClient.js";
import { submitBooking } from "../api/booking.js"; // POST (abhi pehle jaisa)
import "../styles/booking.css";

const blank = { serviceId: "", date: "", venue: "", guests: "", trial: false, name: "", phone: "", notes: "" };

export default function Booking() {
  const { state } = useLocation();   // Services ("Book This") / Gallery ("Book this look") se aaya data
  const navigate = useNavigate();
  const [opts, setOpts] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [f, setF] = useState({ ...blank, notes: state?.look ? `I would love the “${state.look}” look.` : "" });
  const [errors, setErrors] = useState({});
  const [active, setActive] = useState(1);
  const [busy, setBusy] = useState(false);
  const [sendErr, setSendErr] = useState("");
  const [dir, setDir] = useState("next");
  const stepsRef = useRef(null);

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await getDetaBooking();
      const booking = response?.data?.Booking;
      if (!booking) throw new Error("Booking data was missing from the response");

      // Service card ko sirf wahi data jo chahiye (props): name, summary, price, icon
      const services = (booking.services ?? []).map((item) => ({
        id: item.id,
        name: item.title,
        summary: item.desc,
        price: item.price,
        icon: item.icon,
      }));
      const d = { ...booking, services, unavailableDates: booking.unavailableDates ?? [] };

      setOpts(d);
      const wanted = state?.service?.toLowerCase();
      const match = services.find((s) => s.name.toLowerCase() === wanted) || services[0];
      setF((p) => ({ ...p, serviceId: p.serviceId || match?.id || "" }));
      setStatus("ready");
    } catch (err) {
      console.error("Booking load error:", err);
      setStatus("error");
    }
  }, [state]);
  useEffect(() => { load(); }, [load]);

  // ---- Wizard: ek time par ek hi step dikhta hai ----
  const goTo = (n) => {
    setDir(n >= active ? "next" : "back");
    setActive(n);
    setTimeout(() => stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 30);
  };
  const stepErrors = (n) => {
    if (n === 1 && !f.serviceId) return { service: "Please choose a service." };
    if (n === 2 && !f.date) return { date: "Please choose your wedding date." };
    return null;
  };
  // Aage jaane se pehle beech ke steps complete hone chahiye
  const tryGo = (n) => {
    if (n <= active) return goTo(n);
    for (let s = active; s < n; s++) {
      const e = stepErrors(s);
      if (e) { setErrors(e); return goTo(s); }
    }
    goTo(n);
  };
  const next = () => tryGo(active + 1);

  const set = (k) => (e) => { setF((p) => ({ ...p, [k]: e.target.value })); setErrors((p) => ({ ...p, [k]: undefined })); };
  const put = (k, v) => { setF((p) => ({ ...p, [k]: v })); setErrors((p) => ({ ...p, [k]: undefined, ...(k === "serviceId" ? { service: undefined } : {}) })); };

  const service = opts?.services.find((s) => s.id === f.serviceId);
  const ready = Boolean(service && f.date && f.name.trim().length > 1 && f.phone.replace(/\D/g, "").length >= 10);

  const validate = () => {
    const e = {};
    if (!service) e.service = "Please choose a service.";
    if (!f.date) e.date = "Please choose your wedding date.";
    if (f.name.trim().length < 2) e.name = "Please share your full name.";
    if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Please enter a valid phone number.";
    return e;
  };

  const confirm = async () => {
    const e = validate();
    setErrors(e);
    setSendErr("");
    if (e.service) return goTo(1);
    if (e.date) return goTo(2);
    if (e.name || e.phone) return goTo(3);

    const payload = {
      serviceId: service.id, serviceName: service.name, price: service.price,
      date: f.date, venue: f.venue.trim(), guests: f.guests.trim(), trial: f.trial,
      name: f.name.trim(), phone: f.phone.trim(), notes: f.notes.trim(),
    };
    setBusy(true);
    try {
      const res = await submitBooking(payload);
      const record = { booking: payload, reference: res.reference };
      try { sessionStorage.setItem("saanjh:lastBooking", JSON.stringify(record)); } catch { /* ignore */ }
      navigate("/booking/confirmation", { state: record });
    } catch {
      setSendErr("We could not send your inquiry. Please try again.");
      setBusy(false);
    }
  };

  return (
    <>
      <section className="book-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><ChevronRight size={13} /><span>{opts?.hero?.crumb ?? "Booking"}</span>
          </nav>
          {status === "loading" ? (
            <div className="sh-lines" style={{ gap: 16 }} aria-hidden="true">
              <Sh w={150} h={12} /><Sh w="min(520px, 92%)" h={50} r={10} /><Sh w="min(400px, 70%)" h={50} r={10} />
              <ShLines n={2} h={14} w="min(640px, 100%)" last="60%" />
            </div>
          ) : (
            <>
              <p className="eyebrow dark">{opts?.hero?.eyebrow ?? "Reserve your Saanjh"}</p>
              <h1 className="h1"><Lines text={opts?.hero?.title ?? "Let’s hold space for\nyour beautiful day."} /></h1>
              <p className="lead">
                {opts?.hero?.text ?? "Tell us a little about your celebrations. This thoughtful three-step inquiry takes just a few minutes, and our bridal team will personally confirm availability."}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="book-main">
        <div className="container">
          {status === "loading" && <BookingSkeleton />}
          {status === "error" && (
            <div className="state">
              <p>Booking could not be loaded right now.</p>
              <button className="btn btn-outline btn-sm" onClick={load}>Try again</button>
            </div>
          )}

          {status === "ready" && (
            <div className={`book-grid${active === 3 ? " book-grid-step-three" : ""}`}>
              <div className="book-col" ref={stepsRef}>
                <Stepper labels={opts.steps.map((st) => st.tab)} active={active} onGo={tryGo} />

                {/* STEP 1 */}
                {active === 1 && (
                  <section key="s1" className={`step-card slide-${dir}`}>
                    <p className="eyebrow">Step 1 of {opts.steps.length}</p>
                    <h2>{opts.steps[0].title}</h2>
                    <p className="step-sub">{opts.steps[0].text}</p>
                    <div className="opts" role="radiogroup" aria-label="Service">
                      {opts.services.map((s) => (
                        <ServiceOption key={s.id} s={s} selected={s.id === f.serviceId} onSelect={(id) => put("serviceId", id)} />
                      ))}
                    </div>
                    {errors.service && <em className="err">{errors.service}</em>}
                    <div className="step-actions">
                      <button type="button" className="btn btn-primary" onClick={next}>
                        {opts.steps[0].button} <ArrowRight size={15} />
                      </button>
                    </div>
                  </section>
                )}

                {/* STEP 2 */}
                {active === 2 && (
                  <section key="s2" className={`step-card slide-${dir}`}>
                    <p className="eyebrow">Step 2 of {opts.steps.length}</p>
                    <h2>{opts.steps[1].title}</h2>
                    <div className="ev-grid">
                      <div className="fld">
                        <span className="fld-l">{opts.event.dateLabel}</span>
                        <Calendar value={f.date} onChange={(d) => put("date", d)} unavailable={opts.unavailableDates} note={opts.event.calendarNote} />
                        {errors.date && <em className="err">{errors.date}</em>}
                      </div>
                      <div className="stack">
                        <div className="fld">
                          <label htmlFor="venue" className="fld-l">{opts.event.venueLabel}</label>
                          <div className="inp-ic">
                            <MapPin size={17} strokeWidth={1.6} />
                            <input id="venue" className="inp" value={f.venue} onChange={set("venue")} placeholder={opts.event.venuePh} />
                          </div>
                        </div>
                        <div className="fld">
                          <label htmlFor="guests" className="fld-l">{opts.event.guestsLabel}</label>
                          <input id="guests" className="inp" value={f.guests} onChange={set("guests")} placeholder={opts.event.guestsPh} />
                        </div>
                        <div className="trial">
                          <div>
                            <b>{opts.event.trialTitle}</b>
                            <small>{opts.event.trialText}</small>
                          </div>
                          <Switch checked={f.trial} onChange={(v) => put("trial", v)} label={opts.event.trialTitle} />
                        </div>
                      </div>
                    </div>
                    <div className="step-actions split">
                      <button type="button" className="btn btn-outline" onClick={() => goTo(1)}><ArrowLeft size={15} /> Back</button>
                      <button type="button" className="btn btn-primary" onClick={next}>{opts.steps[1].button} <ArrowRight size={15} /></button>
                    </div>
                  </section>
                )}

                {/* STEP 3 */}
                {active === 3 && (
                  <section key="s3" className={`step-card slide-${dir}`}>
                    <p className="eyebrow">Step 3 of {opts.steps.length}</p>
                    <h2>{opts.steps[2].title}</h2>
                    <div className="name-row">
                      <div className="fld">
                        <label htmlFor="name" className="fld-l">{opts.you.nameLabel}</label>
                        <input id="name" className={`inp ${errors.name ? "bad" : ""}`} value={f.name} onChange={set("name")} placeholder={opts.you.namePh} autoComplete="name" />
                        {errors.name && <em className="err">{errors.name}</em>}
                      </div>
                      <div className="fld">
                        <label htmlFor="phone" className="fld-l">{opts.you.phoneLabel}</label>
                        <input id="phone" type="tel" inputMode="tel" className={`inp ${errors.phone ? "bad" : ""}`} value={f.phone} onChange={set("phone")} placeholder={opts.you.phonePh} autoComplete="tel" />
                        {errors.phone && <em className="err">{errors.phone}</em>}
                      </div>
                    </div>
                    <div className="fld wide">
                      <label htmlFor="notes" className="fld-l">{opts.you.notesLabel}</label>
                      <textarea id="notes" className="inp" rows="4" value={f.notes} onChange={set("notes")} placeholder={opts.you.notesPh} />
                    </div>
                    <div className="step-actions split step-actions-final">
                      <button type="button" className="btn btn-outline" onClick={() => goTo(2)}><ArrowLeft size={15} /> Back</button>
                      <button type="button" className="btn btn-primary" onClick={confirm} disabled={busy}>
                        <MessageCircle size={16} strokeWidth={1.8} /> {busy ? "Sending…" : opts.summary.button}
                      </button>
                    </div>
                  </section>
                )}
              </div>

              <BookingSummary text={opts.summary} service={service} date={f.date} venue={f.venue} ready={ready} busy={busy} error={sendErr} onConfirm={confirm} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
