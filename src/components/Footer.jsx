import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Logo from "./Logo.jsx";
import Lines from "./Lines.jsx";
import { brand } from "../data/content.js";

// Server na mile to yahi purana text dikhta hai (footer kabhi khaali nahi hota).
const defaultLinks = [
  { id: "f1", label: "Services", to: "/services" },
  { id: "f2", label: "Gallery", to: "/gallery" },
  { id: "f3", label: "Bride reviews", to: "/reviews" },
  { id: "f4", label: "Book a consultation", to: "/booking" },
];

// Admin me link ka page chuna ho to wahi ("to"), warna label se andaza.
const guessRoute = (label = "") => {
  const l = label.toLowerCase();
  if (l.includes("service")) return "/services";
  if (l.includes("gallery")) return "/gallery";
  if (l.includes("review")) return "/reviews";
  if (l.includes("about")) return "/about";
  if (l.includes("book")) return "/booking";
  if (l.includes("contact")) return "/contact";
  return "/";
};

// Sab props server ke Bottom.footer se aate hain (Layout → BottomSection → yahan).
export default function Footer({
  blurb = "Bridal beauty, lovingly crafted for the moments that become family stories.",
  linksTitle = "Quick links",
  links = defaultLinks,
  visitTitle = "Find us",
  address = brand.address.join("\n"),
  email = brand.email,
  phone = brand.phone,
  followTitle = "Stay close",
  followText = "Follow the latest Saanjh brides and quiet beauty rituals.",
  instagram = "#",
  facebook = "#",
  youtube = "#",
  copyright = `© ${new Date().getFullYear()} Saanjh Bridal Beauty. All rights reserved.`,
  madeWith = "Made with care for every celebration.",
}) {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-about">{blurb}</p>
        </div>

        <div>
          <h4 className="footer-h">{linksTitle}</h4>
          <ul className="footer-list">
            {links.map((l) => (
              <li key={l.id ?? l.label}><Link to={l.to || guessRoute(l.label)}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="footer-h">{visitTitle}</h4>
          <ul className="footer-list contact">
            <li><MapPin size={16} /><span><Lines text={address} /></span></li>
            <li><Mail size={16} /><a href={`mailto:${email}`}>{email}</a></li>
            <li><Phone size={16} /><a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-h">{followTitle}</h4>
          <p className="footer-about">{followText}</p>
          <div className="socials">
            <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={18} /></a>
            <a href={facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook size={18} /></a>
            <a href={youtube} target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube size={18} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span>{copyright}</span>
          <span>{madeWith}</span>
        </div>
      </div>
    </footer>
  );
}
