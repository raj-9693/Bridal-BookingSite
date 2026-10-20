import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Reveal from "../components/Reveal.jsx";
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

      const serverPackages = services.packages?.items ?? services.packages ?? [];
      const serverFaqs = services.faqs ?? services.faq?.items ?? [];
      const packages = serverPackages.map((pkg, index) => ({
        ...pkg,
        id: pkg.id ?? pkg._id ?? index,
        name: pkg.name ?? pkg.title ?? "Service package",
        tagline: pkg.tagline ?? pkg.eyebrow ?? "",
        priceNote: pkg.priceNote ?? "onwards",
        features: Array.isArray(pkg.features)
          ? pkg.features
          : typeof pkg.features === "string"
            ? pkg.features.split(/\r?\n/).map((feature) => feature.trim()).filter(Boolean)
            : [],
      }));

      setData({
        ...services,
        packages,
        comparisonFeatures: services.comparisonFeatures ?? services.compare?.features ?? [],
        faqs: (Array.isArray(serverFaqs) ? serverFaqs : []).map((item, index) => ({
          ...item,
          id: item.id ?? `faq-${index}`,
          question: item.question ?? item.q ?? "",
          answer: item.answer ?? item.a ?? "",
        })),
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

  const hasComparison = data?.comparisonFeatures.length > 0
    && data.packages.every((pkg) => Array.isArray(pkg.includes));
  return (
    <>
      <PageHero
        center
        eyebrow="The Saanjh bridal menu"
        title="Beauty plans for every beautiful chapter."
        text="Choose the artistry that meets your celebration. Every Saanjh booking begins with a thoughtful conversation about your vision, rituals and personal glow."
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
                {data.packages.map((p, i) => <PackageCard key={p.id} pkg={p} index={i} />)}
              </div>
              {data.note && <p className="pkg-note">{data.note}</p>}
            </>
          )}
        </div>
      </section>

      {status === "ready" && hasComparison && (
        <>
          {/* COMPARISON */}
          <section className="band">
            <div className="container">
              <SectionHeading eyebrow="At a glance" title="Find your perfect Saanjh service.">
                <p className="head-note">All packages are thoughtfully tailored after a short consultation.</p>
              </SectionHeading>
              <Reveal>
                <CompareTable packages={data.packages} features={data.comparisonFeatures} />
              </Reveal>
            </div>
          </section>

        </>
      )}
      {status === "ready" && data.faqs.length > 0 && (
        <section className="section">
          <div className="container faq-layout">
            <Reveal>
              <p className="eyebrow">{data.faq?.eyebrow ?? "Before you book"}</p>
              <h2 className="h2">A calm start to<br />every beauty story.</h2>
              <p className="faq-intro">The practical details, answered with care. For anything more personal, our bridal concierge is only a message away.</p>
              <Link to="/booking" className="btn btn-outline btn-sm">{data.faq?.button ?? "Ask about your date"} <ArrowRight size={14} /></Link>
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
