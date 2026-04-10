import { useState } from "react";
import PageHeader from "../components/UI/PageHeader";
import { catColor } from "../utils/helpers";

export default function NoticesPage({ data }) {
  const [tab, setTab] = useState("all");
  const tabs = [{ id: "all", label: "All" }, { id: "public", label: "Public Notices" }, { id: "media", label: "Media" }, { id: "vacancy", label: "Vacancies" }];
  const filtered = tab === "all" ? data.notices : data.notices.filter(n => n.category === tab);

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <PageHeader title="Notices & Announcements" subtitle="Public notices, media releases and municipal vacancies" />
      <div style={{ display: "flex", gap: 4, background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 4, marginBottom: 28, width: "fit-content", flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 18px", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: tab === t.id ? "#fff" : "transparent", color: tab === t.id ? "#1a4a7a" : "#718096", boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>{t.label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {filtered.map(notice => (
          <div key={notice.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderLeft: `4px solid ${notice.urgency === "urgent" ? "#e67e22" : catColor(notice.category)}`, borderRadius: 8, padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a202c", lineHeight: 1.4 }}>{notice.title}</h3>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {notice.urgency === "urgent" && <span className="badge" style={{ background: "#fff3cd", color: "#7d4c00" }}>URGENT</span>}
                <span className="badge" style={{ background: "#edf2f7", color: "#4a5568" }}>{notice.category.toUpperCase()}</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.7 }}>{notice.content}</p>
            <div style={{ marginTop: 10, fontSize: 12, color: "#a0aec0" }}>{notice.created_at}</div>
          </div>
        ))}
      </div>
    </div>
  );
}