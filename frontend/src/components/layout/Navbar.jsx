import { useState } from "react";
import { Icon } from '../UI/Icons'

export default function Navbar({ currentPage, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: <Icon.Home /> },
    { id: "news", label: "News", icon: <Icon.News /> },
    { id: "events", label: "Events", icon: <Icon.Calendar /> },
    { id: "documents", label: "Documents", icon: <Icon.Doc /> },
    { id: "notices", label: "Notices", icon: <Icon.Bell /> },
    { id: "tenders", label: "Tenders", icon: <Icon.Tender /> },
    { id: "council", label: "Council", icon: <Icon.Briefcase /> },
    { id: "contact", label: "Contact", icon: <Icon.Phone /> },
  ];

  const navigate = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav style={{ background: "linear-gradient(135deg, #1a4a7a 0%, #0d2d4f 100%)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigate("home")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", background: "none", border: "none", cursor: "pointer" }}>
          {/* Replace the SLM text div with an image */}
          <img 
            src="/LOGO.png" 
            alt="Siyathemba Municipality Logo" 
            style={{ width: 42, height: 42, objectFit: "contain", borderRadius: 4 }} 
          />
          <div style={{ textAlign: "left" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Siyathemba</div>
            <div style={{ color: "#a8c4e0", fontSize: 11, lineHeight: 1 }}>Local Municipality · NC077</div>
          </div>
        </button>

        <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => navigate(item.id)}
              className={`nav-item ${currentPage === item.id ? "active" : ""}`}
              style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", borderRadius: 6, color: currentPage === item.id ? "#fff" : "#a8c4e0", fontSize: 13, fontWeight: currentPage === item.id ? 700 : 500, background: "transparent", border: "none", cursor: "pointer" }}>
              {item.icon}{item.label}
            </button>
          ))}
        </div>

        <button className="mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: "#fff", padding: 8, background: "none", border: "none", cursor: "pointer" }}>
          {mobileMenuOpen ? <Icon.Close /> : <Icon.Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-only" style={{ background: "#0d2d4f", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "8px 0 12px" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => navigate(item.id)}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 24px", color: currentPage === item.id ? "#fff" : "#a8c4e0", fontSize: 15, fontWeight: currentPage === item.id ? 700 : 400, background: currentPage === item.id ? "rgba(255,255,255,0.1)" : "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              {item.icon}{item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}