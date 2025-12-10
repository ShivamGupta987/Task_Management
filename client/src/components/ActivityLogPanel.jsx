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
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 h-full">
      <h3 className="text-lg font-bold text-slate-100 mb-4">Activity Log</h3>

      {loading ? (
        <div className="text-slate-400 text-sm">Loading...</div>
      ) : logs.length === 0 ? (
        <div className="text-slate-400 text-sm">No activities yet</div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {logs.map((log) => (
            <div key={log._id} className="border-l-2 border-blue-500 pl-3 py-2">
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
