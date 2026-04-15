import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Chatbot from "./components/Chatbot";
import HomePage from "./pages/Home";
import NewsPage from "./pages/News";
import EventsPage from "./pages/Events";
import DocumentsPage from "./pages/Documents";
import NoticesPage from "./pages/Notices";
import TendersPage from "./pages/Tenders";
import VacanciesPage from "./pages/Vacancies";
import ContactPage from "./pages/Contact";
import CouncilPage from "./pages/Council";
import ArticleView from "./pages/ArticleView";
import { AdminProvider } from "./context/AdminContext";
import { DataProvider, useData } from "./context/DataContext";
import { ReadItemsProvider } from "./context/ReadItemsContext";

function AppContent() {
  const { loading, posts, events, documents, notices, tenders } = useData();
  const [chatOpen, setChatOpen] = useState(false);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  const data = { posts, events, documents, notices, tenders };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f4f6f8", color: "#1a202c" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #1a4a7a22; }
        a { color: inherit; text-decoration: none; }
        button { cursor: pointer; border: none; background: none; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #b0b8c1; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .page-anim { animation: fadeIn 0.35s ease; }
        .card-hover { transition: transform 0.2s, box-shadow 0.2s; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important; }
        .nav-item { transition: all 0.15s; }
        .nav-item:hover { background: rgba(255,255,255,0.15) !important; }
        .nav-item.active { background: rgba(255,255,255,0.2) !important; }
        .btn-primary { background: #1a4a7a; color: #fff; padding: 10px 22px; border-radius: 6px; font-size: 14px; font-weight: 600; transition: background 0.2s; }
        .btn-primary:hover { background: #153d65; }
        .btn-outline { border: 1.5px solid #1a4a7a; color: #1a4a7a; padding: 8px 18px; border-radius: 6px; font-size: 13px; font-weight: 600; transition: all 0.2s; background: transparent; }
        .btn-outline:hover { background: #1a4a7a; color: #fff; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.3px; text-transform: uppercase; }
        .tag { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: 600; }
        .chat-bubble { animation: slideIn 0.25s ease; }
        .admin-input { width: 100%; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; margin-top: 4px; }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .mobile-grid { grid-template-columns: 1fr !important; }
          .hero-text { font-size: 28px !important; }
          .hero-sub { font-size: 15px !important; }
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div style={{ background: "#0d2d4f", color: "#a8c4e0", fontSize: 12, padding: "6px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.6 4.97 2 2 0 0 1 3.6 2.79h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.4a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.6 17.77z"/></svg>
              053 492 3420
            </span>
            <span className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@siyathemba.gov.za
            </span>
          </div>
          <span>Mon–Fri 07:30–16:00 | Northern Cape, South Africa</span>
        </div>
      </div>

      <Navbar />
      <main style={{ minHeight: "calc(100vh - 180px)" }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<ArticleViewWrapper />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/notices" element={<NoticesPage />} />
          <Route path="/tenders" element={<TendersPage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/council" element={<CouncilPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot open={chatOpen} setOpen={setChatOpen} />
    </div>
  );
}

function ArticleViewWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = useData();
  const post = posts.find(p => p.id === parseInt(id));
  if (!post) return <Navigate to="/news" replace />;
  return <ArticleView post={post} onBack={() => navigate(-1)} />;
}

function App() {
  return (
    <AdminProvider>
      <DataProvider>
        <ReadItemsProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ReadItemsProvider>
      </DataProvider>
    </AdminProvider>
  );
}

export default App;
