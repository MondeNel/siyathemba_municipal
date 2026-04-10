import { Icon } from '../UI/Icons'

export default function Footer() {
  return (
    <footer style={{ background: "#0d2d4f", color: "#a8c4e0", padding: "40px 20px 20px", marginTop: 60 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32, marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, borderRadius: 6, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#1a4a7a", fontSize: 14 }}>SLM</div>
              <div>
                <div style={{ color: "#fff", fontWeight: 700 }}>Siyathemba</div>
                <div style={{ fontSize: 11 }}>Local Municipality</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 260 }}>Serving the communities of Prieska, Niekerkshoop, Marydale and surrounding areas in the Northern Cape.</p>
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Quick Links</h4>
            {["News & Updates", "Events", "Documents", "Tenders & Quotations", "Vacancies"].map(l => (
              <div key={l} style={{ fontSize: 13, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <Icon.ChevronRight /> {l}
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Contact</h4>
            <div style={{ fontSize: 13, lineHeight: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon.Phone /> 053 492 3420</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon.Mail /> info@siyathemba.gov.za</div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}><Icon.MapPin /><span>Civic Centre, Prieska<br />Northern Cape, 8940</span></div>
            </div>
          </div>

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

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, fontSize: 12 }}>
          <span>© 2026 Siyathemba Local Municipality. All rights reserved.</span>
          <span>Registered Municipal Entity · NC077 · Northern Cape</span>
        </div>
      </div>
    </footer>
  );
}