"use server"

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent"

export async function callGeminiAPI(prompt) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

  if (!apiKey) {
    return "Please add your Gemini API key to the .env.local file. See the ENV_SETUP.md file for instructions."
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 500,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error("[Gemini API Error]", {
        status: response.status,
        statusText: response.statusText,
        error: data.error,
      })
      return `API Error: ${data.error?.message || "Unknown error"}`
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received"
  } catch (error) {
    console.error("[Gemini API Exception]:", error.message)
    return `Error: ${error.message}`
  }
}
