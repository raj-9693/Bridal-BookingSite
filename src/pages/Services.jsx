import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
import Lines from "../components/Lines.jsx";
import PackageCard from "../components/services/PackageCard.jsx";
import CompareTable from "../components/services/CompareTable.jsx";
import Faq from "../components/services/Faq.jsx";
import { getDetaServices } from "../api/Apiclients/ServicesClients.js";
import "../styles/services.css";

export default function Services() {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await getDetaServices();
      const services = response?.data?.Services;
      if (!services) throw new Error("Services data was missing from the response");

      const rows = services.compare?.rows ?? [];

      // Card ko sirf wahi data jo chahiye (props): name, price, features...
      const packages = (services.packages?.items ?? []).map((item) => ({
        id: item.id,
        name: item.title,
        tagline: item.eyebrow,
        price: item.price,
        priceNote: item.priceNote,
        image: item.image,
        popular: item.popular,
        button: item.button,
        features: String(item.features ?? "").split("\n").map((f) => f.trim()).filter(Boolean),
        // comparison table: is package me kaun si rows included hain
        includes: rows.filter((r) => r.inc?.[item.id]).map((r) => r.id),
      }));

      setData({
        hero: services.hero,
        note: services.packages?.note,
        badge: services.packages?.badge,
        packages,
        compare: services.compare,
        comparisonFeatures: rows.map((r) => ({ key: r.id, label: r.label })),
        faq: services.faq,
        faqs: (services.faq?.items ?? []).map((f) => ({ id: f.id, question: f.q, answer: f.a })),
      });
      setStatus("ready");
    } catch (error) {
      console.error("Could not load services data", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const hasComparison = data?.comparisonFeatures.length > 0;

  return (
    <>
      <PageHero
        center
        eyebrow={data?.hero?.eyebrow ?? "The Saanjh bridal menu"}
        title={<Lines text={data?.hero?.title ?? "Beauty plans for every beautiful chapter."} />}
        text={data?.hero?.text ?? "Choose the artistry that meets your celebration. Every Saanjh booking begins with a thoughtful conversation about your vision, rituals and personal glow."}
      />
      <div className="divider container" aria-hidden><span>❧</span></div>

      {/* PACKAGES */}
      <section className="section pkg-section">
        <div className="container">
          {status === "loading" && <div className="pkg-grid">{[...Array(4)].map((_, i) => <div key={i} className="pkg-skel" />)}</div>}
          {status === "error" && (
            <div className="state">
              <p>Packages could not be loaded right now.</p>
              <button className="btn btn-outline btn-sm" onClick={load}>Try again</button>
            </div>
          )}
          {status === "ready" && (
            <>
              <div className="pkg-grid">
                {data.packages.map((p, i) => <PackageCard key={p.id} pkg={p} badge={data.badge} index={i} />)}
              </div>
              {data.note && <p className="pkg-note">{data.note}</p>}
            </>
          )}
        </div>
      </section>

      {status === "ready" && hasComparison && (
        <section className="band">
          <div className="container">
            <SectionHeading eyebrow={data.compare.eyebrow} title={data.compare.title}>
              <p className="head-note">{data.compare.note}</p>
            </SectionHeading>
            <Reveal>
              <CompareTable
                packages={data.packages}
                features={data.comparisonFeatures}
                firstLabel={data.compare.tableLabel}
                totalLabel={data.compare.priceRowLabel}
              />
            </Reveal>
          </div>
        </section>
      )}

      {status === "ready" && data.faqs.length > 0 && (
        <section className="section">
          <div className="container faq-layout">
            <Reveal>
              <p className="eyebrow">{data.faq.eyebrow}</p>
              <h2 className="h2"><Lines text={data.faq.title} /></h2>
              <p className="faq-intro">{data.faq.text}</p>
              {data.faq.button && (
                <Link to="/booking" className="btn btn-outline btn-sm">{data.faq.button} <ArrowRight size={14} /></Link>
              )}
            </Reveal>
            <Reveal delay={120}>
              <Faq items={data.faqs} />
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
