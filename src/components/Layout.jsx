import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import BottomSection from "./BottomSection.jsx";
import ChatButton from "./ChatButton.jsx";
import { ctaByPath, brand } from "../data/content.js";
import { getDetaBottom } from "../api/Apiclients/BottomClient.js";

// Layout = Navbar + page + BottomSection (CTA + Footer) + Chat button.
// CTA + Footer ka data ek hi baar server se aata hai (Admin: Website → Bottom).
export default function Layout() {
  const { pathname } = useLocation();
  const [bottom, setBottom] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const loadBottom = async () => {
      try {
        const response = await getDetaBottom();
        setBottom(response.data.Bottom);
      } catch (err) {
        console.log("Bottom data not loaded", err); // purana text dikhta rahega
      }
    };
    loadBottom();
  }, []);

  // Page ke hisaab se: CTA chhupana (hideCta) ya dark box (tone). Text server ka (shared).
  const page = ctaByPath?.[pathname] || {};
  const cta = bottom?.cta ?? { title: page.title, text: page.text };

  // WhatsApp number = footer ka phone number (sirf digits)
  const whatsapp = (bottom?.footer?.phone ?? brand.phone).replace(/\D/g, "");

  return (
    <>
      <Navbar />
      <main key={pathname} className="page">
        <Outlet context={{ whatsapp }} />
      </main>
      <BottomSection hideCta={page.hideCta} tone={page.tone} cta={cta} footer={bottom?.footer} />
      <ChatButton whatsapp={whatsapp} />
    </>
  );
}
