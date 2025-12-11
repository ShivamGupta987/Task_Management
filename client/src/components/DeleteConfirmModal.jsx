
export default function DeleteConfirmModal({ isOpen, taskTitle, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-sm p-6 border rounded-lg bg-slate-800 border-slate-700">
        <h2 className="mb-2 text-xl font-bold text-slate-100">Delete Task</h2>
        <p className="mb-6 text-slate-400">
          Are you sure you want to delete <span className="font-semibold text-slate-300">"{taskTitle}"</span>? This
          action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 font-medium text-white transition bg-red-600 rounded-lg hover:bg-red-700"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 font-medium transition rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
