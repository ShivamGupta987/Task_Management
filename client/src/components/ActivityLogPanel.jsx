"use client"

import { useEffect, useState } from "react"
import taskService from "../services/taskService"

export default function ActivityLogPanel({ taskId }) {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLogs()
  }, [taskId])

  const fetchLogs = async () => {
    setLoading(true)
    try {
      const result = await taskService.getActivityLogs(taskId)
      setLogs(result.data || [])
    } catch (err) {
      console.error("Failed to fetch activity logs:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full p-4 border rounded-lg bg-slate-800/50 backdrop-blur border-slate-700">
      <h3 className="mb-4 text-lg font-bold text-slate-100">Activity Log</h3>

      {loading ? (
        <div className="text-sm text-slate-400">Loading...</div>
      ) : logs.length === 0 ? (
        <div className="text-sm text-slate-400">No activities yet</div>
      ) : (
        <div className="space-y-3 overflow-y-auto max-h-96">
          {logs.map((log) => (
            <div key={log._id} className="py-2 pl-3 border-l-2 border-blue-500">
              <p className="text-sm font-semibold text-slate-200">{log.action}</p>
              {log.oldStatus && log.newStatus && (
                <p className="text-xs text-slate-400">
                  {log.oldStatus} → {log.newStatus}
                </p>
              )}
              <p className="text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
