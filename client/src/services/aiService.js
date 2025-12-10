import axiosInstance from "../utils/axiosInstance";

export const aiService = {
  async suggestTitle(description) {
    try {
      const response = await axiosInstance.post("/ai/suggest-title", {
        description,
      });

      console.log("API Response:", response.data);

      // 🔥 FIX: backend returns `suggestions` at root level, not inside data.suggestions
      if (!response.data?.suggestions) {
        throw new Error("Invalid response structure: suggestions not found");
      }

      return response.data.suggestions;

    } catch (error) {
      console.error("AI suggestion error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.error || error.message);
    }
  },
};

export default aiService;
