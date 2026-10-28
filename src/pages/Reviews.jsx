import { useCallback, useEffect, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Icon from "../components/Icon.jsx";
import Reveal from "../components/Reveal.jsx";
import Lines from "../components/Lines.jsx";
import RatingSummary from "../components/reviews/RatingSummary.jsx";
import TestimonialCard from "../components/reviews/TestimonialCard.jsx";
import ChatCard from "../components/reviews/ChatCard.jsx";
import ReviewsSkeleton from "../components/skeletons/ReviewsSkeleton.jsx";
import { getDetareviews } from "../api/Apiclients/ReviewsClient.js";
import "../styles/reviews.css";

export default function Reviews() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await getDetareviews();
      const reviews = response?.data?.Reviews;
      if (!reviews) throw new Error("Reviews data was missing from the response");

      setData({
        ...reviews,
        // sirf published; featured pehle; website par 6 se zyada nahi
        testimonials: (reviews.testimonials ?? [])
          .filter((t) => t.published !== false)
          .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
          .slice(0, 6),
        messages: (reviews.messages ?? []).filter((m) => m.published !== false).slice(0, 6),
      });
      setStatus("ready");
    } catch (err) {
      console.error("Reviews load error:", err);
      setStatus("error");
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <>
      <PageHero
        center
        loading={status === "loading"}
        eyebrow={data?.hero?.eyebrow ?? "Notes from our brides"}
        title={<Lines text={data?.hero?.title ?? "A thousand little moments, held with love."} />}
        text={data?.hero?.intro ?? "Every Saanjh morning begins with a conversation—and ends with a bride who feels beautifully, unmistakably herself."}
      />
      <div className="divider short" aria-hidden><span>❧</span></div>

      {status === "loading" && <ReviewsSkeleton />}
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
              <SectionHeading eyebrow={data.testimonialsSection?.eyebrow} title={data.testimonialsSection?.title}>
                <p className="head-note">{data.testimonialsSection?.note}</p>
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
                  <p className="eyebrow dark">{data.messagesSection?.eyebrow}</p>
                  <h2 className="h2">{data.messagesSection?.title}</h2>
                  <p className="proof-text">{data.messagesSection?.text}</p>
                </div>
              </div>
              <div className="chat-grid">
                {data.messages.map((m, i) => <ChatCard key={m.id} m={m} index={i} />)}
              </div>
            </div>
          </section>

          {/* VALUES */}
          <section className="section tight">
            <div className="container">
              <Reveal className="values light">
                {(data.values ?? []).map((v) => (
                  <div key={v.id} className="value">
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
