// "Let’s hold space for\nyour beautiful day."  ->  do line (<br />) me dikhata hai.
// Admin me Enter dabane se text me "\n" aata hai, HTML usse line-break nahi banata.
export default function Lines({ text = "" }) {
  return String(text).split("\n").map((line, i) => (
    <span key={i}>{i > 0 && <br />}{line}</span>
  ));
}
