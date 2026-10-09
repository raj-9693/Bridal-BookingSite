import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Sparkles, Star } from "lucide-react";
import Photo from "../components/Photo.jsx";
import Icon from "../components/Icon.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { stats, services, gallery, reviews, values } from "../data/content.js";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow line">Bridal beauty, by appointment</p>
            <h1 className="h1 hero-title">Your wedding glow, lovingly crafted.</h1>
            <p className="lead">
              Thoughtful artistry for every ceremony, every photograph, every quiet moment you will remember.
              Saanjh creates luminous bridal looks rooted in you.
            </p>
            <div className="hero-btns">
              <Link to="/booking" className="btn btn-primary">Book your date <ArrowUpRight size={14} /></Link>
              <Link to="/gallery" className="btn btn-outline">View looks</Link>
            </div>
            <dl className="stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt>{s.value}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-art">
            <div className="arch">
              <Photo src="/images/imagegirls.png" alt="Bride in a maroon lehenga" />
            </div>
            <span className="arch-line" aria-hidden />
            <div className="hero-chip">
              <span className="icon-badge sm"><Sparkles size={14} strokeWidth={1.6} /></span>
              <span>Soft. Sacred. <b>Saanjh.</b></span>
            </div>
          </div>
        </div>
        <div className="divider container" aria-hidden><span>❧</span></div>
      </section>

      {/* SERVICES */}
      <section className="band">
        <div className="container">
          <SectionHeading eyebrow="The Saanjh studio" title={<>A look that feels<br />entirely yours.</>}>
            <Link to="/services" className="text-link">Explore our bridal menu <ArrowRight size={14} /></Link>
          </SectionHeading>
          <div className="grid-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="card service-card">
                <Icon name={s.icon} />
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
                <span className="price">{s.price}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section">
        <div className="container">
          <SectionHeading center eyebrow="Real brides, real radiance" title="A little glimpse of forever." />
          <div className="glimpse">
            {gallery.slice(0, 3).map((g, i) => (
              <Reveal key={g.id} delay={i * 100} className={`glimpse-card ${i === 1 ? "drop" : ""}`}>
                <Photo src={g.src} alt={g.caption} />
                <div className="glimpse-cap">{g.caption}</div>
              </Reveal>
            ))}
          </div>
          <div className="center-row">
            <Link to="/gallery" className="btn btn-outline">See more Saanjh brides <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-band">
        <div className="container">
          <SectionHeading eyebrow="Notes from our brides" title="Love notes, preserved." >
            <p className="rating"><span className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={13} />)}</span> 4.9 from 200+ brides</p>
          </SectionHeading>
          <div className="grid-3">
            {reviews.slice(0, 3).map((r, i) => (
              <Reveal key={r.name} delay={i * 90} className="quote-card">
                <span className="quote-mark">“</span>
                <p className="quote-text">{r.quote}</p>
                <div className="quote-by"><b>{r.name}</b><small>{r.meta}</small></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section tight">
        <div className="container">
          <Reveal className="values">
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
  );
}
