"use client"

import { useState } from "react"
import taskService from "../services/taskService"
import DeleteConfirmModal from "./DeleteConfirmModal"

const statusColors = {
  Pending: "bg-gray-700 text-gray-100",
  "In Progress": "bg-yellow-700 text-yellow-100",
  Completed: "bg-green-700 text-green-100",
}

const priorityColors = {
  Low: "text-blue-400",
  Medium: "text-yellow-400",
  High: "text-red-400",
}

export default function TaskCard({ task, onUpdate, onSelect }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(task)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [error, setError] = useState("")

  const handleStatusChange = async (newStatus) => {
    try {
      await taskService.updateTask(task._id, { status: newStatus })
      onUpdate?.()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleUpdate = async () => {
    try {
      await taskService.updateTask(task._id, editData)
      setIsEditing(false)
      onUpdate?.()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(task._id)
      setShowDeleteModal(false)
      onUpdate?.()
    } catch (err) {
      setError(err.message)
    }
  }

  const getNextStatus = () => {
    const statusFlow = {
      Pending: "In Progress",
      "In Progress": "Completed",
      Completed: null,
    }
    return statusFlow[task.status]
  }

  if (isEditing) {
    return (
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
        <div className="space-y-4">
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:border-blue-400 outline-none transition"
          />
          <textarea
            value={editData.description}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:border-blue-400 outline-none transition resize-none"
            rows="2"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={editData.dueDate?.split("T")[0]}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:border-blue-400 outline-none transition"
            />
            <select
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
              className="px-3 py-2 bg-slate-700 border border-slate-600 rounded text-slate-100 focus:border-blue-400 outline-none transition"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition text-sm font-medium"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded transition text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition cursor-pointer"
        onClick={onSelect}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-100">{task.title}</h3>
            <p className="text-sm text-slate-400 mt-1">{task.description}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Category:</span>
              <span className="text-slate-300">{task.category}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Priority:</span>
              <span className={`font-semibold ${priorityColors[task.priority]}`}>{task.priority}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Due:</span>
              <span className="text-slate-300">{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {getNextStatus() && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleStatusChange(getNextStatus())
                }}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
              >
                {getNextStatus()}
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsEditing(true)
              }}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded text-sm transition"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowDeleteModal(true)
              }}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
            >
              Delete
            </button>
          </div>
        </div>

        {error && <div className="mt-2 text-red-400 text-sm">{error}</div>}
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        taskTitle={task.title}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  )
}
