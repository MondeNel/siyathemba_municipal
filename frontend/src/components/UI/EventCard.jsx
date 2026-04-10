import { Icon } from "./Icons";

function catColor(cat) {
  const colors = {
    "Council Engagement": "#1e8449",
    Finance: "#a04000",
    Civic: "#2471a3",
    Community: "#7d3c98",
  };
  return colors[cat] || "#2c3e50";
}

export default function EventCard({ event, large }) {
  const [day, month] = (() => {
    const d = new Date(event.date);
    return [d.getDate(), d.toLocaleString("default", { month: "short" }).toUpperCase()];
  })();

  return (
    <div className="card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", display: "flex" }}>
      <div style={{ width: 62, background: "#1a4a7a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: "12px 8px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{day}</div>
        <div style={{ fontSize: 11, color: "#a8c4e0", fontWeight: 700 }}>{month}</div>
      </div>
      <div style={{ padding: "14px 16px", flex: 1, minWidth: 0 }}>
        <span className="tag" style={{ background: catColor(event.category) + "18", color: catColor(event.category), marginBottom: 6, display: "inline-flex" }}>{event.category}</span>
        <h4 style={{ fontSize: 14, fontWeight: 700, color: "#1a202c", marginBottom: 6, lineHeight: 1.3 }}>{event.title}</h4>
        {large && <p style={{ fontSize: 12, color: "#718096", lineHeight: 1.5, marginBottom: 6 }}>{event.description?.slice(0, 100)}…</p>}
        <div style={{ fontSize: 12, color: "#718096", display: "flex", alignItems: "center", gap: 4 }}><Icon.MapPin />{event.location}</div>
        <div style={{ fontSize: 12, color: "#718096", marginTop: 2 }}>{event.time}</div>
      </div>
    </div>
  );
}
