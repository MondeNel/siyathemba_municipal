import { useState } from "react";
import { useAdmin } from '../context/AdminContext';
import { useData } from '../context/DataContext';
import PageHeader from "../components/UI/PageHeader";
import { catColor } from "../utils/helpers";
import AdminModal from '../components/Admin/AdminModal';

export default function NoticesPage() {
  const { isAdmin } = useAdmin();
  const { notices, addNotice, editNotice, removeNotice } = useData();
  const [tab, setTab] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', category: 'public', urgency: 'normal' });

  const tabs = [{ id: "all", label: "All" }, { id: "public", label: "Public Notices" }, { id: "media", label: "Media" }, { id: "vacancy", label: "Vacancies" }];
  const filtered = tab === "all" ? notices : notices.filter(n => n.category === tab);

  const openCreate = () => {
    setEditingNotice(null);
    setForm({ title: '', content: '', category: 'public', urgency: 'normal' });
    setModalOpen(true);
  };

  const openEdit = (notice) => {
    setEditingNotice(notice);
    setForm({ title: notice.title, content: notice.content, category: notice.category, urgency: notice.urgency });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editingNotice) {
      await editNotice(editingNotice.id, form);
    } else {
      await addNotice(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      await removeNotice(id);
    }
  };

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <PageHeader title="Notices & Announcements" subtitle="Public notices, media releases and municipal vacancies" />
        {isAdmin && <button onClick={openCreate} className="btn-primary">+ Add Notice</button>}
      </div>
      <div style={{ display: "flex", gap: 4, background: "#f7fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 4, marginBottom: 28, width: "fit-content", flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 18px", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", background: tab === t.id ? "#fff" : "transparent", color: tab === t.id ? "#1a4a7a" : "#718096", boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>{t.label}</button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {filtered.map(notice => (
          <div key={notice.id} style={{ background: "#fff", border: "1px solid #e2e8f0", borderLeft: `4px solid ${notice.urgency === "urgent" ? "#e67e22" : catColor(notice.category)}`, borderRadius: 8, padding: "18px 20px", position: 'relative' }}>
            {isAdmin && (
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(notice)} className="btn-outline" style={{ padding: '4px 12px', fontSize: 12 }}>Edit</button>
                <button onClick={() => handleDelete(notice.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Delete</button>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1a202c", lineHeight: 1.4 }}>{notice.title}</h3>
              <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                {notice.urgency === "urgent" && <span className="badge" style={{ background: "#fff3cd", color: "#7d4c00" }}>URGENT</span>}
                <span className="badge" style={{ background: "#edf2f7", color: "#4a5568" }}>{notice.category.toUpperCase()}</span>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.7 }}>{notice.content}</p>
            <div style={{ marginTop: 10, fontSize: 12, color: "#a0aec0" }}>{new Date(notice.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </div>

      <AdminModal title={editingNotice ? "Edit Notice" : "Add Notice"} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div><label>Title</label><input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
        <div><label>Content</label><textarea className="admin-input" rows={4} value={form.content} onChange={e => setForm({...form, content: e.target.value})} /></div>
        <div><label>Category</label>
          <select className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option value="public">Public Notice</option>
            <option value="media">Media Release</option>
            <option value="vacancy">Vacancy</option>
          </select>
        </div>
        <div><label>Urgency</label>
          <select className="admin-input" value={form.urgency} onChange={e => setForm({...form, urgency: e.target.value})}>
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </AdminModal>
    </div>
  );
}
