import { asyncHandler } from "../middleware/errorHandler.js"

// Mock AI suggestion for task title
export const suggestTitle = asyncHandler(async (req, res) => {
  const { description } = req.body

  if (!description || description.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Description is required",
    })
  }

  try {
    // In production, integrate with OpenAI/Claude
    // For now, we'll use a mock intelligent response
    const mockSuggestions = generateMockTitles(description)

    res.status(200).json({
      success: true,
      data: {
        suggestions: mockSuggestions,
        source: "mock",
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to generate suggestions",
    })
  }
})

function generateMockTitles(description) {
  const keywords = description
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 3)

  const templates = [
    `Complete: ${keywords.slice(0, 2).join(" ")}`,
    `${keywords[0]} - Action Required`,
    `Review ${keywords[0]} Details`,
    `Update ${keywords.slice(0, 2).join(" ")}`,
  ]

  return templates.filter((t) => t).slice(0, 3)
}
