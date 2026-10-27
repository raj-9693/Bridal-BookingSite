import { useCallback, useEffect, useState } from "react";
import { Phone, MessageCircle, Instagram, MapPin, Clock, Mail, Heart, ArrowUpRight, Send, CircleCheck } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import ContactCard from "../components/contact/ContactCard.jsx";
import StudioMap from "../components/contact/StudioMap.jsx";
import Lines from "../components/Lines.jsx";
import { getDetaContact } from "../api/Apiclients/ContactClient.js";
import { submitEnquiry } from "../api/contact.js"; // POST (abhi pehle jaisa)
import { todayYmd } from "../utils/dates.js";
import "../styles/contact.css";

const blank = { name: "", phone: "", date: "", interest: "", message: "" };

// admin me card ke liye jo icon chuna, uska component
const ICONS = { phone: Phone, whatsapp: MessageCircle, instagram: Instagram, pin: MapPin, clock: Clock, mail: Mail };

export default function Contact() {
  const [c, setC] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [f, setF] = useState(blank);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendErr, setSendErr] = useState("");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await getDetaContact();
      const contact = response?.data?.Contact;
      if (!contact) throw new Error("Contact data was missing from the response");
      setC(contact);
      setStatus("ready");
    } catch (err) {
      console.error("Contact load error:", err);
      setStatus("error");
    }
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
        interest: f.interest || c.form.options[0]?.label, message: f.message.trim(),
      });
      setSent(true);
    } catch {
      setSendErr("We could not send your note. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  
  return (
    <>
      <div className="contact-top">
        <PageHero
          center
          eyebrow={c?.hero?.eyebrow ?? "The Saanjh studio"}
          title={<Lines text={c?.hero?.title ?? "Let’s hold space for\nyour beautiful day."} />}
          text={c?.hero?.text ?? "A question, a date, a vision still taking shape — write to us and we’ll find the most thoughtful way forward together."}
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
                    <p className="eyebrow dark">{c.reach.eyebrow}</p>
                    <h2 className="h2">{c.reach.title}</h2>
                  </div>
                  <span className="hello-heart" aria-hidden><Heart size={22} strokeWidth={1.6} /></span>
                </div>
                <div className="cc-list">
                  {c.reach.items.map((item, i) => (
                    <ContactCard
                      key={item.id}
                      index={i}
                      icon={ICONS[item.icon] ?? Phone}
                      label={item.label}
                      note={item.note}
                      href={item.href || undefined}
                      external={Boolean(item.href?.startsWith("http"))}
                      arrow={item.arrow}
                    >
                      <Lines text={item.value} />
                    </ContactCard>
                  ))}
                </div>
              </div>

              {/* RIGHT: map + form */}
              <div>
                <div className="mapcard">
                  <StudioMap name={c.map.pinLabel} place={c.map.pinPlace} />
                  <div className="map-foot">
                    <div>
                      <h3>{c.map.title}</h3>
                      <p>{c.map.text}</p>
                    </div>
                    {c.map.button && (
                      <a className="btn btn-outline btn-sm" href={c.map.url} target="_blank" rel="noreferrer">{c.map.button} <ArrowUpRight size={14} /></a>
                    )}
                  </div>
                </div>

                <div className="cform">
                  {sent ? (
                    <div className="sent">
                      <CircleCheck size={40} strokeWidth={1.4} />
                      <h3>Thank you, {f.name.trim().split(/\s+/)[0]}.</h3>
                      <p>Your note has reached us. {c.form.note}</p>
                      <button type="button" className="btn btn-outline btn-sm" onClick={() => { setF(blank); setSent(false); }}>Send another note</button>
                    </div>
                  ) : (
                    <form onSubmit={submit} noValidate>
                      <div className="cform-head">
                        <div>
                          <p className="eyebrow">{c.form.eyebrow}</p>
                          <h2>{c.form.title}</h2>
                        </div>
                        <p className="cform-note">{c.form.note}</p>
                      </div>

                      <div className="cf-grid">
                        <div className="cf">
                          <label htmlFor="cname" className="cf-l">{c.form.nameLabel}</label>
                          <input id="cname" className={`cf-inp ${errors.name ? "bad" : ""}`} value={f.name} onChange={set("name")} placeholder={c.form.namePh} autoComplete="name" />
                          {errors.name && <em className="err">{errors.name}</em>}
                        </div>
                        <div className="cf">
                          <label htmlFor="cphone" className="cf-l">{c.form.phoneLabel}</label>
                          <input id="cphone" type="tel" inputMode="tel" className={`cf-inp ${errors.phone ? "bad" : ""}`} value={f.phone} onChange={set("phone")} placeholder={c.form.phonePh} autoComplete="tel" />
                          {errors.phone && <em className="err">{errors.phone}</em>}
                        </div>
                        <div className="cf">
                          <label htmlFor="cdate" className="cf-l">{c.form.dateLabel}</label>
                          <input id="cdate" type="date" min={todayYmd()} className={`cf-inp ${f.date ? "" : "is-empty"}`} value={f.date} onChange={set("date")} />
                        </div>
                        <div className="cf">
                          <label htmlFor="cint" className="cf-l">{c.form.lookingLabel}</label>
                          <select id="cint" className="cf-inp sel" value={f.interest || c.form.options[0]?.label} onChange={set("interest")}>
                            {c.form.options.map((o) => <option key={o.id} value={o.label}>{o.label}</option>)}
                          </select>
                        </div>
                        <div className="cf full">
                          <label htmlFor="cmsg" className="cf-l">{c.form.messageLabel}</label>
                          <textarea id="cmsg" className="cf-inp" rows="4" value={f.message} onChange={set("message")} placeholder={c.form.messagePh} />
                        </div>
                      </div>

                      <div className="cform-foot">
                        <p>{c.form.privacy}</p>
                        <button type="submit" className="btn btn-primary" disabled={busy}>
                          {busy ? "Sending…" : c.form.button} <Send size={15} strokeWidth={1.6} />
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
                <p className="eyebrow dark">{c.quick.eyebrow}</p>
                <h2 className="h2">{c.quick.title}</h2>
              </div>
              {c.quick.button && (
                <a className="btn btn-primary" href={c.quick.href} target="_blank" rel="noreferrer">
                  {c.quick.button} <MessageCircle size={16} strokeWidth={1.8} />
                </a>
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
