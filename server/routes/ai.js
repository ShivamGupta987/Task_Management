import express from "express"
import { suggestTitle } from "../controllers/aiController.js"

const router = express.Router()

router.post("/suggest-title", suggestTitle)

export default router
