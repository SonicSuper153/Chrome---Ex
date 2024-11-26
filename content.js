// const API_KEY = "AIzaSyBa672-_qO4ZBO-xoor6ExysX39LUOnDxg"; // Replace with your Gemini API Key
// const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// // Function to call Gemini API and generate content
// // async function generateContentUsingGemini(apiKey, promptText) {
// //   const requestBody = {
// //     contents: [
// //       {
// //         parts: [
// //           {
// //             text: promptText,
// //           },
// //         ],
// //       },
// //     ],
// //   };

// //   try {
// //     // Send the POST request to the Gemini API
// //     const response = await fetch(`${apiUrl}?key=${apiKey}`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(requestBody),
// //     });

// //     if (!response.ok) {
// //       const errorData = await response.json();
// //       throw new Error(`API Error: ${errorData.message}`);
// //     }

// //     const responseData = await response.json();
// //     console.log("API Response:", JSON.stringify(responseData, null, 2)); // Debugging log

// //     // Extract the generated text from the response
// //     if (responseData?.candidates && responseData.candidates.length > 0) {
// //       const firstCandidate = responseData.candidates[0]; // Get the first candidate
// //       const firstPart = firstCandidate?.content?.parts ? firstCandidate.content.parts[0] : null;

// //       if (firstPart) {
// //         return firstPart.text || "No generated text available!";
// //       } else {
// //         return "No parts found in the response!";
// //       }
// //     } else {
// //       return "No candidates found in the response!";
// //     }
// //   } catch (error) {
// //     console.error("Error calling Gemini API:", error);
// //     return `Error: ${error.message}`;
// //   }
// // }

// // Summarize highlighted text
// document.getElementById("summarize-highlight").addEventListener("click", async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//   // Check if the current tab is a chrome:// URL
//   if (tab.url.startsWith("chrome://")) {
//     document.getElementById("output").innerText = "Cannot access chrome:// pages.";
//     return;
//   }

//   chrome.scripting.executeScript(
//     {
//       target: { tabId: tab.id },
//       func: () => window.getSelection().toString(),
//     },
//     async (results) => {
//       const highlightedText = results[0]?.result;
//       if (!highlightedText) {
//         document.getElementById("output").innerText = "No text highlighted!";
//         return;
//       }

//       try {
//         const summary = await generateContentUsingGemini(API_KEY, highlightedText);
//         document.getElementById("output").innerText = summary; // Display the summary text
//       } catch (error) {
//         document.getElementById("output").innerText = `Error: ${error.message}`;
//       }
//     }
//   );
// });

// // Summarize entire page
// document.getElementById("summarize-page").addEventListener("click", async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript(
//     {
//       target: { tabId: tab.id },
//       func: () => document.body.innerText,
//     },
//     async (results) => {
//       const pageText = results[0]?.result;
//       if (!pageText) {
//         document.getElementById("output").innerText = "No content found on the page!";
//         return;
//       }

//       try {
//         const summary = await generateContentUsingGemini(API_KEY, pageText);
//         document.getElementById("output").innerText = summary; // Display the summary text
//       } catch (error) {
//         document.getElementById("output").innerText = `Error: ${error.message}`;
//       }
//     }
//   );
// });
