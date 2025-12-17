const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 यहाँ " " के बीच में अपनी 'नई Gmail वाली' चाबी पेस्ट करें
const genAI = new GoogleGenerativeAI("AIzaSyCU0mtBJXeBVL6Ei6y-rpCixTA27kPawt8");

// नए अकाउंट के लिए यह मॉडल सबसे बेस्ट और फ्री है
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are Men AI. Be helpful, friendly and answer in the language user speaks."
});

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
