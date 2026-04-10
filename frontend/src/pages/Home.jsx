import { Icon } from "../components/UI/Icons";
import PostCard from "../components/UI/PostCard";
import EventCard from "../components/UI/EventCard";

export default function HomePage({ data, navigate, onPostClick }) {
  const today = new Date().toISOString().split("T")[0];
  const upcomingEvents = data.events.filter(e => e.date >= today).slice(0, 3);
  const urgentNotice = data.notices.find(n => n.urgency === "urgent");
  const openTenders = data.tenders.filter(t => t.status === "open");

  return (
    <div className="page-anim">
      {/* Hero section with image background */}
      <div 
        style={{ 
          backgroundImage: "url('/prieska.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          color: "#fff", 
          padding: "64px 20px 72px", 
          textAlign: "center",
          isolation: "isolate"
        }}
      >
        {/* Dark overlay for text readability */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          zIndex: -1
        }} />
        {/* Optional decorative radial gradients */}
        <div style={{ 
          position: "absolute", 
          inset: 0, 
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0
        }} />
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 20, letterSpacing: 0.5 }}>NC077 · Established 2000</div>
          <h1 className="hero-text" style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.15, marginBottom: 18, textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>Serving Our Communities<br />with Pride & Purpose</h1>
          <p className="hero-sub" style={{ fontSize: 18, color: "#a8c4e0", maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.7 }}>Your gateway to municipal services, news, documents and events for Prieska, Niekerkshoop, Marydale and surrounding areas.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => navigate("news")} style={{ fontSize: 15, padding: "12px 28px" }}>Latest News</button>
            <button onClick={() => navigate("contact")} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", padding: "12px 28px", borderRadius: 6, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>Contact Us</button>
          </div>
        </div>
      </div>

      {/* Stats bar – clickable links (unchanged) */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="stat-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          <div style={{ padding: "20px 24px", textAlign: "center", borderRight: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1a4a7a" }}>6</div>
            <div style={{ fontSize: 13, color: "#4a5568", fontWeight: 600 }}>Wards</div>
            <div style={{ fontSize: 11, color: "#718096" }}>electoral wards</div>
          </div>
          <div style={{ padding: "20px 24px", textAlign: "center", borderRight: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1a4a7a" }}>~32K</div>
            <div style={{ fontSize: 13, color: "#4a5568", fontWeight: 600 }}>Population</div>
            <div style={{ fontSize: 11, color: "#718096" }}>residents served</div>
          </div>
          <button
            onClick={() => navigate("tenders")}
            style={{ padding: "20px 24px", textAlign: "center", borderRight: "1px solid #e2e8f0", background: "none", border: "none", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1a4a7a" }}>{openTenders.length}</div>
            <div style={{ fontSize: 13, color: "#4a5568", fontWeight: 600 }}>Open Tenders</div>
            <div style={{ fontSize: 11, color: "#718096" }}>opportunities</div>
          </button>
          <button
            onClick={() => navigate("documents")}
            style={{ padding: "20px 24px", textAlign: "center", background: "none", border: "none", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ fontSize: 26, fontWeight: 800, color: "#1a4a7a" }}>{data.documents.length}</div>
            <div style={{ fontSize: 13, color: "#4a5568", fontWeight: 600 }}>Documents</div>
            <div style={{ fontSize: 11, color: "#718096" }}>available</div>
          </button>
        </div>
      </div>

      {/* Rest of the component unchanged */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
        {urgentNotice && (
          <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderLeft: "4px solid #e67e22", borderRadius: 8, padding: "14px 18px", marginBottom: 32, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ color: "#e67e22", flexShrink: 0, marginTop: 2 }}><Icon.Alert /></span>
            <div>
              <div style={{ fontWeight: 700, color: "#7d4c00", fontSize: 14, marginBottom: 4 }}>{urgentNotice.title}</div>
              <div style={{ fontSize: 13, color: "#6b4c00", lineHeight: 1.6 }}>{urgentNotice.content.slice(0, 160)}…</div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20, color: "#1a202c" }}>Quick Access</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 48 }}>
          {[
            { label: "News & Updates", page: "news", icon: <Icon.News />, color: "#1a4a7a" },
            { label: "Events Calendar", page: "events", icon: <Icon.Calendar />, color: "#1e8449" },
            { label: "Documents", page: "documents", icon: <Icon.Doc />, color: "#7d3c98" },
            { label: "Notices", page: "notices", icon: <Icon.Bell />, color: "#a04000" },
            { label: "Tenders", page: "tenders", icon: <Icon.Tender />, color: "#2471a3" },
            { label: "Contact", page: "contact", icon: <Icon.Phone />, color: "#0e6655" },
          ].map(s => (
            <button key={s.page} onClick={() => navigate(s.page)} className="card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 16px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color + "15", color: s.color, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>{s.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#2d3748" }}>{s.label}</div>
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Latest News</h2>
              <button className="btn-outline" onClick={() => navigate("news")}>View All</button>
            </div>
            <div style={{ display: "grid", gap: 14 }}>
              {data.posts.slice(0, 4).map(post => <PostCard key={post.id} post={post} onClick={() => onPostClick(post)} />)}
            </div>
          </div>
        </div>

        {upcomingEvents.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Upcoming Events</h2>
              <button className="btn-outline" onClick={() => navigate("events")}>View All</button>
            </div>
            <div className="mobile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {upcomingEvents.map(ev => <EventCard key={ev.id} event={ev} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}