"use client"

export default function DeleteConfirmModal({ isOpen, taskTitle, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold text-slate-100 mb-2">Delete Task</h2>
        <p className="text-slate-400 mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-300">"{taskTitle}"</span>? This
          action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
