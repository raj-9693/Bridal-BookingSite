import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import Lines from "../components/Lines.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CountUp from "../components/about/CountUp.jsx";
import ArtistCard from "../components/about/ArtistCard.jsx";
import AboutSkeleton from "../components/skeletons/AboutSkeleton.jsx";
import { Sh, ShLines } from "../components/Shimmer.jsx";
import { getDetaAbout } from "../api/Apiclients/AboutClient.js";
import "../styles/about.css";

// Admin quote me “ ” pehle se hote hain; page apne laga deta hai, isliye hata do
const stripQuotes = (t = "") => t.replace(/^[“"]+|[”"]+$/g, "");

export default function About() {
  const [d, setD] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await getDetaAbout();
      const about = response?.data?.aboutdeta;
      if (!about) throw new Error("About data was missing from the response");
      setD(about);
      setStatus("ready");
    } catch (err) {
      console.error("About load error:", err);
      setStatus("error");
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          {status === "loading" ? (
            <div className="sh-lines center" style={{ gap: 16 }} aria-hidden="true">
              <Sh w={190} h={12} /><Sh w="min(640px, 92%)" h={50} r={10} /><Sh w="min(420px, 70%)" h={50} r={10} />
              <ShLines n={2} h={14} w="min(560px, 90%)" last="70%" center />
            </div>
          ) : (
            <>
              <p className="eyebrow dark">{d?.hero?.eyebrow ?? "The hands behind the glow"}</p>
              <h1 className="h1"><Lines text={d?.hero?.title ?? "Beauty that begins\nwith listening."} /></h1>
              <p className="lead">
                {d?.hero?.text ?? "Meet the artist behind Saanjh—a quiet presence for your wedding morning and a considered hand behind every luminous detail."}
              </p>
            </>
          )}
        </div>
      </section>

      {status === "loading" && <AboutSkeleton />}
      {status === "error" && (
        <section className="section"><div className="container state">
          <p>This page could not be loaded right now.</p>
          <button className="btn btn-outline btn-sm" onClick={load}>Try again</button>
        </div></section>
      )}

      {status === "ready" && (
        <>
          {/* FOUNDER */}
          <section className="section founder-sec">
            <div className="container founder">
              <Reveal className="f-art">
                <div className="arch"><Photo src={d.story.image} alt="Founder of Saanjh" hue={18} /></div>
                <span className="f-line" aria-hidden />
                {d.story.quote && <blockquote className="f-quote">“{stripQuotes(d.story.quote)}”</blockquote>}
              </Reveal>
              <Reveal delay={120}>
                <p className="eyebrow">{d.story.eyebrow}</p>
                <h2 className="h2">{d.story.title}</h2>
                {[d.story.p1, d.story.p2].filter(Boolean).map((p) => <p className="f-p" key={p}>{p}</p>)}
                <dl className="f-stats">
                  {d.story.stats.map((s) => (
                    <div key={s.id}><dt><CountUp value={s.value} /></dt><dd>{s.label}</dd></div>
                  ))}
                </dl>
                {d.story.button && <Link to="/booking" className="btn btn-primary">{d.story.button} <ArrowRight size={15} /></Link>}
              </Reveal>
            </div>
          </section>

          {/* MAROON STATS BAND */}
          <section className="bstats">
            <div className="container bstats-in">
              {d.numbers.items.map((s) => (
                <div key={s.id} className="bs"><b><CountUp value={s.value} /></b><span>{s.label}</span></div>
              ))}
            </div>
          </section>

          {/* PROCESS */}
          <section className="section">
            <div className="container">
              <SectionHeading center eyebrow={d.process.eyebrow} title={d.process.title} />
              <div className="pcs">
                {d.process.items.map((p, i) => (
                  <Reveal key={p.id} delay={i * 90} className="pc">
                    <span className="pc-n">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="h3">{p.title}</h3>
                    <p>{p.text}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* TEAM */}
          <section className="section team">
            <div className="container">
              <SectionHeading eyebrow={d.artists.eyebrow} title={<Lines text={d.artists.title} />}>
                <p className="head-note">{d.artists.note}</p>
              </SectionHeading>
              <div className="team-grid">
                {d.artists.items.map((item, i) => (
                  <ArtistCard
                    key={item.id}
                    index={i}
                    a={{
                      name: item.name,
                      role: item.role,
                      bio: item.bio,
                      image: item.image,
                      years: item.years,
                      tags: String(item.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* TRAVEL + KIT */}
          <section className="band travel">
            <div className="container travel-grid">
              <Reveal>
                <p className="eyebrow dark">{d.travel.eyebrow}</p>
                <h2 className="h2"><Lines text={d.travel.title} /></h2>
                <p className="travel-text">{d.travel.text}</p>
                <ul className="cities">
                  {d.travel.cities.map((c) => <li key={c.id}>{c.label}</li>)}
                </ul>
              </Reveal>
              <Reveal delay={120} className="kit">
                <p className="eyebrow">{d.kit.eyebrow}</p>
                <h3>{d.kit.title}</h3>
                <p className="kit-text">{d.kit.text}</p>
                <ul className="brands">
                  {d.kit.brands.map((b) => <li key={b.id}>{b.label}</li>)}
                </ul>
                <p className="kit-note">{d.kit.note}</p>
              </Reveal>
            </div>
          </section>
        </>
      )}
    </>
  );
}
