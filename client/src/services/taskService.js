import axiosInstance from "../utils/axiosInstance"

export const taskService = {
  async createTask(taskData) {
    return axiosInstance.post("/tasks", taskData)
  },

  async getTasks(filters = {}) {
    return axiosInstance.get("/tasks", { params: filters })
  },

  async getTaskById(id) {
    return axiosInstance.get(`/tasks/${id}`)
  },

  async updateTask(id, taskData) {
    return axiosInstance.put(`/tasks/${id}`, taskData)
  },

  async deleteTask(id) {
    return axiosInstance.delete(`/tasks/${id}`)
  },

  async getActivityLogs(taskId) {
    return axiosInstance.get(`/tasks/${taskId}/logs`)
  },
}

export default taskService
