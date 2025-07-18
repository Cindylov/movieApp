import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://movieapp.up.railway.app/api'
})

API.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const login = (email, password) => API.post('/auth/login', { email, password })
export const register = (name, email, password) => API.post('/auth/register', { name, email, password })
export const searchMovies = (query) => API.get(`/movies/search?q=${query}`)
export const addFavorite = (movie) => API.post('/favorites', { movieId: movie.id, title: movie.title, poster_path: movie.poster_path,})
export const getFavorites = () => API.get('/favorites')
export const removeFavorite = (movieId) => API.delete(`/favorites/${movieId}`)
