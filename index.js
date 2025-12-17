const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 अपनी 'MenAi-Final' वाली सही चाबी यहाँ डालें
const genAI = new GoogleGenerativeAI("AIzaSyDPsmUbLEj3VMcrsu3Dr7mAKM4JilUGmHg");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 'body-parser' की जगह अब हम सीधा express का टूल यूज़ करेंगे
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error("Error:", error);
        res.json({ reply: "Error: " + error.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEYhttps://generativelanguage.googleapis.com/v1beta/models?key=${API_KEYconstconst express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 अपनी 'MenAi-Final' वाली सही चाबी यहाँ डालें
const genAI = new GoogleGenerativeAI("AIzaSy_______________________");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 'body-parser' की जगह अब हम सीधा express का टूल यूज़ करेंगे
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error("Error:", error);
        res.json({ reply: "Error: " + error.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
