export default function AdminModal({ title, isOpen, onClose, onSubmit, children }) {
  if (!isOpen) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
      backdropFilter: "blur(4px)"
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, width: 550, maxWidth: "90%",
        maxHeight: "85vh", overflow: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
      }}>
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid #e2e8f0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "#f8fafc", borderRadius: "20px 20px 0 0"
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a202c", margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{
            background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#94a3b8"
          }}>&times;</button>
        </div>
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 18 }}>
          {children}
        </div>
        <div style={{
          padding: "16px 24px", borderTop: "1px solid #e2e8f0",
          display: "flex", justifyContent: "flex-end", gap: 12,
          background: "#f8fafc", borderRadius: "0 0 20px 20px"
        }}>
          <button onClick={onClose} className="btn-outline">Cancel</button>
          <button onClick={onSubmit} className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}
