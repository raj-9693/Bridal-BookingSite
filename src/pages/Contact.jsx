import { useCallback, useEffect, useState } from "react";
import { Phone, MessageCircle, Instagram, MapPin, Clock, Heart, ArrowUpRight, Send, CircleCheck } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import ContactCard from "../components/contact/ContactCard.jsx";
import StudioMap from "../components/contact/StudioMap.jsx";
import { fetchContact, submitEnquiry } from "../api/contact.js";
import { todayYmd } from "../utils/dates.js";
import "../styles/contact.css";

const blank = { name: "", phone: "", date: "", interest: "", message: "" };

export default function Contact() {
  const [c, setC] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [f, setF] = useState(blank);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendErr, setSendErr] = useState("");

  const load = useCallback(() => {
    setStatus("loading");
    fetchContact().then((d) => { setC(d); setStatus("ready"); }).catch(() => setStatus("error"));
  }, []);
  useEffect(() => { load(); }, [load]);

  const set = (k) => (e) => { setF((p) => ({ ...p, [k]: e.target.value })); setErrors((p) => ({ ...p, [k]: undefined })); };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (f.name.trim().length < 2) er.name = "Please share your name.";
    if (f.phone.replace(/\D/g, "").length < 10) er.phone = "Please enter a valid phone number.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    setSendErr("");
    try {
      await submitEnquiry({
        name: f.name.trim(), phone: f.phone.trim(), date: f.date,
        interest: f.interest || c.services[0], message: f.message.trim(),
      });
      setSent(true);
    } catch {
      setSendErr("We could not send your note. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const waLink = c && `https://wa.me/${c.whatsapp}?text=${encodeURIComponent("Hi Saanjh! I would love to talk about my bridal plans.")}`;

  return (
    <>
      <div className="contact-top">
        <PageHero
          center
          eyebrow="The Saanjh studio"
          title={<>Let’s hold space for<br />your beautiful day.</>}
          text="A question, a date, a vision still taking shape — write to us and we’ll find the most thoughtful way forward together."
        />
        <div className="divider short" aria-hidden><span>❧</span></div>
      </div>

      {status === "loading" && <section className="contact-main"><div className="container"><div className="contact-skel" /></div></section>}
      {status === "error" && (
        <section className="contact-main"><div className="container state">
          <p>Contact details could not be loaded right now.</p>
          <button className="btn btn-outline btn-sm" onClick={load}>Try again</button>
        </div></section>
      )}

      {status === "ready" && (
        <>
          <section className="contact-main">
            <div className="container contact-grid">
              {/* LEFT: direct contact */}
              <div>
                <div className="hello-head">
                  <div>
                    <p className="eyebrow dark">Reach us directly</p>
                    <h2 className="h2">A warm hello away.</h2>
                  </div>
                  <span className="hello-heart" aria-hidden><Heart size={22} strokeWidth={1.6} /></span>
                </div>
                <div className="cc-list">
                  <ContactCard index={0} icon={Phone} label="Studio line" href={`tel:${c.phone.replace(/\s/g, "")}`}>{c.phone}</ContactCard>
                  <ContactCard index={1} icon={MessageCircle} label="WhatsApp" href={waLink} external arrow>Begin a bridal conversation</ContactCard>
                  <ContactCard index={2} icon={Instagram} label="Instagram" href={`https://instagram.com/${c.instagram}`} external arrow>@{c.instagram}</ContactCard>
                  <ContactCard index={3} icon={MapPin} label="Studio visits">{c.address[0]}<br />{c.address[1]}</ContactCard>
                  <ContactCard index={4} icon={Clock} label="Working hours" note={c.hours.note}>{c.hours.line}</ContactCard>
                </div>
              </div>

              {/* RIGHT: map + form */}
              <div>
                <div className="mapcard">
                  <StudioMap place={c.address[0]} />
                  <div className="map-foot">
                    <div>
                      <h3>Find the studio</h3>
                      <p>{c.mapNote}</p>
                    </div>
                    <a className="btn btn-outline btn-sm" href={c.mapUrl} target="_blank" rel="noreferrer">Open map <ArrowUpRight size={14} /></a>
                  </div>
                </div>

                <div className="cform">
                  {sent ? (
                    <div className="sent">
                      <CircleCheck size={40} strokeWidth={1.4} />
                      <h3>Thank you, {f.name.trim().split(/\s+/)[0]}.</h3>
                      <p>Your note has reached us. {c.replyNote}</p>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => { setF(blank); setSent(false); }}>Send another note</button>
                    </div>
                  ) : (
                    <form onSubmit={submit} noValidate>
                      <div className="cform-head">
                        <div>
                          <p className="eyebrow">Bridal enquiry</p>
                          <h2>Tell us a little.</h2>
                        </div>
                        <p className="cform-note">{c.replyNote}</p>
                      </div>

                      <div className="cf-grid">
                        <div className="cf">
                          <label htmlFor="cname" className="cf-l">Your name</label>
                          <input id="cname" className={`cf-inp ${errors.name ? "bad" : ""}`} value={f.name} onChange={set("name")} placeholder="Your full name" autoComplete="name" />
                          {errors.name && <em className="err">{errors.name}</em>}
                        </div>
                        <div className="cf">
                          <label htmlFor="cphone" className="cf-l">Phone / WhatsApp</label>
                          <input id="cphone" type="tel" inputMode="tel" className={`cf-inp ${errors.phone ? "bad" : ""}`} value={f.phone} onChange={set("phone")} placeholder="+91" autoComplete="tel" />
                          {errors.phone && <em className="err">{errors.phone}</em>}
                        </div>
                        <div className="cf">
                          <label htmlFor="cdate" className="cf-l">Wedding date</label>
                          <input id="cdate" type="date" min={todayYmd()} className={`cf-inp ${f.date ? "" : "is-empty"}`} value={f.date} onChange={set("date")} />
                        </div>
                        <div className="cf">
                          <label htmlFor="cint" className="cf-l">I’m looking for</label>
                          <select id="cint" className="cf-inp sel" value={f.interest || c.services[0]} onChange={set("interest")}>
                            {c.services.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="cf full">
                          <label htmlFor="cmsg" className="cf-l">Your celebration</label>
                          <textarea id="cmsg" className="cf-inp" rows="4" value={f.message} onChange={set("message")} placeholder="Venue, ceremonies, or anything you would love us to know…" />
                        </div>
                      </div>

                      <div className="cform-foot">
                        <p>By sending this note, you’re inviting Saanjh to contact you about your bridal enquiry.</p>
                        <button type="submit" className="btn btn-primary" disabled={busy}>
                          {busy ? "Sending…" : "Send enquiry"} <Send size={15} strokeWidth={1.6} />
                        </button>
                      </div>
                      {sendErr && <p className="err" role="alert" style={{ marginTop: 12, textAlign: "right" }}>{sendErr}</p>}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* QUICK HELLO BAND */}
          <section className="quick">
            <div className="container quick-in">
              <div>
                <p className="eyebrow dark">Prefer a quick hello?</p>
                <h2 className="h2">Your date is worth a conversation.</h2>
              </div>
              <a className="btn btn-primary" href={waLink} target="_blank" rel="noreferrer">
                Chat on WhatsApp <MessageCircle size={16} strokeWidth={1.8} />
              </a>
            </div>
          </section>
        </>
      )}
    </>
  );
}
