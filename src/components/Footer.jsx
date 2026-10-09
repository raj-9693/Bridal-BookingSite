import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Logo from "./Logo.jsx";
import { brand } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-about">Bridal beauty, lovingly crafted for the moments that become family stories.</p>
        </div>

        <div>
          <h4 className="footer-h">Quick links</h4>
          <ul className="footer-list">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/reviews">Bride reviews</Link></li>
            <li><Link to="/booking">Book a consultation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-h">Find us</h4>
          <ul className="footer-list contact">
            <li><MapPin size={16} /><span>{brand.address[0]}<br />{brand.address[1]}</span></li>
            <li><Mail size={16} /><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
            <li><Phone size={16} /><a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-h">Stay close</h4>
          <p className="footer-about">Follow the latest Saanjh brides and quiet beauty rituals.</p>
          <div className="socials">
            <a href="#" aria-label="Instagram"><FaInstagram size={18} /></a>
            <a href="#" aria-label="Facebook"><FaFacebook size={18} /></a>
            <a href="#" aria-label="YouTube"><FaYoutube size={18} /></a>
          </div>

        </div>
      </div>

      <div className="footer-bar">
        <div className="container footer-bar-inner">
          <span>© {new Date().getFullYear()} Saanjh Bridal Beauty. All rights reserved.</span>
          <span>Made with care for every celebration.</span>
        </div>
      </div>
    </footer>
  );
}
