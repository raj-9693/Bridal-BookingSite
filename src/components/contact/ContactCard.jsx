import { ArrowUpRight } from "lucide-react";

// href ho to poora card link banta hai. arrow=true -> right me chhota arrow.
export default function ContactCard({ icon: Ico, label, href, external = false, arrow = false, note, index = 0, children }) {
  const body = (
    <>
      <span className="cc-ic"><Ico size={20} strokeWidth={1.5} /></span>
      <span className="cc-t">
        <small>{label}</small>
        <b>{children}</b>
        {note && <em>{note}</em>}
      </span>
      {arrow && <ArrowUpRight className="cc-arrow" size={16} strokeWidth={1.6} />}
    </>
  );
  const style = { "--i": index };
  return href ? (
    <a className="cc link" style={style} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>{body}</a>
  ) : (
    <div className="cc" style={style}>{body}</div>
  );
}
