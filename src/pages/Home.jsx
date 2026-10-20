import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Sparkles, Star } from "lucide-react";
import Photo from "../components/Photo.jsx";
import Icon from "../components/Icon.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
// import { stats, services, gallery, reviews, values } from "../data/content.js";
import { getDetaHome} from "../api/Apiclients/HomeClient.js"
import { useEffect, useState } from "react";




export default function Home() {

  const [homedeta,sethomedeta]= useState('')


  useEffect(() => {
  const loadData = async () => {
    try {
      const response = await getDetaHome();
      sethomedeta(response.data.Deta); 
    } catch (err) {
      console.log("No response", err);
    }
  };
  loadData();
}, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
          <p className="eyebrow line">{homedeta?.hero?.eyebrow || ""}</p>
            <h1 className="h1 hero-title">{homedeta?.hero?.title||""}</h1>
            <p className="lead">{homedeta?.hero?.subtitle || ""}</p>
             {/* Thoughtful artistry for every ceremony, every photograph, every quiet moment you will remember.
              Saanjh creates luminous bridal looks rooted in you. */}

            <div className="hero-btns">
              <Link to="/booking" className="btn btn-primary">{homedeta?.hero?.primaryCta||"Book your date"}<ArrowUpRight size={14} /></Link>
              <Link to="/gallery" className="btn btn-outline">{homedeta?.hero?.secondaryCta||"View looks"}</Link>
            </div>
            <dl className="stats">
              {homedeta?.stats?.items.map((s) => (
                <div key={s.id}>
                  <dt>{s.value || ""}</dt>
                  <dd>{s.label|| ""}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero-art">
            <div className="arch">
              <div className="arch">
            <Photo 
               src={homedeta?.hero?.imageUrl || "/images/imagegirls.png"} 
                alt="Bride in a maroon lehenga"  />
              </div>
            </div>
            <span className="arch-line" aria-hidden />
            <div className="hero-chip">
              <span className="icon-badge sm"><Sparkles size={14} strokeWidth={1.6} /></span>
              <span><b>{homedeta?.hero?.badge}</b></span>
            </div>
          </div>
        </div>
        <div className="divider container" aria-hidden><span>❧</span></div>
      </section>

      {/* SERVICES */}
      <section className="band">
        <div className="container">
          <SectionHeading eyebrow={homedeta?.basics?.eyebrow} title={homedeta?.basics?.title}>
            <Link to="/services" className="text-link">{homedeta?.basics?.linkText}<ArrowRight size={14} /></Link>
          </SectionHeading>
          <div className="grid-4">
            {homedeta?.basics?.items.map((s, i) => (
              <Reveal key={s.id} delay={i * 80} className="card service-card">
                <Icon name={s.icon} />
                <h3 className="h3">{s.title}</h3>
                <p>{s.desc}</p>
                <span className="price">{s.price}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="section">
        <div className="container">
          <SectionHeading center eyebrow={homedeta?.glimpse?.eyebrow} title={homedeta?.glimpse?.title} />
          <div className="glimpse">
            {homedeta?.glimpse?.items.slice(0, 3).map((g, i) => (
              <Reveal key={g.id} delay={i * 100} className={`glimpse-card ${i === 1 ? "drop" : ""}`}>
                <Photo src={g.image} alt={g.caption} />
                <div className="glimpse-cap">{g.caption}</div>
              </Reveal>
            ))}
          </div>
          <div className="center-row">
            <Link to="/gallery" className="btn btn-outline">{homedeta?.glimpse?.buttonText}<ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="reviews-band">
        <div className="container">
          <SectionHeading eyebrow={homedeta?.reviews?.eyebrow} title={homedeta?.reviews?.title} >
            <p className="rating"><span className="stars">{[...Array(5)].map((_, i) => <Star key={i} size={13} />)}</span> 4.9 from 200+ brides</p>
          </SectionHeading>
          <div className="grid-3">
            {homedeta?.reviews?.items.slice(0, 3).map((r, i) => (
              <Reveal key={r.id} delay={i * 90} className="quote-card">
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
            {homedeta?.promises?.items.map((v) => (
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
  );
}
