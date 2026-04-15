import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notices, setNotices] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      const [postsRes, eventsRes, docsRes, noticesRes, tendersRes] = await Promise.all([
        api.fetchPosts(),
        api.fetchEvents(),
        api.fetchDocuments(),
        api.fetchNotices(),
        api.fetchTenders(),
      ]);
      setPosts(postsRes);
      setEvents(eventsRes);
      setDocuments(docsRes);
      setNotices(noticesRes);
      setTenders(tendersRes);
    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const addPost = async (post) => { await api.createPost(post); await loadAll(); };
  const editPost = async (id, post) => { await api.updatePost(id, post); await loadAll(); };
  const removePost = async (id) => { await api.deletePost(id); await loadAll(); };

  const addEvent = async (event) => { await api.createEvent(event); await loadAll(); };
  const editEvent = async (id, event) => { await api.updateEvent(id, event); await loadAll(); };
  const removeEvent = async (id) => { await api.deleteEvent(id); await loadAll(); };

  const addDocument = async (doc) => { await api.createDocument(doc); await loadAll(); };
  const editDocument = async (id, doc) => { await api.updateDocument(id, doc); await loadAll(); };
  const removeDocument = async (id) => { await api.deleteDocument(id); await loadAll(); };

  const addNotice = async (notice) => { await api.createNotice(notice); await loadAll(); };
  const editNotice = async (id, notice) => { await api.updateNotice(id, notice); await loadAll(); };
  const removeNotice = async (id) => { await api.deleteNotice(id); await loadAll(); };

  const addTender = async (tender) => { await api.createTender(tender); await loadAll(); };
  const editTender = async (id, tender) => { await api.updateTender(id, tender); await loadAll(); };
  const removeTender = async (id) => { await api.deleteTender(id); await loadAll(); };

  const value = {
    loading,
    posts, events, documents, notices, tenders,
    addPost, editPost, removePost,
    addEvent, editEvent, removeEvent,
    addDocument, editDocument, removeDocument,
    addNotice, editNotice, removeNotice,
    addTender, editTender, removeTender,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
