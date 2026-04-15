# 🏛️ Siyathemba Local Municipality — Information Platform

A modern, full-stack municipal website for Siyathemba Local Municipality (NC077), Prieska, Northern Cape.

---

## 📁 Project Structure

```
siyathemba/
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── main.jsx           # App entry point
│   │   ├── SiyathembaMunicipality.jsx  # Full app (all pages + chatbot)
│   │   └── api/
│   │       └── api.js         # Axios API client
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/                   # FastAPI backend
    ├── app/
    │   ├── main.py            # FastAPI app + CORS + router registration
    │   ├── routers/
    │   │   ├── posts.py       # News/posts API
    │   │   ├── events.py      # Events API
    │   │   ├── documents.py   # Documents API
    │   │   ├── notices.py     # Notices/vacancies API
    │   │   ├── tenders.py     # Tenders & quotations API
    │   │   └── chat.py        # AI chatbot endpoint
    │   ├── schemas/
    │   │   └── models.py      # Pydantic schemas
    │   └── crud/
    │       └── store.py       # In-memory data store (seed data)
    ├── requirements.txt
    └── run_backend.sh
```

---

## 🚀 Getting Started

### 1. Backend (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API runs at: **http://127.0.0.1:8000**  
Interactive docs: **http://127.0.0.1:8000/docs**

### 2. Frontend (React)

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🌐 Pages & Features

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, quick access, latest news, upcoming events |
| News | `/news` | All posts with category filter |
| Events | `/events` | Upcoming & past events calendar |
| Documents | `/documents` | Downloadable PDFs with search & filter |
| Notices | `/notices` | Public notices, media releases, vacancies |
| Tenders | `/tenders` | Tenders & quotations with status filter |
| Contact | `/contact` | Office info, department contacts, contact form |

---

## 🤖 Chatbot

The chatbot (`Chatbot` component) uses the **Anthropic Claude API** directly.

- **Demo mode**: Calls `api.anthropic.com/v1/messages` from the frontend (for demonstration).
- **Production mode**: Route through the `/api/chat/` FastAPI endpoint (already built in `chat.py`).

The chatbot is context-aware — it knows about current events, open tenders, vacancies and documents from the municipal data store.

> **Note**: To use the chatbot in production, set `ANTHROPIC_API_KEY` as an environment variable on the backend server. The backend `chat.py` router handles this securely.

---

## 💾 Data Storage (Demo)

For the demo, all data is stored in **`localStorage`** on the browser. The seed data (posts, events, documents, notices, tenders) is loaded once on first visit.

**To reset demo data:** Open browser DevTools → Application → Local Storage → Delete `siyathemba_data`

### Upgrading to PostgreSQL (Production)

1. Add `sqlalchemy`, `asyncpg` to `requirements.txt`
2. Create `app/database.py` with SQLAlchemy engine + session
3. Replace `POSTS`, `EVENTS`, etc. in `store.py` with real DB models
4. Update routers to use `db: Session = Depends(get_db)`

---

## 🔌 API Endpoints

```
GET    /api/posts/              → List all posts (filter: category)
GET    /api/posts/{id}          → Get single post
POST   /api/posts/              → Create post

GET    /api/events/             → List events (filter: upcoming=true)
GET    /api/events/{id}         → Get single event
POST   /api/events/             → Create event

GET    /api/documents/          → List documents (filter: category)
GET    /api/documents/{id}      → Get document
POST   /api/documents/          → Create document

GET    /api/notices/            → List notices (filter: category)
POST   /api/notices/            → Create notice

GET    /api/tenders/            → List tenders (filter: status, category)
POST   /api/tenders/            → Create tender

POST   /api/chat/               → Send message to AI chatbot
```

---

## 📱 Mobile Responsive

The frontend is fully responsive across:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1200px+)

Key responsive utilities:
- `.mobile-grid` — switches to single column on mobile
- `.desktop-only` / `.mobile-only` — conditional visibility
- Flexible hero typography (`hero-text`, `hero-sub`)
- Touch-friendly hamburger nav

---

## 🔮 Next Steps (Production Roadmap)

### Phase 1 – Backend Integration
- [ ] Connect frontend to live FastAPI endpoints (replace localStorage)
- [ ] Add PostgreSQL database with Alembic migrations
- [ ] Add `ANTHROPIC_API_KEY` to backend environment

### Phase 2 – Admin Dashboard
- [ ] JWT authentication (admin login)
- [ ] CRUD interface for posts, events, documents
- [ ] File upload for PDF documents (FastAPI `UploadFile`)
- [ ] Tender management workflow

### Phase 3 – Enhancements
- [ ] Full-text search across all content
- [ ] Email notifications for new tenders/vacancies
- [ ] Citizen service request tracking
- [ ] Multi-language support (isiXhosa, Afrikaans)
- [ ] Google Maps integration for ward offices

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Axios |
| Styling | Pure CSS (no framework – fully custom) |
| Backend | Python 3.11, FastAPI, Pydantic v2 |
| AI Chatbot | Anthropic Claude API (claude-sonnet-4) |
| Demo Storage | Browser localStorage |
| Production DB | PostgreSQL (ready to plug in) |

---

*Built for Siyathemba Local Municipality · NC077 · Northern Cape, South Africa*