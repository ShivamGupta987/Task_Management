import { GoogleGenAI } from "@google/genai";
import { asyncHandler } from "../middleware/errorHandler.js";

export const suggestTitle = asyncHandler(async (req, res) => {
  const { description } = req.body;

  if (!description || !description.trim()) {
    return res.status(400).json({
      success: false,
      error: "Description is required",
    });
  }

  try {
    const genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `Generate exactly 3 short, professional task titles for this description:
"${description}"

Return each title on a new line only.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    let rawText = null;
    
    if (response?.text && typeof response.text === 'function') {
      rawText = await response.text();
    } else if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      rawText = response.candidates[0].content.parts[0].text;
    }

    if (!rawText) {
      console.error("No text from Gemini");
      return res.status(500).json({
        success: false,
        error: "Gemini returned no result",
      });
    }

    const suggestions = rawText
      .split("\n")
      .map((s) => s.replace(/^[\d\.\-\)\(\*#]+/g, "").trim())
      .filter((s) => s && s.length > 0)
      .slice(0, 3);

    if (suggestions.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Could not parse suggestions",
      });
    }

    // ✅ CORRECT RESPONSE STRUCTURE - wrap in 'data' object
    return res.status(200).json({
      success: true,
      data: {
        suggestions,
        source: "gemini",
      },
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate suggestions",
    });
  }
});