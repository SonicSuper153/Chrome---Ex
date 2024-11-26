chrome.runtime.onInstalled.addListener(() => {
  console.log("installed");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "displaySummary") {
    console.log("Summary is received mann", message.summary);
    sendResponse({ status: "success", summary: message.summary });
  }
});
