import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useData } from '../context/DataContext';
import PageHeader from '../components/UI/PageHeader';
import PostCard from '../components/UI/PostCard';
import AdminModal from '../components/Admin/AdminModal';

export default function NewsPage() {
  const { isAdmin } = useAdmin();
  const { posts, addPost, editPost, removePost } = useData();
  const [filter, setFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', category: '', author: '' });

  const categories = ['All', ...new Set(posts.map(p => p.category))];
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  const openCreate = () => {
    setEditingPost(null);
    setForm({ title: '', content: '', category: '', author: '' });
    setModalOpen(true);
  };

  const openEdit = (post) => {
    setEditingPost(post);
    setForm({ title: post.title, content: post.content, category: post.category, author: post.author });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editingPost) {
      await editPost(editingPost.id, form);
    } else {
      await addPost(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await removePost(id);
    }
  };

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <PageHeader title="News & Updates" subtitle="Stay informed with the latest from Siyathemba Municipality" />
        {isAdmin && <button onClick={openCreate} className="btn-primary">+ Add News</button>}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid", borderColor: filter === cat ? "#1a4a7a" : "#e2e8f0", background: filter === cat ? "#1a4a7a" : "#fff", color: filter === cat ? "#fff" : "#4a5568" }}>{cat}</button>
        ))}
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {filtered.map(post => (
          <div key={post.id} style={{ position: 'relative' }}>
            {isAdmin && (
              <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 1, display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(post)} className="btn-outline" style={{ padding: '4px 12px', fontSize: 12 }}>Edit</button>
                <button onClick={() => handleDelete(post.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 12, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Delete</button>
              </div>
            )}
            <PostCard post={post} large />
          </div>
        ))}
      </div>

      <AdminModal title={editingPost ? "Edit News" : "Create News"} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div><label>Title</label><input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
        <div><label>Content</label><textarea className="admin-input" rows={4} value={form.content} onChange={e => setForm({...form, content: e.target.value})} /></div>
        <div><label>Category</label><input className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div>
        <div><label>Author</label><input className="admin-input" value={form.author} onChange={e => setForm({...form, author: e.target.value})} /></div>
      </AdminModal>
    </div>
  );
}
