import { catColor } from "../utils/helpers";

export default function ArticleView({ post, onBack }) {
  return (
    <div className="page-anim" style={{ maxWidth: 760, margin: "0 auto", padding: "40px 20px" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, color: "#1a4a7a", fontWeight: 600, fontSize: 14, marginBottom: 28, background: "none", border: "none", cursor: "pointer" }}>← Back to News</button>
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: "36px 32px" }}>
        <span className="tag" style={{ background: catColor(post.category) + "18", color: catColor(post.category), marginBottom: 16, display: "inline-flex" }}>{post.category}</span>
        <h1 style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.3, marginBottom: 16, color: "#1a202c" }}>{post.title}</h1>
        <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#718096", marginBottom: 28, flexWrap: "wrap" }}><span>By {post.author}</span><span>{post.created_at}</span></div>
        <div style={{ height: 1, background: "#f0f0f0", marginBottom: 28 }} />
        <p style={{ fontSize: 16, lineHeight: 1.9, color: "#2d3748" }}>{post.content}</p>
      </div>
    </div>
  );
}