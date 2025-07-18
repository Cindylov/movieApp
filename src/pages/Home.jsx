import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { user } = useAuth()
  const API_KEY = '25332660233006e4fd20f7b32c769590'

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch(page)
    } else {
      fetchPopularMovies(page)
    }
  }, [page])

  const fetchPopularMovies = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNum}`
      )
      setMovies(res.data.results)
      setTotalPages(res.data.total_pages)
    } catch (error) {
      console.error('Error fetching popular movies', error)
    }
  }

  const handleSearch = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${pageNum}`
      )
      setMovies(res.data.results)
      setTotalPages(res.data.total_pages)
    } catch (error) {
      console.error('Search failed', error)
    }
  }

  const handleSearchClick = () => {
    setPage(1)
    handleSearch(1)
  }

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1)
  }

  const handleNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1)
  }

  return (
    <div className="p-4">
      {user && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-green-800">Welcome, {user.name}!</h2>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-green-800"
        />
        <button
          onClick={handleSearchClick}
          className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Search
        </button>
      </div>

      {/* Movie List */}
      <h2 className="text-2xl font-bold mb-4 text-green-800">Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {movies.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-white p-2 rounded shadow hover:scale-105 transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />
            <h3 className="mt-2 font-semibold">{movie.title}</h3>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-green-800 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-medium">Page {page} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-green-800 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
