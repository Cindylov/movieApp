import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../context/AuthContext';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get('/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = Array.isArray(res.data) ? res.data : []; // Ensure it's an array
      setFavorites(data);
    } catch (err) {
      console.error('Failed to fetch favorites', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (movieId) => {
    try {
      await axios.delete(`/api/favorites/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites((prev) => prev.filter((movie) => movie.movieId !== movieId));
    } catch (err) {
      console.error('Failed to remove movie', err);
    }
  };

  if (loading) {
    return <div className="p-4 text-gray-500">Loading your favorites...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Movies</h1>

      {Array.isArray(favorites) && favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div
              key={movie.movieId}
              className="bg-white p-2 rounded shadow hover:scale-105 transition relative"
            >
              <Link to={`/movie/${movie.movieId}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded"
                />
                <h3 className="mt-2 font-semibold">{movie.title}</h3>
              </Link>
              <button
                onClick={() => handleRemove(movie.movieId)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 font-extrabold"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
