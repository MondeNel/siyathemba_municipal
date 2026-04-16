import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/UI/PageHeader";
import PostCard from "../components/UI/PostCard";

export default function NewsPage({ data }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(data.posts.map(p => p.category))];
  const filtered = filter === "All" ? data.posts : data.posts.filter(p => p.category === filter);

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <PageHeader title="News & Updates" subtitle="Stay informed with the latest from Siyathemba Municipality" />
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: filter === cat ? "#1a4a7a" : "#e2e8f0", background: filter === cat ? "#1a4a7a" : "#fff", color: filter === cat ? "#fff" : "#4a5568" }}>{cat}</button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {filtered.map(post => <PostCard key={post.id} post={post} large />)}
      </div>
    </div>
  );
}