const API_KEY = "AIzaSyBa672-_qO4ZBO-xoor6ExysX39LUOnDxg"; // Replace with your Gemini API Key
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

async function testGeminiAPI(apiKey) {
  const promptText = "Hello, this is a test prompt to check if Gemini is working."; // Simple test prompt

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: promptText,
          },
        ],
      },
    ],
  };

  try {
    // Send POST request to the Gemini API
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData.message);
      return;
    }

    // Parse the JSON response
    const responseData = await response.json();
    console.log("API Response:", JSON.stringify(responseData, null, 2));

    // Check if the response contains candidates and parts
    if (responseData?.candidates && responseData.candidates.length > 0) {
      const firstCandidate = responseData.candidates[0]; // Get the first candidate
      const firstPart = firstCandidate?.content?.parts ? firstCandidate.content.parts[0] : null;

      if (firstPart) {
        const generatedText = firstPart.text || "No generated text available!";
        console.log("Generated Text:", generatedText);
      } else {
        console.log("No parts found in the response!");
      }
    } else {
      console.log("No candidates found in the response!");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
  }
}

// Test the API
testGeminiAPI(API_KEY);
