import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowRight, ArrowLeft, MapPin, MessageCircle } from "lucide-react";
import Stepper from "../components/booking/Stepper.jsx";
import ServiceOption from "../components/booking/ServiceOption.jsx";
import Calendar from "../components/booking/Calendar.jsx";
import Switch from "../components/booking/Switch.jsx";
import BookingSummary from "../components/booking/BookingSummary.jsx";
import { fetchBookingOptions, submitBooking } from "../api/booking.js";
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

  const load = useCallback(() => {
    setStatus("loading");
    fetchBookingOptions()
      .then((d) => {
        setOpts(d);
        const wanted = state?.service?.toLowerCase();
        const match = d.services.find((s) => s.name.toLowerCase() === wanted) || d.services[0];
        setF((p) => ({ ...p, serviceId: p.serviceId || match?.id || "" }));
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
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
      serviceId: service.id, serviceName: service.name, tagline: service.tagline, price: service.price,
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
            <Link to="/">Home</Link><ChevronRight size={13} /><span>Booking</span>
          </nav>
          <p className="eyebrow dark">Reserve your Saanjh</p>
          <h1 className="h1">Let’s hold space for<br />your beautiful day.</h1>
          <p className="lead">
            Tell us a little about your celebrations. This thoughtful three-step inquiry takes just a few minutes,
            and our bridal team will personally confirm availability.
          </p>
        </div>
      </section>

      <section className="book-main">
        <div className="container">
          {status === "loading" && <div className="book-skel" />}
          {status === "error" && (
            <div className="state">
              <p>Booking could not be loaded right now.</p>
              <button className="btn btn-outline btn-sm" onClick={load}>Try again</button>
            </div>
          )}

          {status === "ready" && (
            <div className="book-grid">
              <div className="book-col" ref={stepsRef}>
                <Stepper active={active} onGo={tryGo} />

                {/* STEP 1 */}
                {active === 1 && (
                  <section key="s1" className={`step-card slide-${dir}`}>
                    <p className="eyebrow">Step 1 of 3</p>
                    <h2>Choose the beauty story you need.</h2>
                    <p className="step-sub">Select the primary service for your wedding date. You can add personal details in the next step.</p>
                    <div className="opts" role="radiogroup" aria-label="Service">
                      {opts.services.map((s) => (
                        <ServiceOption key={s.id} s={s} selected={s.id === f.serviceId} onSelect={(id) => put("serviceId", id)} />
                      ))}
                    </div>
                    {errors.service && <em className="err">{errors.service}</em>}
                    <div className="step-actions">
                      <button type="button" className="btn btn-primary" onClick={next}>
                        Continue to event details <ArrowRight size={15} />
                      </button>
                    </div>
                  </section>
                )}

                {/* STEP 2 */}
                {active === 2 && (
                  <section key="s2" className={`step-card slide-${dir}`}>
                    <p className="eyebrow">Step 2 of 3</p>
                    <h2>The shape of your celebration.</h2>
                    <div className="ev-grid">
                      <div className="fld">
                        <span className="fld-l">Wedding date</span>
                        <Calendar value={f.date} onChange={(d) => put("date", d)} unavailable={opts.unavailableDates} note={opts.heldNote} />
                        {errors.date && <em className="err">{errors.date}</em>}
                      </div>
                      <div className="stack">
                        <div className="fld">
                          <label htmlFor="venue" className="fld-l">Venue / city</label>
                          <div className="inp-ic">
                            <MapPin size={17} strokeWidth={1.6} />
                            <input id="venue" className="inp" value={f.venue} onChange={set("venue")} placeholder="e.g. The Leela Palace, Udaipur" />
                          </div>
                        </div>
                        <div className="fld">
                          <label htmlFor="guests" className="fld-l">Mehndi guests</label>
                          <input id="guests" className="inp" value={f.guests} onChange={set("guests")} placeholder="Around 35 guests" />
                        </div>
                        <div className="trial">
                          <div>
                            <b>Add a trial session</b>
                            <small>A calm rehearsal before your wedding week.</small>
                          </div>
                          <Switch checked={f.trial} onChange={(v) => put("trial", v)} label="Add a trial session" />
                        </div>
                      </div>
                    </div>
                    <div className="step-actions split">
                      <button type="button" className="btn btn-outline" onClick={() => goTo(1)}><ArrowLeft size={15} /> Back</button>
                      <button type="button" className="btn btn-primary" onClick={next}>Continue to your details <ArrowRight size={15} /></button>
                    </div>
                  </section>
                )}

                {/* STEP 3 */}
                {active === 3 && (
                  <section key="s3" className={`step-card slide-${dir}`}>
                    <p className="eyebrow">Step 3 of 3</p>
                    <h2>A few details, just for us.</h2>
                    <div className="name-row">
                      <div className="fld">
                        <label htmlFor="name" className="fld-l">Your full name</label>
                        <input id="name" className={`inp ${errors.name ? "bad" : ""}`} value={f.name} onChange={set("name")} placeholder="e.g. Ananya Mehra" autoComplete="name" />
                        {errors.name && <em className="err">{errors.name}</em>}
                      </div>
                      <div className="fld">
                        <label htmlFor="phone" className="fld-l">Phone / WhatsApp</label>
                        <input id="phone" type="tel" inputMode="tel" className={`inp ${errors.phone ? "bad" : ""}`} value={f.phone} onChange={set("phone")} placeholder="+91 98 0000 0000" autoComplete="tel" />
                        {errors.phone && <em className="err">{errors.phone}</em>}
                      </div>
                    </div>
                    <div className="fld wide">
                      <label htmlFor="notes" className="fld-l">Anything you’d like us to know?</label>
                      <textarea id="notes" className="inp" rows="4" value={f.notes} onChange={set("notes")} placeholder="Your ceremonies, skin preferences, inspiration, or a note for the team…" />
                    </div>
                    <div className="step-actions split">
                      <button type="button" className="btn btn-outline" onClick={() => goTo(2)}><ArrowLeft size={15} /> Back</button>
                      <button type="button" className="btn btn-primary" onClick={confirm} disabled={busy}>
                        <MessageCircle size={16} strokeWidth={1.8} /> {busy ? "Sending…" : "Confirm on WhatsApp"}
                      </button>
                    </div>
                  </section>
                )}
              </div>

              <BookingSummary service={service} date={f.date} venue={f.venue} ready={ready} busy={busy} error={sendErr} onConfirm={confirm} />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
