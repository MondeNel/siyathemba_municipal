import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useData } from '../context/DataContext';
import { useReadItems } from '../context/ReadItemsContext';
import PageHeader from '../components/UI/PageHeader';
import EventCard from '../components/UI/EventCard';
import AdminModal from '../components/Admin/AdminModal';

export default function EventsPage() {
  const { isAdmin } = useAdmin();
  const { events, addEvent, editEvent, removeEvent } = useData();
  const { markAsRead } = useReadItems();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', category: '' });

  useEffect(() => {
    markAsRead('events');
  }, [markAsRead]); // Only runs once because markAsRead is stable

  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = events.filter(e => e.date < today);

  const openCreate = () => {
    setEditingEvent(null);
    setForm({ title: '', description: '', date: '', time: '', location: '', category: '' });
    setModalOpen(true);
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setForm({ title: event.title, description: event.description, date: event.date, time: event.time, location: event.location, category: event.category });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editingEvent) {
      await editEvent(editingEvent.id, form);
    } else {
      await addEvent(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await removeEvent(id);
    }
  };

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <PageHeader title="Events Calendar" subtitle="Municipal events, meetings and public engagements" />
        {isAdmin && <button onClick={openCreate} className="btn-primary">+ Add Event</button>}
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#1a4a7a" }}>Upcoming Events</h3>
      {upcoming.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#a0aec0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>-</div>
          <p style={{ fontSize: 15 }}>No upcoming events at this time.</p>
        </div>
      )}
      <div className="mobile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40 }}>
        {upcoming.map(ev => (
          <div key={ev.id} style={{ position: 'relative' }}>
            {isAdmin && (
              <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 1, display: 'flex', gap: 6 }}>
                <button onClick={() => openEdit(ev)} className="btn-outline" style={{ padding: '2px 8px', fontSize: 10 }}>Edit</button>
                <button onClick={() => handleDelete(ev.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Del</button>
              </div>
            )}
            <EventCard event={ev} large />
          </div>
        ))}
      </div>

      {past.length > 0 && (
        <>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#718096" }}>Past Events</h3>
          <div className="mobile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, opacity: 0.65 }}>
            {past.map(ev => (
              <div key={ev.id} style={{ position: 'relative' }}>
                {isAdmin && (
                  <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 1, display: 'flex', gap: 6 }}>
                    <button onClick={() => openEdit(ev)} className="btn-outline" style={{ padding: '2px 8px', fontSize: 10 }}>Edit</button>
                    <button onClick={() => handleDelete(ev.id)} style={{ background: '#fee2e2', border: 'none', borderRadius: 4, padding: '2px 8px', fontSize: 10, fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>Del</button>
                  </div>
                )}
                <EventCard event={ev} />
              </div>
            ))}
          </div>
        </>
      )}

      <AdminModal title={editingEvent ? "Edit Event" : "Create Event"} isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit}>
        <div><label>Title</label><input className="admin-input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
        <div><label>Description</label><textarea className="admin-input" rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        <div><label>Date (YYYY-MM-DD)</label><input className="admin-input" value={form.date} onChange={e => setForm({...form, date: e.target.value})} placeholder="2026-04-18" /></div>
        <div><label>Time</label><input className="admin-input" value={form.time} onChange={e => setForm({...form, time: e.target.value})} placeholder="10:00" /></div>
        <div><label>Location</label><input className="admin-input" value={form.location} onChange={e => setForm({...form, location: e.target.value})} /></div>
        <div><label>Category</label><input className="admin-input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} /></div>
      </AdminModal>
    </div>
  );
}
