import { useState, useEffect } from "react";
import { Icon } from "../components/UI/Icons";

// Inject keyframes globally once
const injectKeyframes = () => {
  if (document.getElementById("modal-keyframes")) return;
  const style = document.createElement("style");
  style.id = "modal-keyframes";
  style.textContent = `
    @keyframes modalFadeIn {
      from { opacity: 0; transform: scale(0.98); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
};

// Initial static data
const initialMayor = {
  name: "Hon. Mayor Johan Andrew Phillips",
  role: "PR Councillor",
  photo: "/mayor1.png",
  phone: "060 732 3405",
  email: "andrewwestp@gmail.com",
  address: "3826 Mandela Square, Prieska, 8940",
};

const initialCouncillors = [
  {
    id: "c1",
    name: "Hon. Speaker Giel Macdonald",
    role: "Ward 6 Councillor",
    photo: "/Giel_Macdonald_Ward_6_Councillor.png",
    phone: "060 453 7672",
    email: "macdonaldgiel0@gmail.com",
    address: "12 Bloubos Street, Extension 15, Prieska, 8940",
  },
  {
    id: "c2",
    name: "Jacobus Platvoet",
    role: "Ward 1 Councillor",
    photo: "/Jacobus_Platvoet_Ward1_Councillor.png",
    phone: "060 789 8178 / 079 297 1511",
    email: "platvoet2on@gmail.com",
    address: "D50 Kodwa Street, E'thembeni, Prieska, 8940",
  },
  {
    id: "c3",
    name: "Ronald John Februarie",
    role: "Ward 2 Councillor",
    photo: "/Ronald_Feb.jpg",
    phone: "083 212 4164 / 081 785 3331",
    email: "ronaldfeb@gmail.com",
    address: "55 Ou Upington Street, Prieska, 8940",
  },
  {
    id: "c4",
    name: "Willon Henzel Pieterse",
    role: "Ward 3 Councillor",
    photo: "/Willon_Pieterse_Ward_3_Councillor.png",
    phone: "081 818 2602",
    email: "willonpieterse@gmail.com",
    address: "25 Flamink Street, Niekerkshoop, 8930",
  },
  {
    id: "c5",
    name: "Shandy Bridget Ivitta",
    role: "Ward 4 Councillor",
    photo: "/Shandy_Ivitta_Ward_4_Councillor.png",
    phone: "078 139 2088",
    email: "mdale8910@gmail.com",
    address: "06 Garant Street, Marydale, 8910",
  },
  {
    id: "c6",
    name: "Lazarus Mzwandile Zenani",
    role: "Ward 5 Councillor",
    photo: "/Lazarus_Zenani_Ward_5_Councillor.png",
    phone: "061 215 1795",
    email: "lazarusc36@gmail.com",
    address: "Town, Prieska, 8940",
  },
  {
    id: "c7",
    name: "Sarah Saaiman",
    role: "PR Councillor",
    photo: "/Sarah_Saaiman_PR_Councillor.png",
    phone: "082 843 0848",
    email: "sarahsaaiman08@gmail.com",
    address: "1138 Ou Upington Street, Prieska, 8940",
  },
  {
    id: "c8",
    name: "Wiida Pelster",
    role: "PR Councillor",
    photo: "/Wiida_Pelster_PR_Councillor.png",
    phone: "082 937 5051",
    email: "wiidapelster@gmail.com",
    address: "05 De Laan 24, Prieska",
  },
  {
    id: "c9",
    name: "Mauricia Estel Nimmerhoudt",
    role: "PR Councillor",
    photo: "/Mauricia_Nimmerhoud_PR_Councillor.png",
    phone: "074 509 1215",
    email: "mauriciaestell@gmail.com",
    address: "15 Buitekant Street, Niekerkshoop, 8930",
  },
  {
    id: "c10",
    name: "Siziwe Patricia Mooi",
    role: "PR Councillor",
    photo: "/Siziwe_Mooi_PR_Councillor.png",
    phone: "078 816 1843",
    email: "chumisamooi@gmail.com",
    address: "G9 Polinyana Street, Prieska, 8940",
  },
];

export default function CouncilPage() {
  useEffect(() => {
    injectKeyframes();
  }, []);

  const [mayor, setMayor] = useState(initialMayor);
  const [councillors, setCouncillors] = useState(initialCouncillors);

  // Edit modal state
  const [editingMayor, setEditingMayor] = useState(false);
  const [editingCouncillor, setEditingCouncillor] = useState(null);
  const [formData, setFormData] = useState({});

  // Image upload helper
  const handleImageUpload = (file, callback) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  const saveMayor = () => {
    setMayor(formData);
    setEditingMayor(false);
  };

  const saveCouncillor = () => {
    if (editingCouncillor) {
      setCouncillors((prev) =>
        prev.map((c) =>
          c.id === editingCouncillor.id ? { ...formData, id: c.id } : c
        )
      );
    }
    setEditingCouncillor(null);
    setFormData({});
  };

  // Delete councillor with confirmation
  const deleteCouncillor = (id) => {
    if (window.confirm("Are you sure you want to delete this councillor?")) {
      setCouncillors((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const openEditMayor = () => {
    setFormData(mayor);
    setEditingMayor(true);
  };

  const openEditCouncillor = (councillor) => {
    setFormData(councillor);
    setEditingCouncillor(councillor);
  };

  const handleFileChange = (callback) => (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file, callback);
  };

  return (
    <div
      className="page-anim"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}
    >
      <div style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#1a202c",
            marginBottom: 8,
          }}
        >
          Council
        </h1>
        <p style={{ fontSize: 15, color: "#718096" }}>
          Meet your elected officials and the Office of the Mayor
        </p>
        <div
          style={{
            width: 48,
            height: 3,
            background: "#1a4a7a",
            borderRadius: 2,
            marginTop: 12,
          }}
        />
      </div>

      {/* Office of the Mayor */}
      <section style={{ marginBottom: 48 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1a4a7a",
              marginBottom: 20,
              borderLeft: "4px solid #1a4a7a",
              paddingLeft: 12,
            }}
          >
            Office of the Mayor
          </h2>
          <button
            onClick={openEditMayor}
            className="btn-outline"
            style={{ fontSize: 12 }}
          >
            Edit
          </button>
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            padding: "24px",
            display: "flex",
            gap: 24,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <img
            src={mayor.photo}
            alt={mayor.name}
            style={{
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: "50%",
              border: "3px solid #1a4a7a",
            }}
            onError={(e) => {
              e.target.src = "/placeholder-avatar.png";
            }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>
              {mayor.name}
            </h3>
            <p style={{ color: "#4a5568", marginBottom: 12 }}>{mayor.role}</p>
            <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon.Phone /> {mayor.phone}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon.Mail /> {mayor.email}
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                <Icon.MapPin /> {mayor.address}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Councillors */}
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1a4a7a",
              borderLeft: "4px solid #1a4a7a",
              paddingLeft: 12,
            }}
          >
            Councillors
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 24,
          }}
        >
          {councillors.map((c) => (
            <div
              key={c.id}
              className="card-hover"
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: "20px",
                position: "relative",
              }}
            >
              {/* Edit + Delete buttons */}
              <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 6 }}>
                <button
                  onClick={() => openEditCouncillor(c)}
                  className="btn-outline"
                  style={{ fontSize: 11, padding: "4px 10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCouncillor(c.id)}
                  style={{
                    background: "#fee2e2",
                    border: "none",
                    borderRadius: 6,
                    padding: "4px 8px",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#dc2626",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#fecaca";
                    e.target.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#fee2e2";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  Delete
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <img
                  src={c.photo}
                  alt={c.name}
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "cover",
                    borderRadius: "50%",
                    background: "#f0f0f0",
                  }}
                  onError={(e) => {
                    e.target.src = "/placeholder-avatar.png";
                  }}
                />
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a202c" }}>
                    {c.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "#718096" }}>{c.role}</p>
                </div>
              </div>
              <div
                style={{
                  fontSize: 13,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon.Phone style={{ width: 14 }} /> {c.phone}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Icon.Mail style={{ width: 14 }} /> {c.email}
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <Icon.MapPin style={{ width: 14, flexShrink: 0 }} />{" "}
                  <span>{c.address}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Edit Mayor Modal */}
      {editingMayor && (
        <StyledModal
          title="Edit Mayor"
          onClose={() => setEditingMayor(false)}
          onSave={saveMayor}
        >
          <FormField label="Full Name">
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormField>
          <FormField label="Role">
            <input
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </FormField>
          <FormField label="Profile Photo">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange((base64) =>
                setFormData({ ...formData, photo: base64 })
              )}
            />
            {formData.photo && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={formData.photo}
                  alt="Preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
          </FormField>
          <FormField label="Phone Number">
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </FormField>
          <FormField label="Email Address">
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormField>
          <FormField label="Physical Address">
            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </FormField>
        </StyledModal>
      )}

      {/* Edit Councillor Modal */}
      {editingCouncillor && (
        <StyledModal
          title="Edit Councillor"
          onClose={() => setEditingCouncillor(null)}
          onSave={saveCouncillor}
        >
          <FormField label="Full Name">
            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormField>
          <FormField label="Role">
            <input
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
          </FormField>
          <FormField label="Profile Photo">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange((base64) =>
                setFormData({ ...formData, photo: base64 })
              )}
            />
            {formData.photo && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={formData.photo}
                  alt="Preview"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            )}
          </FormField>
          <FormField label="Phone Number">
            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </FormField>
          <FormField label="Email Address">
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormField>
          <FormField label="Physical Address">
            <textarea
              rows={3}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </FormField>
        </StyledModal>
      )}
    </div>
  );
}

// Styled Modal Component
function StyledModal({ title, children, onClose, onSave }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          width: 550,
          maxWidth: "90%",
          maxHeight: "85vh",
          overflow: "auto",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          animation: "modalFadeIn 0.2s ease",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#f8fafc",
            borderRadius: "20px 20px 0 0",
          }}
        >
          <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a202c", margin: 0 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: "#94a3b8",
              padding: "0 8px",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#1a202c")}
            onMouseLeave={(e) => (e.target.style.color = "#94a3b8")}
          >
            &times;
          </button>
        </div>
        <div
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {children}
        </div>
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "flex-end",
            gap: 12,
            background: "#f8fafc",
            borderRadius: "0 0 20px 20px",
          }}
        >
          <button
            onClick={onClose}
            className="btn-outline"
            style={{ padding: "8px 20px" }}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="btn-primary"
            style={{ padding: "8px 24px" }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// Reusable form field with styled inputs
function FormField({ label, children }) {
  const inputStyles = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "border-color 0.15s, box-shadow 0.15s",
    outline: "none",
  };
  const textareaStyles = {
    ...inputStyles,
    resize: "vertical",
  };
  const enhancedChild =
    children?.type === "input" || children?.type === "textarea"
      ? {
          ...children,
          props: {
            ...children.props,
            style: children.type === "textarea" ? textareaStyles : inputStyles,
            onFocus: (e) => {
              e.target.style.borderColor = "#1a4a7a";
              e.target.style.boxShadow = "0 0 0 3px rgba(26,74,122,0.1)";
              if (children.props.onFocus) children.props.onFocus(e);
            },
            onBlur: (e) => {
              e.target.style.borderColor = "#cbd5e1";
              e.target.style.boxShadow = "none";
              if (children.props.onBlur) children.props.onBlur(e);
            },
          },
        }
      : children;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>
        {label}
      </label>
      {enhancedChild}
    </div>
  );
}