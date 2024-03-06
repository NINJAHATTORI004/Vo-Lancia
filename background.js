chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action == "translate") {
    let textToTranslate = message.text;
    let targetLanguage = message.targetLanguage;

    fetch(
      `https://translation.googleapis.com/language/translate/v2?key=YOUR_API_KEY&q=${encodeURIComponent(
        textToTranslate
      )}&target=${targetLanguage}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        let translatedText = data.data.translations[0].translatedText;
        sendResponse({ translatedText: translatedText });
      })
      .catch((error) => {
        console.error("Error:", error);
        sendResponse({ error: error });
      });

    return true;
  }
});
