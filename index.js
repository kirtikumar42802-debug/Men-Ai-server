

const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 यहाँ अपनी सही API Key डालें
const genAI = new GoogleGenerativeAI("AIzaSyDPsmUbLEj3VMcrsu3Dr7mAKM4JilUGmHg");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// गलती यहाँ थी: अब हमने 'body-parser' हटा दिया है, तो क्रैश नहीं होगा
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
