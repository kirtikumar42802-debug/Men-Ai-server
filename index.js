const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3000;

// Replit या Render के Secret से चाबी निकालना
// अगर Render पर Environment Variable सेट नहीं किया तो यह काम नहीं करेगा
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are Men AI, a helpful, friendly and smart AI assistant created by JTK. Always answer in the language the user speaks."
});

app.use(bodyParser.json());
app.use(express.static(__dirname)); // यह लाइन HTML फाइल को सर्व करेगी

// होमपेज
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// चैट करने का असली रास्ता (API Endpoint)
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error(error);
        res.json({ reply: "Sorry, Server Error. Please check API Key." });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
