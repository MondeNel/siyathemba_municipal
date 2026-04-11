import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "../UI/Icons";

export default function Footer({ data }) {
  const navigate = useNavigate();
  const [showVacanciesModal, setShowVacanciesModal] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);

  // Safely get vacancies (notices with category "vacancy")
  const vacancies = data?.notices?.filter(n => n.category === "vacancy") || [];

  // Debug: log vacancies count to console (remove in production)
  useEffect(() => {
    if (vacancies.length === 0) {
      console.warn("No vacancies found in data. Check your data store.");
    }
  }, [vacancies]);

  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleQuickLink = (path) => {
    navigate(path);
  };

  return (
    <footer style={{ background: "#0d2d4f", color: "#a8c4e0", padding: "40px 20px 20px", marginTop: 60 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, marginBottom: 32 }}>
          {/* Logo and description */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <img src="/LOGO.png" alt="Siyathemba Municipality Logo" style={{ width: 38, height: 38, objectFit: "contain", borderRadius: 4 }} />
              <div>
                <div style={{ color: "#fff", fontWeight: 700 }}>Siyathemba</div>
                <div style={{ fontSize: 11 }}>Local Municipality</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>
              Serving the communities of Prieska, Niekerkshoop, Marydale and surrounding areas in the Northern Cape.
            </p>
          </div>

          {/* Quick Links – clickable */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Quick Links</h4>
            {[
              { label: "News & Updates", path: "/news" },
              { label: "Events", path: "/events" },
              { label: "Documents", path: "/documents" },
              { label: "Tenders & Quotations", path: "/tenders" },
              { label: "Vacancies", action: "modal" }
            ].map(item => (
              <div
                key={item.label}
                style={{
                  fontSize: 13,
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  cursor: "pointer"
                }}
                onClick={() => item.action === "modal" ? setShowVacanciesModal(true) : handleQuickLink(item.path)}
              >
                <Icon.ChevronRight /> {item.label}
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Contact</h4>
            <div style={{ fontSize: 13, lineHeight: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon.Phone /> 053 492 3420</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon.Mail /> info@siyathemba.gov.za</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Icon.MapPin />
                <span>Civic Centre, Prieska<br />Northern Cape, 8940</span>
              </div>
            </div>
          </div>

          {/* Emergency Numbers */}
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Emergency Numbers</h4>
            <div style={{ fontSize: 13, lineHeight: 2 }}>
              <div>Water Emergencies: 053 492 0001</div>
              <div>Electricity: 053 492 0002</div>
              <div>Police: 10111</div>
              <div>Ambulance: 10177</div>
              <div>Fire: 053 492 0003</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: 16,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
          fontSize: 12
        }}>
          <span>© 2026 Siyathemba Local Municipality. All rights reserved. | Created by Monde Nel</span>
          <span>Registered Municipal Entity · NC077 · Northern Cape</span>
        </div>
      </div>

      {/* Vacancies Modal */}
      {showVacanciesModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          backdropFilter: "blur(4px)"
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 20,
            width: 650,
            maxWidth: "90%",
            maxHeight: "85vh",
            overflow: "auto",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            animation: "modalFadeIn 0.2s ease"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f8fafc",
              borderRadius: "20px 20px 0 0"
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a202c", margin: 0 }}>
                {selectedVacancy ? "Vacancy Details" : "Current Vacancies"}
              </h3>
              <button
                onClick={() => {
                  setShowVacanciesModal(false);
                  setSelectedVacancy(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 24,
                  cursor: "pointer",
                  color: "#94a3b8",
                  padding: "0 8px",
                  transition: "color 0.15s"
                }}
                onMouseEnter={(e) => e.target.style.color = "#1a202c"}
                onMouseLeave={(e) => e.target.style.color = "#94a3b8"}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px" }}>
              {selectedVacancy ? (
                // Detailed view
                <div>
                  <button
                    onClick={() => setSelectedVacancy(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1a4a7a",
                      cursor: "pointer",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 20,
                      padding: 0
                    }}
                  >
                    ← Back to all vacancies
                  </button>
                  <div style={{ borderBottom: "1px solid #e2e8f0", marginBottom: 16, paddingBottom: 12 }}>
                    <h4 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#1a202c" }}>
                      {selectedVacancy.title}
                    </h4>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13, color: "#718096" }}>
                      <span>📅 Posted: {formatDate(selectedVacancy.created_at)}</span>
                      <span>🔖 Category: {selectedVacancy.category}</span>
                    </div>
                  </div>
                  <div style={{ lineHeight: 1.8, fontSize: 15, color: "#334155" }}>
                    <p>{selectedVacancy.content}</p>
                  </div>
                  <div style={{ marginTop: 24, background: "#f0fdf4", border: "1px solid #dcfce7", borderRadius: 8, padding: "12px 16px" }}>
                    <p style={{ fontSize: 13, color: "#166534" }}>
                      <strong>How to apply:</strong> Submit your application to the Municipal Manager, Siyathemba Local Municipality, Civic Centre, Prieska, 8940. For enquiries, contact HR at 053 492 3420.
                    </p>
                  </div>
                </div>
              ) : vacancies.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#718096" }}>
                  <Icon.Bell style={{ width: 48, height: 48, marginBottom: 16 }} />
                  <p>No current vacancies. Please check back later.</p>
                </div>
              ) : (
                // List of vacancies – all displayed
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {vacancies.map(v => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVacancy(v)}
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: 12,
                        padding: "16px 20px",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        background: "#fff"
                      }}
                      className="card-hover"
                    >
                      <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: "#1a202c" }}>
                        {v.title}
                      </h4>
                      <div style={{ display: "flex", gap: 12, marginBottom: 8, fontSize: 12, color: "#718096" }}>
                        <span>📅 {formatDate(v.created_at)}</span>
                        <span>🔖 {v.category}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#4a5568", lineHeight: 1.6 }}>
                        {v.content.substring(0, 120)}…
                      </p>
                      <div style={{ marginTop: 8, color: "#1a4a7a", fontSize: 12, fontWeight: 600 }}>
                        Click to read more →
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}