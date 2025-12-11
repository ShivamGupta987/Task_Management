import Task from "../models/Task.js"
import ActivityLog from "../models/ActivityLog.js"
import { asyncHandler } from "../middleware/errorHandler.js"

// Create Task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, category, priority, dueDate } = req.body

  // Validation
  if (!title || !description || !category || !priority || !dueDate) {
    return res.status(400).json({
      success: false,
      error: "All fields are required",
    })
  }

  const task = await Task.create({
    title,
    description,
    category,
    priority,
    dueDate,
    status: "Pending",
  })

  // Log activity
  await ActivityLog.create({
    taskId: task._id,
    action: "Created",
    newValue: task,
  })

  res.status(201).json({
    success: true,
    data: task,
  })
})

// Get all tasks with filters
export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority } = req.query
  const filter = {}

  if (status) filter.status = status
  if (priority) filter.priority = priority

  const tasks = await Task.find(filter).sort({ createdAt: -1 })

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  })
})

// Get single task
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    return res.status(404).json({
      success: false,
      error: "Task not found",
    })
  }

  res.status(200).json({
    success: true,
    data: task,
  })
})

// Update task
// Update task
export const updateTask = asyncHandler(async (req, res) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: "Task not found",
    });
  }

  const oldValue = { ...task.toObject() };
  const oldStatus = task.status;
  const { status } = req.body;

  // ✅ Allow ANY status change (Pending, In Progress, Completed)
  if (status) {
    const validStatuses = ["Pending", "In Progress", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status value",
      });
    }
  }

  // ✅ Update task
  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // ✅ Log activity (status change OR normal edit)
  if (status && status !== oldStatus) {
    await ActivityLog.create({
      taskId: task._id,
      action: "Status Changed",
      oldStatus,
      newStatus: status,
    });
  } else {
    await ActivityLog.create({
      taskId: task._id,
      action: "Updated",
      oldValue,
      newValue: task.toObject(),
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// Delete task
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id)

  if (!task) {
    return res.status(404).json({
      success: false,
      error: "Task not found",
    })
  }

  // Log activity
  await ActivityLog.create({
    taskId: req.params.id,
    action: "Deleted",
    oldValue: task.toObject(),
  })

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: task,
  })
})

// Get activity logs for a task
export const getActivityLogs = asyncHandler(async (req, res) => {
  const logs = await ActivityLog.find({ taskId: req.params.id }).sort({
    timestamp: -1,
  })

  res.status(200).json({
    success: true,
    count: logs.length,
    data: logs,
  })
})
