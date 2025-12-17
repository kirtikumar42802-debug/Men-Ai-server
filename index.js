const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 अपनी API Key यहाँ नीचे पेस्ट करें
const genAI = new GoogleGenerativeAI("AIzaSyCVXmAaEYegX-zUk1TKvBdlsowKEVwO9RA");

// हम सबसे नया मॉडल यूज़ कर रहे हैं
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        // 🔴 यह लाइन अब आपको असली एरर बताएगी
        console.error("Error:", error);
        res.json({ reply: "System Error: " + error.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
