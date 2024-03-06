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

document.addEventListener("DOMContentLoaded", function () {
  loadTranslationHistory();
});

function loadTranslationHistory() {
  const translationList = document.getElementById("translationList");

  chrome.storage.local.get("translationHistory", function (data) {
    const translationHistory = data.translationHistory || [];
    translationList.innerHTML = "";

    translationHistory.forEach((translation, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${translation.originalText} → ${translation.translatedText} (${translation.targetLanguage})`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteTranslation(index);
      });

      listItem.appendChild(deleteButton);
      translationList.appendChild(listItem);
    });
  });
}

function deleteTranslation(index) {
  chrome.storage.local.get("translationHistory", function (data) {
    let translationHistory = data.translationHistory || [];
    translationHistory.splice(index, 1); // Remove the translation at the specified index
    chrome.storage.local.set(
      { translationHistory: translationHistory },
      function () {
        loadTranslationHistory(); // Reload the translation history after deletion
      }
    );
  });
}
