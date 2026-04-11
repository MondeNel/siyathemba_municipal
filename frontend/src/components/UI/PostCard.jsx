import { useNavigate } from "react-router-dom";
import { Icon } from "./Icons";

function catColor(cat) {
  const colors = {
    Infrastructure: "#1a5276",
    Council: "#1e8449",
    Community: "#7d3c98",
    Finance: "#a04000",
    Civic: "#2471a3",
    "Council Engagement": "#1e8449",
  };
  return colors[cat] || "#2c3e50";
}

export default function PostCard({ post, large }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${post.id}`);
  };

  return (
    <div onClick={handleClick} className="card-hover"
      style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "18px 20px", cursor: "pointer", display: "flex", gap: 16, alignItems: "flex-start" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span className="tag" style={{ background: catColor(post.category) + "18", color: catColor(post.category) }}>{post.category}</span>
          <span style={{ fontSize: 12, color: "#a0aec0" }}>{post.created_at}</span>
        </div>
        <h3 style={{ fontSize: large ? 17 : 15, fontWeight: 700, color: "#1a202c", marginBottom: 8, lineHeight: 1.4 }}>{post.title}</h3>
        <p style={{ fontSize: 13, color: "#718096", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.content}</p>
        <span style={{ fontSize: 13, color: "#1a4a7a", fontWeight: 600, marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4 }}>Read more <Icon.ChevronRight /></span>
      </div>
    </div>
  );
}