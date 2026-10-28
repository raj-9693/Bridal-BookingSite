import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import BottomSection from "./BottomSection.jsx";
import ChatButton from "./ChatButton.jsx";
import { ctaByPath, brand } from "../data/content.js";
import { getDetaBottem } from "../api/Apiclients/BottomClient.js";

// Layout = Navbar + page + BottomSection (CTA + Footer) + Chat button.
// CTA + Footer ka data ek hi baar server se aata hai (Admin: Website → Bottom).
export default function Layout() {
  const { pathname } = useLocation();
  const [bottom, setBottom] = useState(null);
  const [bottomStatus, setBottomStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const loadBottom = async () => {
      try {
        const response = await getDetaBottem();
        if (!response?.data?.Bottom) throw new Error("Bottom data was missing from the response");
        setBottom(response.data.Bottom);
        setBottomStatus("ready");
      } catch (err) {
        console.log("Bottom data not loaded", err); // error par purana (default) text dikhta hai
        setBottomStatus("error");
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
      <BottomSection loading={bottomStatus === "loading"} hideCta={page.hideCta} tone={page.tone} cta={cta} footer={bottom?.footer} />
      {bottomStatus !== "loading" && <ChatButton whatsapp={whatsapp} />}
    </>
  );
}
