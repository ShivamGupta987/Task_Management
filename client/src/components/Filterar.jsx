"use client"

import { useState } from "react"

export default function FilterBar({ onFiltersChange }) {
  const [statusFilter, setStatusFilter] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("")

  const handleStatusChange = (status) => {
    const newStatus = statusFilter === status ? "" : status
    setStatusFilter(newStatus)
    onFiltersChange({
      status: newStatus,
      priority: priorityFilter,
    })
  }

  const handlePriorityChange = (priority) => {
    const newPriority = priorityFilter === priority ? "" : priority
    setPriorityFilter(newPriority)
    onFiltersChange({
      status: statusFilter,
      priority: newPriority,
    })
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Status</label>
          <div className="space-y-2">
            {["Pending", "In Progress", "Completed"].map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                  statusFilter === status ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2">Priority</label>
          <div className="space-y-2">
            {["Low", "Medium", "High"].map((priority) => (
              <button
                key={priority}
                onClick={() => handlePriorityChange(priority)}
                className={`block w-full text-left px-3 py-2 rounded text-sm transition ${
                  priorityFilter === priority
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {priority}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-2 flex items-end">
          <button
            onClick={() => {
              setStatusFilter("")
              setPriorityFilter("")
              onFiltersChange({})
            }}
            className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded text-sm transition font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}
