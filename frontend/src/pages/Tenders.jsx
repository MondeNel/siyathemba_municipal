import { useState } from "react";
import { useAdmin } from '../context/AdminContext';
import { useData } from '../context/DataContext';
import PageHeader from "../components/UI/PageHeader";
import { catColor } from "../utils/helpers";
import AdminModal from '../components/Admin/AdminModal';
import api from '../api/axios';

export default function TendersPage() {
  const { isAdmin } = useAdmin();
  const { tenders, addTender, editTender, removeTender } = useData();
  const [status, setStatus] = useState("open");
  const [cat, setCat] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTender, setEditingTender] = useState(null);
  const [form, setForm] = useState({ reference: '', title: '', description: '', category: 'tender', closing_date: '', status: 'open', file_url: '' });
  const [uploading, setUploading] = useState(false);

  const filtered = tenders.filter(t => (status === "all" || t.status === status) && (cat === "all" || t.category === cat));

  const openCreate = () => {
    setEditingTender(null);
    setForm({ reference: '', title: '', description: '', category: 'tender', closing_date: '', status: 'open', file_url: '' });
    setModalOpen(true);
  };

  const openEdit = (tender) => {
    setEditingTender(tender);
    setForm({ reference: tender.reference, title: tender.title, description: tender.description, category: tender.category, closing_date: tender.closing_date, status: tender.status, file_url: tender.file_url || '' });
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/upload/tender', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ ...form, file_url: res.data.file_url });
    } catch (err) {
      alert('Upload failed: ' + err.response?.data?.detail);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.file_url) {
      alert('Please upload a tender document (PDF/Word)');
      return;
    }
    if (editingTender) {
      await editTender(editingTender.id, form);
    } else {
      await addTender(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tender?')) {
      await removeTender(id);
    }
  };

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <PageHeader title="Tenders & Quotations" subtitle="Current procurement opportunities and bid results" />
        {isAdmin && <button onClick={openCreate} className="btn-primary">+ Add Tender</button>}
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "open", "awarded", "closed"].map(s => (
            <button key={s} onClick={() => setStatus(s)} style={{ padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: status === s ? "#1a4a7a" : "#e2e8f0", background: status === s ? "#1a4a7a" : "#fff", color: status === s ? "#fff" : "#4a5568", textTransform: "capitalize" }}>{s}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["all", "tender", "quotation"].map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: "7px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: cat === c ? "#7d3c98" : "#e2e8f0", background: cat === c ? "#7d3c98" : "#fff", color: cat === c ? "#fff" : "#4a5568", textTransform: "capitalize" }}>{c === "all" ? "All Types" : c + "s"}</button>
          ))}
        </div>
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#a0aec0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>-</div>
          <p style={{ fontSize: 15 }}>No tenders match your filters.</p>
        </div>
      )}
      <div style={{ display: "grid", gap: 14 }}>
        {filtered.map(t => (
          <div key={t.id} className="card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 22px", position: 'relative' }}>
            {isAdmin && (
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(t)} className="btn-outline" style={{ padding: '4px 12px', fontSize: 12 }}>Edit</button>
                <button onClick={() => handleDelete(t.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Delete</button>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#718096", background: "#f7fafc", padding: "3px 8px", borderRadius: 4, border: "1px solid #e2e8f0" }}>{t.reference}</span>
                  <span className="badge" style={{ background: catColor(t.category) + "18", color: catColor(t.category) }}>{t.category.toUpperCase()}</span>
                  <span className="badge" style={{ background: catColor(t.status) + "18", color: catColor(t.status) }}>{t.status.toUpperCase()}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a202c", marginBottom: 6 }}>{t.title}</h3>
                <p style={{ fontSize: 13, color: "#718096", lineHeight: 1.6 }}>{t.description}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center", paddingTop: 12, borderTop: "1px solid #f0f0f0", flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, color: t.status === "open" ? "#1e8449" : "#718096", fontWeight: 600 }}>{t.status === "open" ? `Closes: ${t.closing_date}` : t.status === "awarded" ? "Awarded" : `Closed: ${t.closing_date}`}</span>
              {t.status === "open" && t.file_url && (
                <a href={`http://127.0.0.1:8000${t.file_url}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 13, padding: "7px 18px", marginLeft: "auto", textDecoration: 'none' }}>Download Tender Doc</a>
              )}
            </div>
          </div>
        ))}
      </div>

      <AdminModal title={editingTender ? "Edit Tender" : "Add Tender"} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div><label>Reference</label><input className="admin-input" value={form.reference} onChange={e => setForm({...form, reference: e.target.value})} placeholder="SLM-T-2026-001" /></div>
        <div><label>Title</label><input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
        <div><label>Description</label><textarea className="admin-input" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        <div><label>Category</label>
          <select className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="tender">Tender</option>
            <option value="quotation">Quotation</option>
          </select>
        </div>
        <div><label>Closing Date (YYYY-MM-DD)</label><input className="admin-input" value={form.closing_date} onChange={e => setForm({...form, closing_date: e.target.value})} /></div>
        <div><label>Status</label>
          <select className="admin-input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option value="open">Open</option>
            <option value="awarded">Awarded</option>
            <option value="closed">Closed</option>
          </select>
        </div>
        <div><label>Upload Tender Document (PDF/Word)</label><input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} disabled={uploading} /></div>
        {uploading && <div>Uploading...</div>}
        {form.file_url && <div style={{ fontSize: 12, color: 'green' }}>File uploaded: {form.file_url}</div>}
      </AdminModal>
    </div>
  );
}
