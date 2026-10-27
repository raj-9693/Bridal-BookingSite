// 18000 -> "₹18,000".  Admin se text aaye ("₹18,000") to waisa hi dikhao.
export const formatPrice = (n) =>
  typeof n === "number" ? `₹${n.toLocaleString("en-IN")}` : String(n ?? "");

// 18000 -> "From ₹18,000".  Text ("From ₹18,000") aaye to waisa hi.
export const fromPrice = (p) => (typeof p === "number" ? `From ${formatPrice(p)}` : String(p ?? ""));
