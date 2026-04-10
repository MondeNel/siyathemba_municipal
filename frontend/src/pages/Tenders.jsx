import { useState } from "react";
import PageHeader from "../components/UI/PageHeader";
import EmptyState from "../components/UI/EmptyState";
import { catColor } from "../utils/helpers";

export default function TendersPage({ data }) {
  const [status, setStatus] = useState("open");
  const [cat, setCat] = useState("all");
  const filtered = data.tenders.filter(t => (status === "all" || t.status === status) && (cat === "all" || t.category === cat));

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <PageHeader title="Tenders & Quotations" subtitle="Current procurement opportunities and bid results" />
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "open", "awarded", "closed"].map(s => (
            <button key={s} onClick={() => setStatus(s)} style={{ padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: status === s ? "#1a4a7a" : "#e2e8f0", background: status === s ? "#1a4a7a" : "#fff", color: status === s ? "#fff" : "#4a5568", textTransform: "capitalize" }}>{s}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "tender", "quotation"].map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: cat === c ? "#7d3c98" : "#e2e8f0", background: cat === c ? "#7d3c98" : "#fff", color: cat === c ? "#fff" : "#4a5568", textTransform: "capitalize" }}>{c === "all" ? "All Types" : c + "s"}</button>
          ))}
        </div>
      </div>
      {filtered.length === 0 && <EmptyState message="No tenders match your filters." />}
      <div style={{ display: "grid", gap: 14 }}>
        {filtered.map(t => (
          <div key={t.id} className="card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#718096", background: "#f7fafc", padding: "3px 8px", borderRadius: 4, border: "1px solid #e2e8f0" }}>{t.reference}</span>
                  <span className="badge" style={{ background: catColor(t.category) + "18", color: catColor(t.category) }}>{t.category.toUpperCase()}</span>
                  <span className="badge" style={{ background: catColor(t.status) + "18", color: catColor(t.status) }}>{t.status.toUpperCase()}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a202c", marginBottom: 6 }}>{t.title}</h3>
                <p style={{ fontSize: 13, color: "#718096", lineHeight: 1.6 }}>{t.description}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center", paddingTop: 12, borderTop: "1px solid #f0f0f0", flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: t.status === "open" ? "#1e8449" : "#718096", fontWeight: 600 }}>{t.status === "open" ? `Closes: ${t.closing_date}` : t.status === "awarded" ? "Awarded" : `Closed: ${t.closing_date}`}</span>
              {t.status === "open" && (<button className="btn-primary" style={{ fontSize: 13, padding: "7px 18px", marginLeft: "auto" }}>Request Documents</button>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
