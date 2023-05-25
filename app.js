require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const message = req.body.prompt;
    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: message
            }
        ]
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data.choices[0].message.content);  // Updated this line
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
