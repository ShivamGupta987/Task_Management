import fetch from "node-fetch";
import { asyncHandler } from "../middleware/errorHandler.js";

export const suggestTitle = asyncHandler(async (req, res) => {
  const { description } = req.body;

  if (!description || description.trim() === "") {
    return res.status(400).json({
      success: false,
      error: "Description is required",
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Generate 3 short professional task titles for this description:\n${description}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!data.candidates || !data.candidates.length) {
      return res.status(500).json({
        success: false,
        error: "Gemini returned no result",
      });
    }

    const rawText = data.candidates[0].content.parts[0].text;

    const suggestions = rawText
      .split("\n")
      .map((s) => s.replace(/^[\d\-\.]+/, "").trim())
      .filter(Boolean)
      .slice(0, 3);

    res.status(200).json({
      success: true,
      data: {
        suggestions,
        source: "gemini",
      },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate AI suggestions",
    });
  }
});
