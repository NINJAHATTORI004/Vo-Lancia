# Volancia, AI Translater for Accessibility

This Chrome extension allows users to translate text using the Azure Translate API.

## Features

- Translate text into various languages supported by Azure Translate API.
- View translation history.

[Download Demo Video](https://github.com/NINJAHATTORI004/InnoHacks_VoLancia/raw/main/demo.mp4)

## Installation

1. Clone the repository or download the source code.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Drag the .crx file on the browser window.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. Enter the text you want to translate in the textarea.
3. Select the target language from the dropdown menu.
4. Click the "Translate" button to view the translated text.
5. Click on the "Translation History" link to view all translations made by the extension.

## Supported Languages

The extension supports a wide range of languages provided by the Azure Translate API.

## Configuration

To use the extension, you need to obtain an Azure Translate API subscription key and specify it in the `popup.js` file.

![1](https://github.com/NINJAHATTORI004/Vo-Lancia/blob/main/images/Screenshot.png)





```javascript
const subscriptionKey = "YOUR_AZURE_TRANSLATE_SUBSCRIPTION_KEY";
const region = "YOUR_AZURE_TRANSLATE_REGION";
```
