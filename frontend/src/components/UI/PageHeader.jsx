export default function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a202c", marginBottom: 8 }}>{title}</h1>
      <p style={{ fontSize: 15, color: "#718096" }}>{subtitle}</p>
      <div style={{ width: 48, height: 3, background: "#1a4a7a", borderRadius: 2, marginTop: 12 }} />
    </div>
  );
}
