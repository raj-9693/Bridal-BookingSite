import { useCallback, useEffect, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";
import Reveal from "../components/Reveal.jsx";
import RatingSummary from "../components/reviews/RatingSummary.jsx";
import TestimonialCard from "../components/reviews/TestimonialCard.jsx";
import ChatCard from "../components/reviews/ChatCard.jsx";
import { fetchReviews } from "../api/reviews.js";
import { values } from "../data/content.js";
import "../styles/reviews.css";

export default function Reviews() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = useCallback(() => {
    setStatus("loading");
    fetchReviews()
      .then((d) => { setData(d); setStatus("ready"); })
      .catch(() => setStatus("error"));
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <>
      <PageHero
        center
        eyebrow="Notes from our brides"
        title="A thousand little moments, held with love."
        text="Every Saanjh morning begins with a conversation—and ends with a bride who feels beautifully, unmistakably herself."
      />
      <div className="divider short" aria-hidden><span>❧</span></div>

      {status === "loading" && (
        <section className="section"><div className="container"><div className="rev-skel" /></div></section>
      )}
      {status === "error" && (
        <section className="section"><div className="container state">
          <p>Reviews could not be loaded right now.</p>
          <button className="btn btn-outline btn-sm" onClick={load}>Try again</button>
        </div></section>
      )}

      {status === "ready" && (
        <>
          {/* RATING SUMMARY */}
          <section className="band rate-band">
            <div className="container"><RatingSummary summary={data.summary} /></div>
          </section>

          {/* TESTIMONIAL CARDS */}
          <section className="section">
            <div className="container">
              <SectionHeading eyebrow="In their own words" title="The glow was always personal.">
                <p className="head-note">Thoughtful notes from brides who trusted us with the beginning of their forever.</p>
              </SectionHeading>
              <div className="tcards">
                {data.testimonials.map((t, i) => <TestimonialCard key={t.id} t={t} index={i} />)}
              </div>
            </div>
          </section>

          {/* WHATSAPP-STYLE MESSAGES (6: 3 upar, 3 neeche) */}
          <section className="band proof">
            <div className="container">
              <div className="section-head center">
                <div>
                  <p className="eyebrow dark">Little messages, kept forever</p>
                  <h2 className="h2">The sweetest kind of proof.</h2>
                  <p className="proof-text">Some of our favourite notes arrive after the music fades—full of joy, relief, and a little happy disbelief.</p>
                </div>
              </div>
              <div className="chat-grid">
                {data.messages.slice(0, 6).map((m, i) => <ChatCard key={m.id} m={m} index={i} />)}
              </div>
            </div>
          </section>

          {/* VALUES */}
          <section className="section tight">
            <div className="container">
              <Reveal className="values light">
                {values.map((v) => (
                  <div key={v.title} className="value">
                    <Icon name={v.icon} />
                    <h3 className="h3 sm">{v.title}</h3>
                    <p>{v.text}</p>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>
        </>
      )}
    </>
  );
}
