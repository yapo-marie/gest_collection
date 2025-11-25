import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api'
});

let authToken = null;

export const setAuthToken = (token) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('auth_token', token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem('auth_token');
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API error', error.response.data);
    } else {
      console.error('API error', error);
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const form = new FormData();
  form.append('username', email);
  form.append('password', password);
  const response = await api.post('/auth/login', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  const { access_token: token } = response.data;
  setAuthToken(token);
  return token;
};

export const register = async (payload) => {
  const response = await api.post('/auth/register', payload);
  return response.data;
};

export const fetchMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const loginWithFirebase = async (idToken) => {
  const response = await api.post('/auth/firebase', { id_token: idToken });
  const { access_token: token } = response.data;
  setAuthToken(token);
  return token;
};

export const fetchDashboardStats = async () => {
  const [collectionsRes, itemsRes] = await Promise.all([
    api.get('/collections'),
    api.get('/items')
  ]);

  const collections = collectionsRes.data;
  const items = itemsRes.data;

  const typeAliases = {
    livre: 'livre',
    book: 'livre',
    film: 'film',
    movie: 'film',
    jeu: 'jeu',
    game: 'jeu',
    carte: 'carte',
    card: 'carte'
  };
  const typeLabels = {
    livre: 'Livres',
    film: 'Films',
    jeu: 'Jeux',
    carte: 'Cartes'
  };
  const collectionsById = collections.reduce((acc, collection) => {
    const normalized = typeAliases[collection.type] ?? collection.type;
    acc[collection.id] = normalized;
    return acc;
  }, {});
  const byTypeCounts = items.reduce((acc, item) => {
    const type = typeAliases[collectionsById[item.collection_id]] ?? collectionsById[item.collection_id];
    if (!type) {
      return acc;
    }
    acc[type] = (acc[type] ?? 0) + 1;
    return acc;
  }, {});

  const byType = Object.entries(typeLabels).map(([key, label]) => ({
    type: label,
    count: byTypeCounts[key] ?? 0
  }));

  const statusAliases = {
    possede: 'possede',
    owned: 'possede',
    en_cours: 'en_cours',
    'en cours': 'en_cours',
    in_progress: 'en_cours',
    termine: 'termine',
    terminé: 'termine',
    completed: 'termine'
  };
  const statusLabels = {
    possede: 'Possédé',
    en_cours: 'En cours',
    termine: 'Terminé'
  };
  const byStatusMap = items.reduce((acc, item) => {
    const key = statusAliases[item.status] ?? item.status;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const byStatus = Object.entries(statusLabels).map(([status, label]) => ({
    status,
    label,
    count: byStatusMap[status] ?? 0
  }));

  return {
    totals: { collections: collections.length, items: items.length },
    byType,
    byStatus
  };
};

export const fetchCollections = async (params = {}) => {
  const response = await api.get('/collections', { params });
  return response.data;
};

export const fetchCollection = async (collectionId) => {
  const response = await api.get(`/collections/${collectionId}`);
  return response.data;
};

export const createCollection = async (payload) => {
  const response = await api.post('/collections', payload);
  return response.data;
};

export const updateCollection = async (collectionId, payload) => {
  const response = await api.put(`/collections/${collectionId}`, payload);
  return response.data;
};

export const deleteCollection = async (collectionId) => {
  await api.delete(`/collections/${collectionId}`);
};

export const fetchItems = async (params = {}) => {
  const response = await api.get('/items', { params });
  return response.data;
};

export const fetchItem = async (itemId) => {
  const response = await api.get(`/items/${itemId}`);
  return response.data;
};

export const createItem = async (payload) => {
  const response = await api.post('/items', payload);
  return response.data;
};

export const updateItem = async (itemId, payload) => {
  const response = await api.put(`/items/${itemId}`, payload);
  return response.data;
};

export const deleteItem = async (itemId) => {
  await api.delete(`/items/${itemId}`);
};

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export default api;
