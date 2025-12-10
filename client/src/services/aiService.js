import axiosInstance from "../utils/axiosInstance"

export const aiService = {
  async suggestTitle(description) {
    try {
      const response = await axiosInstance.post("/ai/suggest-title", {
        description,
      })
      return response
    } catch (error) {
      console.error("AI suggestion error:", error)
      throw error
    }
  },
}

export default aiService
