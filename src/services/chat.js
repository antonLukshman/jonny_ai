// src/services/chat.js - Fixed for real API usage
import axios from "axios";

// Function to fetch AI response from DeepSeek API with improved error handling
export async function fetchAIResponse(message) {
  try {
    console.log("Starting API request for message:", message);

    // Check for API key
    const apiKey = process.env.REACT_APP_DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error("DeepSeek API key is not set in environment variables");
      throw new Error(
        "API key is missing. Please check your environment variables."
      );
    }

    console.log("API key found, making DeepSeek API request");

    // API request configuration
    const response = await axios.post(
      "https://api.deepseek.com/v1/chat/completions",
      {
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "You are Jonny AI, a helpful and friendly assistant with a playful personality.",
          },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("API response received:", response.status);

    // Check if the response has the expected format
    if (
      response.data &&
      response.data.choices &&
      response.data.choices.length > 0
    ) {
      const aiResponse = response.data.choices[0].message.content;
      console.log(
        "Extracted AI response:",
        aiResponse.substring(0, 50) + "..."
      );
      return aiResponse;
    } else {
      console.error("Unexpected API response format:", response.data);
      throw new Error("Received unexpected response format from API");
    }
  } catch (error) {
    console.error("Error in API call:", error);

    // Handle specific error types
    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      console.error("API Error Response Status:", error.response.status);
      console.error("API Error Response Data:", error.response.data);

      if (error.response.status === 401) {
        return "Authentication error. Please check your API key.";
      } else if (error.response.status === 429) {
        return "Rate limit exceeded. Please try again later.";
      } else {
        return `API error (${error.response.status}). Please try again.`;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from API");
      return "No response from AI service. Please check your network connection.";
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
      return "Error connecting to AI service. Please try again.";
    }
  }
}
