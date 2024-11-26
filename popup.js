const API_KEY = "AIzaSyBa672-_qO4ZBO-xoor6ExysX39LUOnDxg"; 

async function generateContentUsingGemini(apiKey, promptText) {
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const instruction = "Summarize the following text in a concise and clear manner";
  const betterprompt = `${instruction} ${promptText}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: betterprompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.message}`);
    }

    const responseData = await response.json();
    console.log("API Response:", JSON.stringify(responseData, null, 2)); // Debugging log

    if (responseData?.candidates && responseData.candidates.length > 0) {
      const firstCandidate = responseData.candidates[0]; // Get the first candidate
      const firstPart = firstCandidate?.content?.parts ? firstCandidate.content.parts[0] : null;

      if (firstPart) {
        return firstPart.text || "No generated text available!";
      } else {
        return "No parts found in the response!";
      }
    } else {
      return "No candidates found in the response!";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `Error: ${error.message}`;
  }
}

async function generateContentUsingGemini1(apiKey, promptText) {
  const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";
  const instruction = "Summarize the following text in a concise and clear manner and in good points on what the text means and have all the necessary infomration";
  const betterprompt = `${instruction} ${promptText}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: betterprompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error: ${errorData.message}`);
    }

    const responseData = await response.json();
    console.log("API Response:", JSON.stringify(responseData, null, 2)); 

    if (responseData?.candidates && responseData.candidates.length > 0) {
      const firstCandidate = responseData.candidates[0]; 
      const firstPart = firstCandidate?.content?.parts ? firstCandidate.content.parts[0] : null;

      if (firstPart) {
        return firstPart.text || "No generated text available!";
      } else {
        return "No parts found in the response!";
      }
    } else {
      return "No candidates found in the response!";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return `Error: ${error.message}`;
  }
}

document.getElementById("summarize-highlight").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url.startsWith("chrome://")) {
    document.getElementById("output").innerText = "Cannot access chrome:// pages.";
    return;
  }

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => window.getSelection().toString(),
    },
    async (results) => {
      const highlightedText = results[0]?.result;
      if (!highlightedText) {
        document.getElementById("output").innerText = "No text highlighted!";
        return;
      }

      try {
        const summary = await generateContentUsingGemini(API_KEY, highlightedText);
        document.getElementById("output").innerText = summary; 
      } catch (error) {
        document.getElementById("output").innerText = `Error: ${error.message}`;
      }
    }
  );
});

document.getElementById("summarize-page").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => document.body.innerText,
    },
    async (results) => {
      const pageText = results[0]?.result;
      if (!pageText) {
        document.getElementById("output").innerText = "No content found on the page!";
        return;
      }

      try {
        const summary = await generateContentUsingGemini1(API_KEY, pageText);
        document.getElementById("output").innerText = summary; 
      } catch (error) {
        document.getElementById("output").innerText = `Error: ${error.message}`;
      }
    }
  );
});
