import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = () => setIsOpen(false)

  return (
    <nav className="bg-white shadow px-4 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={handleLinkClick} className="text-2xl font-bold text-green-800">
          🎬 MovieApp
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-2xl text-gray-700 focus:outline-none"
        >
          ☰
        </button>

        {/* Links */}
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } flex-col lg:flex lg:flex-row lg:items-center gap-4 lg:gap-6 font-medium text-[17px] absolute lg:static bg-white left-0 top-16 w-full lg:w-auto px-4 py-3 lg:p-0 shadow-lg lg:shadow-none`}
        >
          <Link to="/" onClick={handleLinkClick} className="text-gray-700 hover:text-green-600 transition">
            Home
          </Link>

          {user && (
            <Link to="/favorites" onClick={handleLinkClick} className="text-gray-700 hover:text-green-600 transition">
              Favorites
            </Link>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={handleLinkClick} className="text-gray-700 hover:text-green-600 transition">
                Login
              </Link>
              <Link to="/register" onClick={handleLinkClick} className="text-gray-700 hover:text-green-600 transition">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-green-800 font-bold">
                Hi, <span className="font-bold">{user.name}</span>
              </span>
              <button
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
