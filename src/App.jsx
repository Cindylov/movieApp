import { Route, Routes } from 'react-router-dom'
import './index.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import MovieDetail from './pages/MovieDetail'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
