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

  loadTranslationHistory();
});

document.addEventListener("DOMContentLoaded", function () {
  const detectButton = document.getElementById("detectButton");
  const inputText = document.getElementById("inputText");
  const detectedLanguageDiv = document.getElementById("detectedLanguage");

  detectButton.addEventListener("click", function () {
    const textToDetect = inputText.value;
    detectLanguage(textToDetect);
  });
});

async function detectLanguage(text) {
  const formdata = new FormData();
  formdata.append("key", "ea4424ca1beb145f3fffc22864f8c818");
  formdata.append("txt", text);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://api.meaningcloud.com/lang-4.0/identification",
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      const detectedLanguage = data.language_list[0].name;
      const detectedLanguageDiv = document.getElementById("detectedLanguage");
      detectedLanguageDiv.textContent =
        "Detected Language: " + detectedLanguage;
    } else {
      throw new Error("Failed to detect language");
    }
  } catch (error) {
    console.error("Error detecting language:", error);
  }
}

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
    console.log(translationHistory);
  });
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
