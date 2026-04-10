import PageHeader from "../components/UI/PageHeader";
import EventCard from "../components/UI/EventCard";

export default function EventsPage({ data }) {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = data.events.filter(e => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = data.events.filter(e => e.date < today);

  return (
    <div className="page-anim" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>
      <PageHeader title="Events Calendar" subtitle="Municipal events, meetings and public engagements" />
      <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#1a4a7a" }}>Upcoming Events</h3>
      {upcoming.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 20px", color: "#a0aec0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>-</div>
          <p style={{ fontSize: 15 }}>No upcoming events at this time.</p>
        </div>
      )}
      <div className="mobile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 40 }}>
        {upcoming.map(ev => <EventCard key={ev.id} event={ev} large />)}
      </div>
      {past.length > 0 && (
        <>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "#718096" }}>Past Events</h3>
          <div className="mobile-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, opacity: 0.65 }}>
            {past.map(ev => <EventCard key={ev.id} event={ev} />)}
          </div>
        </>
      )}
    </div>
  );
}
