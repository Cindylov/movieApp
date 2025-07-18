import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-200 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" id="password" placeholder="********" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">Login</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? <a href="/register" className="text-green-700 hover:underline font-medium">Register</a>
        </p>
      </div>
    </div>
  )
}
