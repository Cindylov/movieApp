import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { addFavorite } from '../services/api'

export default function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=25332660233006e4fd20f7b32c769590`
        )
        setMovie(res.data)
      } catch (error) {
        console.error("Error fetching movie details", error)
      }
    }

    const fetchTrailer = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=25332660233006e4fd20f7b32c769590`
        )
        const trailers = res.data.results
        const officialTrailer = trailers.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        )
        if (officialTrailer) {
          setTrailerKey(officialTrailer.key)
        }
      } catch (error) {
        console.error("Error fetching trailer", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
    fetchTrailer()
  }, [id])

  const handleAddFavorite = async () => {
    if (!token) {
      alert("Please log in to save favorites.")
      return
    }

    try {
      await addFavorite(movie)
      alert("Added to favorites!")
    } catch (err) {
      console.error("Failed to add to favorites:", err.response?.data || err.message)
      alert("Failed to add to favorites.")
    }
  }

  if (loading) return <p className="p-4">Loading...</p>
  if (!movie) return <p className="p-4 text-red-500">Movie not found.</p>

  return (
    <div className="p-4 max-w-full mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          className="w-full md:w-1/3 rounded-lg shadow"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 mb-2">{movie.release_date} • ⭐ {movie.vote_average}/10</p>
          <p className="mb-4">{movie.overview}</p>

          <div className="flex gap-4 mb-4">
            <button
              className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              onClick={handleAddFavorite}
            >
              Add to Favorites
            </button>

            {trailerKey && (
              <button
                onClick={() => setShowTrailer(!showTrailer)}
                className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                {showTrailer ? "Stop Trailer" : "▶️ Play Trailer"}
              </button>
            )}
          </div>

          {showTrailer && trailerKey && (
            <div className="w-full h-[500px] mt-4">
              <iframe
                className="w-full h-full rounded shadow"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
