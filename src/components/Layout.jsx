import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import BottomSection from "./BottomSection.jsx";
import ChatButton from "./ChatButton.jsx";
import { ctaByPath } from "../data/content.js";

export default function Layout() {
  const { pathname } = useLocation();

  // ✅ Fixed useEffect (Strictly returning nothing/undefined)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Safe fallback for CTA content
  const currentCta = ctaByPath?.[pathname] || {};

  return (
    <>
      <Navbar />
      <main key={pathname} className="page">
        <Outlet />
      </main>
      <BottomSection {...currentCta} />
      <ChatButton />
    </>
  );
}