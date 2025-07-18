import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    register(name, email, pwd)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-8">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="********" required className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button type="submit" className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300">Register</button>
          <p className="text-center text-sm text-gray-600 mt-6">Already have an account?{" "}
            <a href="/login" className="text-green-700 hover:underline font-medium">Login</a>
          </p>
        </form>
      </div>
    </div>
  )
}
