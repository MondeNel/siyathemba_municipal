# Siyathemba Local Municipality — Information Platform

A full-stack municipal information platform built for **Siyathemba Local Municipality (NC077)** in Prieska, Northern Cape. The site serves as a digital gateway for residents across Prieska, Niekerkshoop, Marydale, and surrounding areas — providing access to news, events, documents, tenders, notices, and an AI-powered chatbot.

**Live demo:** [mymunicipal.netlify.app](https://mymunicipal.netlify.app)  
**Status:** Frontend deployed, backend ready for production database. Awaiting official municipal domain.

---

## Why I built this

Small municipalities often lack modern, accessible digital platforms. Important information — tender notices, service updates, community events — is often buried in PDFs on outdated websites or only available in person. I built this platform to demonstrate what a modern municipal digital presence should look like: clean, searchable, mobile-friendly, and interactive.

The project also gave me hands-on experience with a realistic full-stack architecture: **React + FastAPI**, with a Claude AI chatbot that actually understands municipal content.

---

## Pages & Features

| Page | Description |
|------|-------------|
| **Home** | Hero section, quick access links, latest news, upcoming events, population stats |
| **News** | All municipal posts with category filtering (Infrastructure, Council, Community) |
| **Events** | Upcoming and past community events calendar |
| **Documents** | Downloadable PDFs with search and category filters |
| **Notices** | Public notices, media releases, and job vacancies |
| **Tenders** | Tenders and quotations with status filtering (open/closed/awarded) |
| **Contact** | Office info, department contacts, physical address, operating hours |

---

## AI Chatbot

The platform includes a context-aware chatbot powered by the **Anthropic Claude API**. It can answer questions about:

- Current events and news
- Open tenders and their deadlines
- Job vacancies
- Available documents and downloads
- Municipal contact details and office hours

**Demo mode:** Calls the Claude API directly from the frontend.  
**Production mode:** Routes through the `/api/chat/` FastAPI endpoint (already built) to keep the API key secure.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Axios |
| Styling | Pure CSS (fully custom, no framework) |
| Backend | Python 3.11, FastAPI, Pydantic v2 |
| AI Chatbot | Anthropic Claude API (claude-sonnet-4) |
| Demo Storage | Browser localStorage |
| Production DB | PostgreSQL (ready to integrate) |

---

## Architecture

```
SIYATHEMBA_MUNICIPAL/
├── backend/
│   ├── __pycache__/
│   ├── routers/
│   ├── uploads/
│   ├── venv/
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── schemas.py
│   ├── seed_data.py
│   ├── siyathemba.db
│   └── test.pdf
├── frontend/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   │       └── Icons.jsx
│   ├── dist/
│   ├── hooks/
│   ├── node_modules/
│   ├── pages/
│   ├── public/
│   └── src/
│       ├── api/
│       │   └── axios.js
│       ├── components/
│       │   ├── layout/
│       │   └── ui/
│       │       ├── Chatbot.jsx
│       │       └── Navbar.jsx
│       ├── context/
│       │   ├── AdminContext.jsx
│       │   └── ReadItemsContext.jsx
│       ├── hooks/
│       │   └── useData.js
│       ├── pages/
│       │   ├── ArticleView.jsx
│       │   ├── Contact.jsx
│       │   ├── Council.jsx
│       │   ├── Documents.jsx
│       │   ├── Events.jsx
│       │   ├── Home.jsx
│       │   ├── News.jsx
│       │   ├── Notices.jsx
│       │   └── Tenders.jsx
│       ├── utils/
│       │   └── helpers.js
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
├── utils/
│   └── helpers.js
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js

```
