const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 नीचे " " के बीच में अपनी नयी वाली API Key पेस्ट करें
const genAI = new GoogleGenerativeAI("AIzaSyCVXmAaEYegX-zUk1TKvBdlsowKEVwO9RA");

// हमने यहाँ सबसे सुरक्षित मॉडल 'gemini-pro' कर दिया है
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
        console.error("Error:", error); // यह असली एरर दिखाएगा
        res.json({ reply: "Connection Error. Please try again." });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
