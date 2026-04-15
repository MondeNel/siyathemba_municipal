import { useState, useEffect } from "react";
import { useAdmin } from '../context/AdminContext';
import { useData } from '../context/DataContext';
import { useReadItems } from '../context/ReadItemsContext';
import PageHeader from "../components/UI/PageHeader";
import { Icon } from "../components/UI/Icons";
import { catColor } from "../utils/helpers";
import AdminModal from '../components/Admin/AdminModal';
import api from '../api/axios';

export default function DocumentsPage() {
  const { isAdmin } = useAdmin();
  const { documents, addDocument, editDocument, removeDocument } = useData();
  const { markAsRead } = useReadItems();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', file_url: '', category: '', file_size: '', file_type: 'PDF', downloads: 0 });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    markAsRead('documents');
  }, [markAsRead]);

  const categories = ["All", ...new Set(documents.map(d => d.category))];
  const filtered = documents.filter(d => (filter === "All" || d.category === filter) && d.title.toLowerCase().includes(search.toLowerCase()));

  const openCreate = () => {
    setEditingDoc(null);
    setForm({ title: '', description: '', file_url: '', category: '', file_size: '', file_type: 'PDF', downloads: 0 });
    setModalOpen(true);
  };

  const openEdit = (doc) => {
    setEditingDoc(doc);
    setForm({ title: doc.title, description: doc.description, file_url: doc.file_url, category: doc.category, file_size: doc.file_size, file_type: doc.file_type, downloads: doc.downloads });
    setModalOpen(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/upload/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ ...form, file_url: res.data.file_url, file_size: (res.data.size / 1024).toFixed(1) + ' KB', file_type: file.name.split('.').pop().toUpperCase() });
    } catch (err) {
      alert('Upload failed: ' + err.response?.data?.detail);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.file_url) {
      alert('Please upload a file first');
      return;
    }
    if (editingDoc) {
      await editDocument(editingDoc.id, form);
    } else {
      await addDocument(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      await removeDocument(id);
    }
  };

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <PageHeader title="Documents & Downloads" subtitle="Official municipal documents, reports, policies and tariffs" />
        {isAdmin && <button onClick={openCreate} className="btn-primary">+ Add Document</button>}
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 250px" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#a0aec0" }}><Icon.Search /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents..." style={{ width: "100%", padding: "9px 12px 9px 38px", border: "1.5px solid #e2e8f0", borderRadius: 8, fontSize: 14, outline: "none", background: "#fff" }} />
        </div>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: filter === cat ? "#1a4a7a" : "#e2e8f0", background: filter === cat ? "#1a4a7a" : "#fff", color: filter === cat ? "#fff" : "#4a5568" }}>{cat}</button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#a0aec0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>-</div>
          <p style={{ fontSize: 15 }}>No documents match your search.</p>
        </div>
      )}
      <div style={{ display: "grid", gap: 12 }}>
        {filtered.map(doc => (
          <div key={doc.id} className="card-hover" style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, position: 'relative' }}>
            {isAdmin && (
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(doc)} className="btn-outline" style={{ padding: '4px 12px', fontSize: 12 }}>Edit</button>
                <button onClick={() => handleDelete(doc.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Delete</button>
              </div>
            )}
            <div style={{ width: 46, height: 52, background: "#fee2e2", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ fontSize: 11, fontWeight: 800, color: "#c53030" }}>{doc.file_type}</span></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "#1a202c" }}>{doc.title}</div>
              <div style={{ fontSize: 13, color: "#718096", marginBottom: 6, lineHeight: 1.5 }}>{doc.description}</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <span className="tag" style={{ background: catColor(doc.category) + "18", color: catColor(doc.category) }}>{doc.category}</span>
                <span style={{ fontSize: 12, color: "#a0aec0" }}>{doc.file_size}</span>
                <span style={{ fontSize: 12, color: "#a0aec0" }}>{doc.downloads} downloads</span>
              </div>
            </div>
            <a href={`http://127.0.0.1:8000${doc.file_url}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 7, fontSize: 13, padding: "8px 16px", textDecoration: 'none' }}><Icon.Download /> Download</a>
          </div>
        ))}
      </div>

      <AdminModal title={editingDoc ? "Edit Document" : "Add Document"} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div><label>Title</label><input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
        <div><label>Description</label><textarea className="admin-input" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        <div><label>Upload File (PDF/Word)</label><input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} disabled={uploading} /></div>
        {uploading && <div>Uploading...</div>}
        {form.file_url && <div style={{ fontSize: 12, color: 'green' }}>File uploaded: {form.file_url}</div>}
        <div><label>Category</label><input className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div>
        <div><label>File Size</label><input className="admin-input" value={form.file_size} onChange={e => setForm({...form, file_size: e.target.value})} placeholder="e.g., 2.4 MB" /></div>
        <div><label>Downloads</label><input className="admin-input" type="number" value={form.downloads} onChange={e => setForm({...form, downloads: parseInt(e.target.value)})} /></div>
      </AdminModal>
    </div>
  );
}
