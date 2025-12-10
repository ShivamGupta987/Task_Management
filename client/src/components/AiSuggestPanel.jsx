import { useState } from "react";
import aiService from "../services/aiService";

export default function AiSuggestPanel() {
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const handleSuggest = async () => {
    if (!description.trim()) {
      setError("Please enter a task description");
      return;
    }

    setError("");
    setLoading(true);
    setSuggestions([]);

    try {
      const suggestions = await aiService.suggestTitle(description);
      setSuggestions(suggestions);

      setSelectedSuggestion(null);
    } catch (err) {
      setError(err.message || "Failed to generate suggestions");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (suggestion) => {
    navigator.clipboard.writeText(suggestion);
    setSelectedSuggestion(suggestion);
    setTimeout(() => setSelectedSuggestion(null), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <span className="text-white text-lg font-bold">✨</span>
        </div>
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          AI Task Suggestion
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Describe Your Task
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Need to fix the authentication bug in the login page and write tests for it"
            rows="3"
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400 transition resize-none"
          />
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSuggest}
          disabled={loading || !description.trim()}
          className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white font-semibold rounded-lg transition"
        >
          {loading ? "Generating suggestions..." : "Suggest Titles"}
        </button>

        {suggestions.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">
              Suggested Titles:
            </h3>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border transition cursor-pointer ${
                    selectedSuggestion === suggestion
                      ? "bg-purple-900/50 border-purple-500"
                      : "bg-slate-700/50 border-slate-600 hover:border-purple-500"
                  }`}
                  onClick={() => handleCopy(suggestion)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-slate-100 text-sm font-medium flex-1">
                      {suggestion}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(suggestion);
                      }}
                      className="px-2 py-1 text-xs bg-slate-600 hover:bg-slate-500 text-slate-100 rounded transition whitespace-nowrap"
                    >
                      {selectedSuggestion === suggestion ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-3 text-xs text-slate-400">
          <p className="font-semibold text-slate-300 mb-1">How it works:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Enter a detailed description of your task</li>
            <li>Our AI analyzes the content</li>
            <li>Receive smart title suggestions</li>
            <li>Click to copy suggestions to clipboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
