const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

let users = [];

app.use(bodyParser.json());
app.use(cors());

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
});

// CRUD Operations
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json(newUser);
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    users = users.map(user => (user.id === userId ? { ...user, ...updatedUser } : user));
    res.json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    users = users.filter(user => user.id !== userId);
    res.json({ message: 'User deleted successfully' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
x