const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// 🔴 यहाँ अपनी 'दूसरी Gmail वाली' नई चाबी पेस्ट करें
const genAI = new GoogleGenerativeAI("AIzaSyB9skv_Qw8Vxe9uh4VlR4_33m23yS-xls0");

// नए अकाउंट के लिए यह मॉडल सबसे बेस्ट है
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
        console.error("Error Details:", error);
        // अगर फिर भी एरर आया, तो यह मैसेज दिखेगा
        res.json({ reply: "Project Error: Google Cloud Project seems disabled." });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  
