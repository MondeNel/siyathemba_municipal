import api from '../api/axios';

// File uploads
export const uploadDocumentFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/uploads/document', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
};

export const uploadTenderFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/uploads/tender', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then(res => res.data);
};

// Posts
export const fetchPosts = () => api.get('/posts').then(res => res.data);
export const createPost = (post) => api.post('/posts', post).then(res => res.data);
export const updatePost = (id, post) => api.put(`/posts/${id}`, post).then(res => res.data);
export const deletePost = (id) => api.delete(`/posts/${id}`);

// Events
export const fetchEvents = () => api.get('/events').then(res => res.data);
export const createEvent = (event) => api.post('/events', event).then(res => res.data);
export const updateEvent = (id, event) => api.put(`/events/${id}`, event).then(res => res.data);
export const deleteEvent = (id) => api.delete(`/events/${id}`);

// Documents
export const fetchDocuments = () => api.get('/documents').then(res => res.data);
export const createDocument = (doc) => api.post('/documents', doc).then(res => res.data);
export const updateDocument = (id, doc) => api.put(`/documents/${id}`, doc).then(res => res.data);
export const deleteDocument = (id) => api.delete(`/documents/${id}`);

// Notices
export const fetchNotices = () => api.get('/notices').then(res => res.data);
export const createNotice = (notice) => api.post('/notices', notice).then(res => res.data);
export const updateNotice = (id, notice) => api.put(`/notices/${id}`, notice).then(res => res.data);
export const deleteNotice = (id) => api.delete(`/notices/${id}`);

// Tenders
export const fetchTenders = () => api.get('/tenders').then(res => res.data);
export const createTender = (tender) => api.post('/tenders', tender).then(res => res.data);
export const updateTender = (id, tender) => api.put(`/tenders/${id}`, tender).then(res => res.data);
export const deleteTender = (id) => api.delete(`/tenders/${id}`);
