const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 यहाँ अपने दोस्त/दूसरी ID वाली नई चाबी पेस्ट करें
const genAI = new GoogleGenerativeAI("AIzaSyCgqUurfS5iIiKkp1aBhm6wR3XtWFXgzY0");

// 'gemini-pro' सबसे भरोसेमंद मॉडल है
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
        console.error("Final Error:", error);
        res.json({ reply: "Account Blocked Error: Please use a different Gmail ID for API Key." });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
