
import { useState, useRef } from "react"
import taskService from "../services/taskService"
import AiSuggestPanel from "./AiSuggestPanel"

export default function TaskForm({ onTaskCreated }) {
  const [showAiPanel, setShowAiPanel] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    priority: "Medium",
    dueDate: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      await taskService.createTask(formData)
      setSuccess("Task created successfully!")
      setFormData({
        title: "",
        description: "",
        category: "Other",
        priority: "Medium",
        dueDate: "",
      })
      setShowAiPanel(false)
      setTimeout(() => {
        setSuccess("")
        onTaskCreated?.()
      }, 2000)
    } catch (err) {
      setError(err.message || "Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="p-6 border rounded-lg bg-slate-800/50 backdrop-blur border-slate-700">
        <h2 className="mb-4 text-xl font-bold text-slate-100">Create New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 transition border rounded-lg bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400"
                placeholder="Task title"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 transition border rounded-lg bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-2 transition border rounded-lg resize-none bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-400"
              placeholder="Task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 transition border rounded-lg bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:border-blue-400"
              >
                <option>Work</option>
                <option>Personal</option>
                <option>Shopping</option>
                <option>Health</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-300">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 transition border rounded-lg bg-slate-700 border-slate-600 text-slate-100 focus:outline-none focus:border-blue-400"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 text-sm text-red-200 border border-red-700 rounded-lg bg-red-900/50">{error}</div>
          )}

          {success && (
            <div className="px-4 py-3 text-sm text-green-200 border border-green-700 rounded-lg bg-green-900/50">
              {success}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 font-semibold text-white transition rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>

            <button
              type="button"
              onClick={() => setShowAiPanel(!showAiPanel)}
              className="px-4 py-2 font-semibold text-white transition rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              ✨ AI Help
            </button>
          </div>
        </form>
      </div>

      {showAiPanel && <AiSuggestPanel />}
    </div>
  )
}
