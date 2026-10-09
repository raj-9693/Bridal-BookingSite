import CtaSection from "./CtaSection.jsx";
import Footer from "./Footer.jsx";

// hideCta=true -> sirf Footer (Booking pages par CTA nahi aata)
export default function BottomSection({ hideCta = false, ...props }) {
  return (
    <>
      {!hideCta && <CtaSection {...props} />}
      <Footer />
    </>
  );
}
