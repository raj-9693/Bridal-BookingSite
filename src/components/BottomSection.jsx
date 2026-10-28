import CtaSection from "./CtaSection.jsx";
import Footer from "./Footer.jsx";
import { CtaSkeleton, FooterSkeleton } from "./skeletons/BottomSkeleton.jsx";

// loading=true -> CTA + Footer ki jagah shimmer (server se Bottom data aane tak)
// hideCta=true -> sirf Footer (Booking / Contact par CTA nahi aata)
// cta = { eyebrow, title, text, button }   footer = { blurb, links, address, ... }  (server ka Bottom data)
export default function BottomSection({ loading = false, hideCta = false, tone, cta, footer }) {
  if (loading) {
    return (
      <>
        {!hideCta && <CtaSkeleton tone={tone} />}
        <FooterSkeleton />
      </>
    );
  }
  return (
    <>
      {!hideCta && <CtaSection {...cta} tone={tone} />}
      <Footer {...footer} />
    </>
  );
}
