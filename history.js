document.addEventListener("DOMContentLoaded", function () {
  loadTranslationHistory();
});

function loadTranslationHistory() {
  chrome.storage.local.get("translationHistory", function (data) {
    const translationHistory = data.translationHistory || [];
    const historyList = document.getElementById("historyList");
    translationHistory.forEach(function (translation) {
      const listItem = document.createElement("li");
      listItem.textContent = `${translation.originalText} -> ${translation.translatedText}`;
      historyList.appendChild(listItem);
    });
  });
}
