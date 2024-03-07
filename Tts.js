const axios = require('axios');
const subscriptionKey = 'a2d58984d9af40b39c6714f783174b86';
const endpoint = 'https://southeastasia.api.cognitive.microsoft.com/';

async function convertTextToSpeech(text) {
    const url = `${endpoint}/cognitiveservices/v1`;
    const config = {
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': 'application/ssml+xml'
        }
    };

    const requestBody = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>
                            <voice name='en-US-Guy24kRUS'>
                                ${text}
                            </voice>
                        </speak>`;

    try {
        const response = await axios.post(url, requestBody, config);
        // Handle the audio data returned by Azure Text to Speech
    } catch (error) {
        console.error('Error converting text to speech:', error);
    }
}

// Call the function with the text you want to convert
convertTextToSpeech('Hello, how are you?');
