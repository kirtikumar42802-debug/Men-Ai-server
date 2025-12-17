const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// हमें 'fetch' चाहिए ताकि हम सीधे Google से पूछ सकें
const fetch = require('node-fetch'); 

const app = express();
const port = 3000;

// 🔴 यहाँ अपनी सही वाली चाबी पेस्ट करें
const API_KEY = "AIzaSyDPsmUbLEj3VMcrsu3Dr7mAKM4JilUGmHg";

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/chat', async (req, res) => {
    try {
        // यह कोड Google से पूछेगा: "मेरे लिए कौन से मॉडल खुले हैं?"
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            // अगर चाबी या प्रोजेक्ट में गलती है, तो यह बताएगा
            res.json({ reply: "GOOGLE ERROR: " + JSON.stringify(data.error) });
        } else {
            // अगर सब सही है, तो यह मॉडल्स की लिस्ट दिखाएगा
            const modelNames = data.models.map(m => m.name).join("\n");
            res.json({ reply: "Available Models:\n" + modelNames });
        }
    } catch (error) {
        res.json({ reply: "Server Error: " + error.message });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
