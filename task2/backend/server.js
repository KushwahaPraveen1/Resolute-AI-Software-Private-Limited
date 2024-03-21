const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

let forms = [];

app.use(bodyParser.json());
app.use(cors());

// Get all forms
app.get('/forms', (req, res) => {
    res.json(forms);
});

// Create a new form
app.post('/forms', (req, res) => {
    const newForm = req.body;
    forms.push(newForm);
    res.json(newForm);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
