import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { corsOptions } from "./config/cors.js"
import { errorHandler } from "./middleware/errorHandler.js"
import taskRoutes from "./routes/tasks.js"
import aiRoutes from "./routes/ai.js"

dotenv.config()

const app = express()

// Middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to Database
connectDB()

// Routes
app.use("/api/tasks", taskRoutes)
app.use("/api/ai", aiRoutes)

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Backend is running" })
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
