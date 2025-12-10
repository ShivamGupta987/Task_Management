import axios from "axios"
import { setToken, setUser, logout, getToken } from "../utils/auth"

const LAMBDA_URL = import.meta.env.VITE_AWS_LAMBDA_LOGIN_URL

export const authService = {
  async login(email, password) {
    try {
      const response = await axios.post(LAMBDA_URL, {
        email,
        password,
      })

      // ✅ ✅ YAHAN FIX HAI
      if (response.data.success) {
        const { token, user } = response.data   
        setToken(token)
        setUser(user)
        return { success: true, user }
      }

      return { success: false, error: response.data.error }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: error.response?.data?.error || "Login failed",
      }
    }
  },

  logout() {
    logout()
  },

  isAuthenticated() {
    return !!getToken()
  },

  getToken() {
    return getToken()
  },
}

export default authService
