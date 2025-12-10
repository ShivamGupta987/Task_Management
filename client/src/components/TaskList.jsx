"use client"

import { useEffect, useState } from "react"
import taskService from "../services/taskService"
import TaskCard from "./TaskCard"

export default function TaskList({ filters, onTaskSelect, onTasksLoaded }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [filters])

  const fetchTasks = async () => {
    setLoading(true)
    setError("")
    try {
      const result = await taskService.getTasks(filters)
      setTasks(result.data || [])
      onTasksLoaded?.(result.data || [])
    } catch (err) {
      setError(err.message || "Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  const handleTaskUpdate = async () => {
    await fetchTasks()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-400">Loading tasks...</div>
      </div>
    )
  }

  if (error) {
    return <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">{error}</div>
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No tasks found. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onUpdate={handleTaskUpdate} onSelect={() => onTaskSelect?.(task._id)} />
      ))}
    </div>
  )
}
