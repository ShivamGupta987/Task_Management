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
// ✅ Save token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};

// ✅ Get token  (⚠️ YE MISSING THA)
export const getToken = () => {
  return localStorage.getItem("token");
};

// ✅ Save user
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// ✅ Get user
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ✅ Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default taskService
