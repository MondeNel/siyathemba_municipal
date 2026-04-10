import { useState } from "react";
import PageHeader from "../components/UI/PageHeader";
import { Icon } from "../components/UI/Icons"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="page-anim" style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>
      <PageHeader title="Contact Us" subtitle="Get in touch with Siyathemba Local Municipality" />
      <div className="mobile-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 32 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 18 }}>Office Information</h3>
          {[
            { icon: <Icon.MapPin />, label: "Address", value: "Civic Centre, Du Plessis Street\nPrieska, Northern Cape, 8940" },
            { icon: <Icon.Phone />, label: "Main Office", value: "053 492 3420" },
            { icon: <Icon.Mail />, label: "Email", value: "info@siyathemba.gov.za" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 20, padding: "16px", background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0" }}>
              <div style={{ width: 38, height: 38, background: "#1a4a7a15", color: "#1a4a7a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
              <div><div style={{ fontSize: 12, color: "#a0aec0", fontWeight: 600, marginBottom: 2 }}>{item.label}</div><div style={{ fontSize: 14, color: "#1a202c", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.value}</div></div>
            </div>
          ))}
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14, marginTop: 24 }}>Departments</h3>
          {[["Finance Services", "053 492 3421"], ["Technical Services", "053 492 3422"], ["Community Services", "053 492 3423"], ["Corporate Services", "053 492 3424"], ["Municipal Manager", "053 492 3425"]].map(([dept, num]) => (
            <div key={dept} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}><span style={{ color: "#4a5568" }}>{dept}</span><span style={{ color: "#1a4a7a", fontWeight: 600 }}>{num}</span></div>
          ))}
          <div style={{ marginTop: 24, background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 8, padding: "14px" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#7d4c00", marginBottom: 8 }}>Emergency Numbers</div>
            <div style={{ fontSize: 13, color: "#6b4c00", lineHeight: 2 }}>Water: 053 492 0001 · Electricity: 053 492 0002<br />Police: 10111 · Ambulance: 10177 · Fire: 053 492 0003</div>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "28px 24px" }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Send a Message</h3>
          <p style={{ fontSize: 13, color: "#718096", marginBottom: 24 }}>We typically respond within 2 business days.</p>
          {sent && (<div style={{ background: "#d4edda", border: "1px solid #28a745", borderRadius: 8, padding: "12px 16px", marginBottom: 20, color: "#155724", fontSize: 14, fontWeight: 600 }}>Message sent successfully. We will be in touch soon.</div>)}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div><label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 6 }}>Full Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 7, fontSize: 14, outline: "none" }} /></div>
            <div><label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 6 }}>Email Address *</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" type="email" style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 7, fontSize: 14, outline: "none" }} /></div>
          </div>
          <div style={{ marginBottom: 14 }}><label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 6 }}>Subject</label><input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="e.g. Water supply complaint" style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 7, fontSize: 14, outline: "none" }} /></div>
          <div style={{ marginBottom: 20 }}><label style={{ fontSize: 12, fontWeight: 600, color: "#4a5568", display: "block", marginBottom: 6 }}>Message *</label><textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe your query or concern in detail…" rows={5} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #e2e8f0", borderRadius: 7, fontSize: 14, outline: "none", resize: "vertical" }} /></div>
          <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", padding: "12px", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}><Icon.Send /> Send Message</button>
        </div>
      </div>
    </div>
  );
}