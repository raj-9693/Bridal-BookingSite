// 18000 -> "₹18,000"
export const formatPrice = (n) => `₹${Number(n).toLocaleString("en-IN")}`;
