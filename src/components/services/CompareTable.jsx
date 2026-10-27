import { CircleCheck } from "lucide-react";
import { formatPrice } from "../../utils/format.js";

// firstLabel / totalLabel admin se aate hain (Services → Comparison table)
export default function CompareTable({ packages, features, firstLabel = "Included with your booking", totalLabel = "Starting investment" }) {
  return (
    <div className="cmp-wrap">
      <table className="cmp">
        <thead>
          <tr>
            <th scope="col" className="cmp-first">{firstLabel}</th>
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
            <th scope="row">{totalLabel}</th>
            {packages.map((p) => (
              <td key={p.id} className={p.popular ? "pop" : ""}>{formatPrice(p.price)}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
