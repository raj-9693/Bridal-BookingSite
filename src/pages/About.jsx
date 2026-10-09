import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Photo from "../components/Photo.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import CountUp from "../components/about/CountUp.jsx";
import ArtistCard from "../components/about/ArtistCard.jsx";
import { fetchAbout } from "../api/about.js";
import "../styles/about.css";

export default function About() {
  const [d, setD] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = useCallback(() => {
    setStatus("loading");
    fetchAbout().then((x) => { setD(x); setStatus("ready"); }).catch(() => setStatus("error"));
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <p className="eyebrow dark">The hands behind the glow</p>
          <h1 className="h1">Beauty that begins<br />with listening.</h1>
          <p className="lead">
            Meet the artist behind Saanjh—a quiet presence for your wedding morning and a considered hand behind every luminous detail.
          </p>
        </div>
      </section>

      {status === "loading" && <section className="section"><div className="container"><div className="about-skel" /></div></section>}
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
                <div className="arch"><Photo src={d.founder.image} alt={`${d.founder.name}, founder of Saanjh`} hue={18} /></div>
                <span className="f-line" aria-hidden />
                <blockquote className="f-quote">“{d.founder.quote}”</blockquote>
              </Reveal>
              <Reveal delay={120}>
                <p className="eyebrow">A note from {d.founder.name}</p>
                <h2 className="h2">{d.founder.heading}</h2>
                {d.founder.paragraphs.map((p) => <p className="f-p" key={p}>{p}</p>)}
                <dl className="f-stats">
                  {d.founder.stats.map((s) => (
                    <div key={s.label}><dt><CountUp value={s.value} /></dt><dd>{s.label}</dd></div>
                  ))}
                </dl>
                <Link to="/booking" className="btn btn-primary">Plan your Saanjh <ArrowRight size={15} /></Link>
              </Reveal>
            </div>
          </section>

          {/* MAROON STATS BAND */}
          <section className="bstats">
            <div className="container bstats-in">
              {d.bandStats.map((s) => (
                <div key={s.label} className="bs"><b><CountUp value={s.value} /></b><span>{s.label}</span></div>
              ))}
            </div>
          </section>

          {/* PROCESS */}
          <section className="section">
            <div className="container">
              <SectionHeading center eyebrow="From first hello to final touch" title="Our process, held with care." />
              <div className="pcs">
                {d.process.map((p, i) => (
                  <Reveal key={p.n} delay={i * 90} className="pc">
                    <span className="pc-n">{p.n}</span>
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
              <SectionHeading eyebrow="Meet the artists" title={<>The hands that keep your<br />morning calm.</>}>
                <p className="head-note">Every Saanjh artist is trained in our listen-first way of working, so your look always feels like you.</p>
              </SectionHeading>
              <div className="team-grid">
                {d.team.map((a, i) => <ArtistCard key={a.id} a={a} index={i} />)}
              </div>
            </div>
          </section>

          {/* TRAVEL + KIT */}
          <section className="band travel">
            <div className="container travel-grid">
              <Reveal>
                <p className="eyebrow dark">Where Saanjh travels</p>
                <h2 className="h2">Near your people,<br />wherever they gather.</h2>
                <p className="travel-text">{d.travel.text}</p>
                <ul className="cities">
                  {d.travel.cities.map((c) => <li key={c}>{c}</li>)}
                </ul>
              </Reveal>
              <Reveal delay={120} className="kit">
                <p className="eyebrow">Our kit, considered</p>
                <h3>{d.kit.title}</h3>
                <p className="kit-text">{d.kit.text}</p>
                <ul className="brands">
                  {d.kit.brands.map((b) => <li key={b}>{b}</li>)}
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
