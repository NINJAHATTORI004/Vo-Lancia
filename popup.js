document.addEventListener("DOMContentLoaded", function () {
  const translateButton = document.getElementById("translateButton");
  const inputText = document.getElementById("inputText");
  const translatedText = document.getElementById("translatedText");
  const languageDropdown = document.getElementById("languageDropdown");

  translateButton.addEventListener("click", function () {
    const textToTranslate = inputText.value;
    const targetLanguage = languageDropdown.value;
    translateText(textToTranslate, targetLanguage);
  });

  // Load translation history
  loadTranslationHistory();
});
async function translateText(text, targetLanguage) {
  const subscriptionKey = "f41ae025a1e94b4689d8f2dae5e4c635";
  const endpoint = "https://api.cognitive.microsofttranslator.com";
  const region = "southeastasia";
  const path = `/translate?api-version=3.0&to=${targetLanguage}`;

  const response = await fetch(`${endpoint}${path}`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Ocp-Apim-Subscription-Region": region,
      "Content-type": "application/json",
      "X-ClientTraceId": uuidv4().toString(),
    },
    body: JSON.stringify([{ text: text }]),
  });

  const translations = await response.json();
  const translatedText = translations[0].translations[0].text;

  // Store translation in history
  storeTranslation(text, translatedText, targetLanguage);

  const translatedTextDiv = document.getElementById("translatedText");
  translatedTextDiv.innerText = translatedText;
}

function storeTranslation(originalText, translatedText, targetLanguage) {
  chrome.storage.local.get("translationHistory", function (data) {
    let translationHistory = data.translationHistory || [];
    translationHistory.push({
      originalText: originalText,
      translatedText: translatedText,
      targetLanguage: targetLanguage,
    });

    chrome.storage.local.set({ translationHistory: translationHistory });
  });
}

function loadTranslationHistory() {
  chrome.storage.local.get("translationHistory", function (data) {
    const translationHistory = data.translationHistory || [];
    console.log(translationHistory); // Display translation history in console or use it to display in UI
  });
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
