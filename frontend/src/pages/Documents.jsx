import { useState } from "react";
import PageHeader from "../components/UI/PageHeader";
import { Icon } from "../components/UI/Icons";
import { catColor } from "../utils/helpers";

export default function DocumentsPage({ data }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const categories = ["All", ...new Set(data.documents.map(d => d.category))];
  const filtered = data.documents.filter(d => (filter === "All" || d.category === filter) && d.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <PageHeader title="Documents & Downloads" subtitle="Official municipal documents, reports, policies and tariffs" />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 250px" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#a0aec0" }}><Icon.Search /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." style={{ width: "100%", padding: "9px 12px 9px 38px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff" }} />
        </div>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: filter === cat ? "#1a4a7a" : "#e2e8f0", background: filter === cat ? "#1a4a7a" : "#fff", color: filter === cat ? "#fff" : "#4a5568" }}>{cat}</button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#a0aec0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>-</div>
          <p style={{ fontSize: 15 }}>No documents match your search.</p>
        </div>
      )}
      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map(doc => (
          <div key={doc.id} className="card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 46, height: 52, background: "#fee2e2", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 11, fontWeight: 800, color: "#c53030" }}>PDF</span></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "#1a202c" }}>{doc.title}</div>
              <div style={{ fontSize: 13, color: "#718096", marginBottom: 6, lineHeight: 1.5 }}>{doc.description}</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <span className="tag" style={{ background: catColor(doc.category) + "18", color: catColor(doc.category) }}>{doc.category}</span>
                <span style={{ fontSize: 12, color: "#a0aec0" }}>{doc.file_size}</span>
                <span style={{ fontSize: 12, color: "#a0aec0" }}>{doc.downloads} downloads</span>
              </div>
            </div>
            <button className="btn-primary" style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 7, fontSize: 13, padding: "8px 16px" }}><Icon.Download /> Download</button>
          </div>
        ))}
      </div>
    </div>
  );
}
