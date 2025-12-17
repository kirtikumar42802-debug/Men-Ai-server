const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 यहाँ अपनी चाबी (API Key) पेस्ट करें
const genAI = new GoogleGenerativeAI("AIzaSyDJWpO7puqC-YbOkBdZit3QP90XlQPiuqM");

// हमने मॉडल बदलकर 'gemini-pro' कर दिया है जो 100% चलता है
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

app.use(bodyParser.json());
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
