import { useState, useEffect } from "react";
import { useAdmin } from '../context/AdminContext';
import { useData } from '../context/DataContext';
import { useReadItems } from '../context/ReadItemsContext';
import PageHeader from "../components/UI/PageHeader";
import AdminModal from '../components/Admin/AdminModal';
import api from '../api/axios';

export default function VacanciesPage() {
  const { isAdmin } = useAdmin();
  const { notices, addNotice, editNotice, removeNotice } = useData();
  const { markAsRead } = useReadItems();
  const vacancies = notices.filter(n => n.category === "vacancy");
  
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', category: 'vacancy', urgency: 'normal', file_url: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    markAsRead('vacancies');
  }, [markAsRead]);

  const openCreate = () => {
    setEditingVacancy(null);
    setForm({ title: '', content: '', category: 'vacancy', urgency: 'normal', file_url: '' });
    setModalOpen(true);
  };

  const openEdit = (vacancy) => {
    setEditingVacancy(vacancy);
    setForm({ title: vacancy.title, content: vacancy.content, category: vacancy.category, urgency: vacancy.urgency, file_url: vacancy.file_url || '' });
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/upload/notice', formData, {
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
      alert('Please upload a vacancy document (PDF/Word)');
      return;
    }
    if (editingVacancy) {
      await editNotice(editingVacancy.id, form);
    } else {
      await addNotice(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vacancy?')) {
      await removeNotice(id);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-ZA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <PageHeader title="Vacancies" subtitle="Current employment opportunities at Siyathemba Municipality" />
        {isAdmin && <button onClick={openCreate} className="btn-primary">+ Add Vacancy</button>}
      </div>

      {vacancies.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#a0aec0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>í³¢</div>
          <p style={{ fontSize: 15 }}>No current vacancies. Please check back later.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 20 }}>
          {vacancies.map(v => (
            <div key={v.id} className="card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px", position: 'relative' }}>
              {isAdmin && (
                <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(v)} className="btn-outline" style={{ padding: '4px 12px', fontSize: 12 }}>Edit</button>
                  <button onClick={() => handleDelete(v.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Delete</button>
                </div>
              )}
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "#1a202c" }}>{v.title}</h3>
                <div style={{ display: "flex", gap: 16, marginBottom: 12, fontSize: 13, color: "#718096" }}>
                  <span>í³… Posted: {formatDate(v.created_at)}</span>
                  <span>í´– {v.category}</span>
                </div>
                <p style={{ fontSize: 14, color: "#4a5568", lineHeight: 1.7, marginBottom: 16 }}>{v.content}</p>
                {v.file_url && (
                  <a href={`http://127.0.0.1:8000${v.file_url}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, padding: "8px 16px", textDecoration: "none" }}>
                    í³„ Download Vacancy Details
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminModal title={editingVacancy ? "Edit Vacancy" : "Add Vacancy"} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div><label>Job Title</label><input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
        <div><label>Description / Requirements</label><textarea className="admin-input" rows={5} value={form.content} onChange={e => setForm({...form, content: e.target.value})} /></div>
        <div><label>Upload Vacancy Document (PDF/Word)</label><input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} disabled={uploading} /></div>
        {uploading && <div>Uploading...</div>}
        {form.file_url && <div style={{ fontSize: 12, color: 'green' }}>File uploaded: {form.file_url}</div>}
      </AdminModal>
    </div>
  );
}
