import { CircleCheck } from "lucide-react";
import { formatPrice } from "../../utils/format.js";

export default function CompareTable({ packages, features }) {
  return (
    <div className="cmp-wrap">
      <table className="cmp">
        <thead>
          <tr>
            <th scope="col" className="cmp-first">Included with your booking</th>
            {packages.map((p) => (
              <th scope="col" key={p.id} className={p.popular ? "pop" : ""}>{p.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((f) => (
            <tr key={f.key}>
              <th scope="row">{f.label}</th>
              {packages.map((p) => (
                <td key={p.id} className={p.popular ? "pop" : ""}>
                  {p.includes.includes(f.key)
                    ? <span className="tick"><CircleCheck size={16} strokeWidth={1.6} /><span className="sr">Included</span></span>
                    : <span className="dash" aria-label="Not included">—</span>}
                </td>
              ))}
            </tr>
          ))}
          <tr className="total">
            <th scope="row">Starting investment</th>
            {packages.map((p) => (
              <td key={p.id} className={p.popular ? "pop" : ""}>{formatPrice(p.price)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
