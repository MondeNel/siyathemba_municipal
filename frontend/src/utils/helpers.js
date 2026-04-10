export const CAT_COLOURS = {
  Infrastructure: "#1a5276",
  Council: "#1e8449",
  Community: "#7d3c98",
  Finance: "#a04000",
  Civic: "#2471a3",
  "Council Engagement": "#1e8449",
  Planning: "#0e6655",
  "Budget & Tariffs": "#a04000",
  "Annual Reports": "#1a5276",
  IDP: "#7d3c98",
  Policies: "#2471a3",
  open: "#155724",
  awarded: "#004085",
  closed: "#721c24",
};

export function catColor(cat) {
  return CAT_COLOURS[cat] || "#2c3e50";
}

export function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-ZA");
}