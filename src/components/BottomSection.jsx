import CtaSection from "./CtaSection.jsx";
import Footer from "./Footer.jsx";

// hideCta=true -> sirf Footer (Booking / Contact par CTA nahi aata)
// cta = { eyebrow, title, text, button }   footer = { blurb, links, address, ... }  (server ka Bottom data)
export default function BottomSection({ hideCta = false, tone, cta, footer }) {
  return (
    <>
      {!hideCta && <CtaSection {...cta} tone={tone} />}
      <Footer {...footer} />
    </>
  );
}
