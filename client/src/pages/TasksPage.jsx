"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import TaskForm from "../components/TaskForm"
import TaskList from "../components/TaskList"
import FilterBar from "../components/FilterBar"
import ActivityLogPanel from "../components/ActivityLogPanel"
import authService from "../services/authService"

export default function TasksPage() {
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState({})
  const [selectedTaskId, setSelectedTaskId] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login")
    }
  }, [navigate])

  const handleLogout = () => {
    authService.logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-slate-800/50 backdrop-blur border-b border-slate-700 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Task Manager
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex gap-6 p-6">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <TaskForm onTaskCreated={() => {}} />
            <FilterBar onFiltersChange={setFilters} />
            <TaskList filters={filters} onTaskSelect={setSelectedTaskId} onTasksLoaded={setTasks} />
          </div>

          {/* Activity Log Sidebar */}
          <div className="w-80">{selectedTaskId && <ActivityLogPanel taskId={selectedTaskId} />}</div>
        </div>
      </div>
    </div>
  )
}
