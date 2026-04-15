import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Icon } from '../UI/Icons';
import { useAdmin } from "../../context/AdminContext";
import { useData } from "../../context/DataContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, events, documents, notices, tenders } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { isAdmin, login, logout } = useAdmin();

  const currentPath = location.pathname === "/" ? "home" : location.pathname.slice(1);

  const getNewCount = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return items.filter(item => {
      if (!item.created_at) return false;
      const itemDate = new Date(item.created_at);
      return itemDate >= sevenDaysAgo;
    }).length;
  };

  const newPosts = getNewCount(posts);
  const newEvents = getNewCount(events);
  const newDocuments = getNewCount(documents);
  const newNotices = getNewCount(notices);
  const newTenders = getNewCount(tenders);

  const navItems = [
    { id: "home", label: "Home", icon: <Icon.Home />, path: "/", badge: 0 },
    { id: "news", label: "News", icon: <Icon.News />, path: "/news", badge: newPosts },
    { id: "events", label: "Events", icon: <Icon.Calendar />, path: "/events", badge: newEvents },
    { id: "documents", label: "Documents", icon: <Icon.Doc />, path: "/documents", badge: newDocuments },
    { id: "notices", label: "Notices", icon: <Icon.Bell />, path: "/notices", badge: newNotices },
    { id: "tenders", label: "Tenders", icon: <Icon.Tender />, path: "/tenders", badge: newTenders },
    { id: "council", label: "Council", icon: <Icon.Briefcase />, path: "/council", badge: 0 },
    { id: "contact", label: "Contact", icon: <Icon.Phone />, path: "/contact", badge: 0 },
  ];

  const navigateTo = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleAdminLogin = () => {
    if (login(adminEmail, adminPassword)) {
      setShowAdminModal(false);
      setAdminEmail("");
      setAdminPassword("");
      setLoginError("");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    color: "white",
    fontSize: "10px",
    fontWeight: "bold",
    borderRadius: "9999px",
    minWidth: "18px",
    height: "18px",
    padding: "0 5px",
    marginLeft: "6px",
    lineHeight: "1",
  };

  return (
    <nav style={{ background: "linear-gradient(135deg, #1a4a7a 0%, #0d2d4f 100%)", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => navigateTo("/")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", background: "none", border: "none", cursor: "pointer" }}>
          <img src="/LOGO.png" alt="Siyathemba Municipality Logo" style={{ width: 42, height: 42, objectFit: "contain", borderRadius: 4 }} />
          <div style={{ textAlign: "left" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>Siyathemba</div>
            <div style={{ color: "#a8c4e0", fontSize: 11, lineHeight: 1 }}>Local Municipality · NC077</div>
          </div>
        </button>

        <div className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.path)}
              className={`nav-item ${currentPath === item.id ? "active" : ""}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 14px",
                borderRadius: 6,
                color: currentPath === item.id ? "#fff" : "#a8c4e0",
                fontSize: 13,
                fontWeight: currentPath === item.id ? 700 : 500,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {item.icon}
              {item.label}
              {item.badge > 0 && <span style={badgeStyle}>{item.badge}</span>}
            </button>
          ))}
          {!isAdmin ? (
            <button onClick={() => setShowAdminModal(true)} className="nav-item" style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", borderRadius: 6, color: "#a8c4e0", fontSize: 13, fontWeight: 500, background: "transparent", border: "none", cursor: "pointer" }}>
              <Icon.Briefcase /> Admin
            </button>
          ) : (
            <button onClick={logout} className="nav-item" style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", borderRadius: 6, color: "#a8c4e0", fontSize: 13, fontWeight: 500, background: "transparent", border: "none", cursor: "pointer" }}>
              <Icon.Close /> Logout
            </button>
          )}
        </div>

        <button className="mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "#fff", padding: 8, background: "none", border: "none", cursor: "pointer" }}>
          {mobileMenuOpen ? <Icon.Close /> : <Icon.Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-only" style={{ background: "#0d2d4f", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "8px 0 12px" }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: "12px 24px",
                color: currentPath === item.id ? "#fff" : "#a8c4e0",
                fontSize: 15,
                fontWeight: currentPath === item.id ? 700 : 400,
                background: currentPath === item.id ? "rgba(255,255,255,0.1)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
              }}
            >
              {item.icon}
              {item.label}
              {item.badge > 0 && <span style={{ ...badgeStyle, marginLeft: "auto" }}>{item.badge}</span>}
            </button>
          ))}
          {!isAdmin ? (
            <button onClick={() => setShowAdminModal(true)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 24px", color: "#a8c4e0", fontSize: 15, fontWeight: 400, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <Icon.Briefcase /> Admin
            </button>
          ) : (
            <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 24px", color: "#a8c4e0", fontSize: 15, fontWeight: 400, background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
              <Icon.Close /> Logout
            </button>
          )}
        </div>
      )}

      {showAdminModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(4px)" }}>
          <div style={{ background: "#fff", borderRadius: 20, width: 450, maxWidth: "90%", maxHeight: "85vh", overflow: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", animation: "modalFadeIn 0.2s ease" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", borderRadius: "20px 20px 0 0" }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a202c", margin: 0 }}>Admin Login</h3>
              <button onClick={() => setShowAdminModal(false)} style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#94a3b8", padding: "0 8px", transition: "color 0.15s" }} onMouseEnter={(e) => e.target.style.color = "#1a202c"} onMouseLeave={(e) => e.target.style.color = "#94a3b8"}>&times;</button>
            </div>
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 18 }}>
              {loginError && <div style={{ background: "#fee2e2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 12px", color: "#dc2626", fontSize: 13, fontWeight: 500 }}>{loginError}</div>}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>Email Address</label>
                <input type="email" placeholder="admin@siyathemba.gov.za" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s" }} onFocus={(e) => { e.target.style.borderColor = "#1a4a7a"; e.target.style.boxShadow = "0 0 0 3px rgba(26,74,122,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; e.target.style.boxShadow = "none"; }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>Password</label>
                <input type="password" placeholder="••••••••" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()} style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "14px", outline: "none", transition: "border-color 0.15s, box-shadow 0.15s" }} onFocus={(e) => { e.target.style.borderColor = "#1a4a7a"; e.target.style.boxShadow = "0 0 0 3px rgba(26,74,122,0.1)"; }} onBlur={(e) => { e.target.style.borderColor = "#cbd5e1"; e.target.style.boxShadow = "none"; }} />
              </div>
            </div>
            <div style={{ padding: "16px 24px", borderTop: "1px solid #e2e8f0", display: "flex", justifyContent: "flex-end", gap: 12, background: "#f8fafc", borderRadius: "0 0 20px 20px" }}>
              <button onClick={() => setShowAdminModal(false)} className="btn-outline" style={{ padding: "8px 20px" }}>Cancel</button>
              <button onClick={handleAdminLogin} className="btn-primary" style={{ padding: "8px 24px" }}>Login</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
