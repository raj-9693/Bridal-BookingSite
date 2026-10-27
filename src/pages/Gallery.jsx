import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PageHero from "../components/PageHero.jsx";
import FilterChips from "../components/gallery/FilterChips.jsx";
import LookCard from "../components/gallery/LookCard.jsx";
import LookViewer from "../components/gallery/LookViewer.jsx";
import { getDetagallery } from "../api/Apiclients/GalleryClients.js";

export default function Gallery() {
  const [data, setData] = useState(null); // server ka poora gallery data (intro, filters, items, focus)
  const [looks, setLooks] = useState([]);
  const [allLabel, setAllLabel] = useState("All looks"); // server se aayega (filters.allLabel)
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("All looks");
  const [applied, setApplied] = useState("All looks");
  const [swapping, setSwapping] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [dir, setDir] = useState("next");
  const gridRef = useRef(null);
  const viewerRef = useRef(null);
  const timer = useRef();

  // Server se data laao
  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await getDetagallery()
      const server=response?.data?.Gallery


      // Server mein item.category ek id hai ('c1'). Use label mein badlo ('Bridal Makeup'),
      // taaki LookCard, LookViewer aur filter ka baaki code waisa hi chale jaisa pehle tha.
      const labelById = Object.fromEntries(
        (server.filters?.categories ?? []).map((c) => [c.id, c.label])
      );

      const items = (server.items ?? [])
        .filter((item) => item.published !== false) // sirf published looks
        .map((item) => {
          const catLabel = labelById[item.category] ?? item.category;
          return {
            ...item,
            category: catLabel,
            label: catLabel, // LookCard ka <small>{look.label}</small> ke liye
            // LookViewer look.services.join(" · ") chalata hai, isliye details ki string ko array banao
            services: (item.details ?? "").split(" · ").filter(Boolean),
          };
        });

      const all = server.filters?.allLabel || "All looks";

      setData(server);
      setLooks(items);
      setAllLabel(all);
      setFilter(all);
      setApplied(all);
      // Shuru mein wahi look jo server ke focus.itemId mein hai, warna pehla look
      setActiveId(
        items.find((i) => i.id === server.focus?.itemId)?.id ?? items[0]?.id ?? null
      );
      setStatus("ready");
    } catch (err) {
      console.error("Gallery load error:", err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [load]);

  // Filter chips: server ke categories ka order, sirf wahi jinme looks hain
  const categories = useMemo(() => {
    const order = (data?.filters?.categories ?? []).map((c) => c.label);
    const used = new Set(looks.map((l) => l.category));
    return [allLabel, ...order.filter((label) => used.has(label))];
  }, [data, looks, allLabel]);

  // Filter ke hisaab se list
  const list = useMemo(
    () => (applied === allLabel ? looks : looks.filter((l) => l.category === applied)),
    [looks, applied, allLabel]
  );

  const found = list.findIndex((l) => l.id === activeId);
  const index = found < 0 ? 0 : found;
  const current = list[index] ?? null;

  // Filter badalne par fade transition
  const choose = (c) => {
    if (c === filter) return;
    setFilter(c);
    setSwapping(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const next = c === allLabel ? looks : looks.filter((l) => l.category === c);
      setApplied(c);
      setActiveId(next[0]?.id ?? null);
      setDir("next");
      setSwapping(false);
    }, 240);
  };

  const go = useCallback(
    (step) => {
      if (list.length < 2) return;
      const n = (index + step + list.length) % list.length;
      setDir(step > 0 ? "next" : "prev");
      setActiveId(list[n].id);
    },
    [list, index]
  );

  const onPrev = useCallback(() => go(-1), [go]);
  const onNext = useCallback(() => go(1), [go]);

  const select = (id) => {
    const i = list.findIndex((l) => l.id === id);
    setDir(i >= index ? "next" : "prev");
    setActiveId(id);
    viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      <PageHero
        center
        eyebrow={data?.intro?.eyebrow ?? "The Saanjh portfolio"}
        title={data?.intro?.title ?? "A little glimpse of forever."}
        text={
          data?.intro?.text ??
          "Explore the luminous details, soft rituals and personal beauty stories created for Saanjh brides across every celebration."
        }
      >
        {status === "ready" && (
          <FilterChips items={categories} value={filter} onChange={choose} />
        )}
      </PageHero>

      <div className="divider container" aria-hidden><span>❧</span></div>

      <section className="section looks-section" ref={gridRef}>
        <div className="container">

          {/* Loading skeletons */}
          {status === "loading" && (
            <div className="looks-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="look-skel" />
              ))}
            </div>
          )}

          {/* Error state */}
          {status === "error" && (
            <div className="state">
              <p>Looks could not be loaded right now.</p>
              <button className="btn btn-outline btn-sm" onClick={load}>Try again</button>
            </div>
          )}

          {/* Empty state */}
          {status === "ready" && list.length === 0 && (
            <div className="state"><p>New looks are coming soon.</p></div>
          )}

          {/* Cards grid */}
          {status === "ready" && list.length > 0 && (
            <div key={applied} className={`looks-grid ${swapping ? "out" : ""}`}>
              {list.map((l, i) => (
                <LookCard
                  key={l.id}
                  look={l}
                  index={i}
                  active={l.id === current?.id}
                  onSelect={select}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* In-focus viewer */}
      {status === "ready" && current && (
        <section className="band focus" ref={viewerRef}>
          <div className="container">
            <div className="section-head center">
              <div>
                <p className="eyebrow">{data?.focus?.eyebrow ?? "In focus"}</p>
                <h2 className="h2">
                  {data?.focus?.title ?? `A closer look at ${current.title}`}
                </h2>
              </div>
            </div>
            <LookViewer
              look={current}
              index={index}
              total={list.length}
              dir={dir}
              onPrev={onPrev}
              onNext={onNext}
              detailsLabel={data?.focus?.detailsLabel}
              buttonText={data?.focus?.buttonText}
              onClose={() =>
                gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            />
          </div>
        </section>
      )}
    </>
  );
}