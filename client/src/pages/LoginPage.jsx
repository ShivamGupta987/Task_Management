

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../services/authService"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await authService.login(email, password)

    if (result.success) {
      navigate("/tasks")
    } else {
      setError(result.error || "Login failed")
    }

    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md">
        <div className="p-8 border rounded-lg shadow-2xl bg-slate-800 border-slate-700">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Task Manager
            </h1>
            <p className="text-sm text-slate-400">Organize your tasks efficiently</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 transition border rounded-lg bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400"
                placeholder="user@example.com"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 transition border rounded-lg bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="px-4 py-3 text-sm text-red-200 border border-red-700 rounded-lg bg-red-900/50">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 font-semibold text-white transition rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="pt-6 mt-6 border-t border-slate-700">
            <p className="mb-3 text-xs text-center text-slate-400">Demo Credentials</p>
            <div className="space-y-2 text-xs text-slate-400">
              <p>user@example.com / password123</p>
              <p>demo@taskmanager.com / demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
