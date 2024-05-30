
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

const app = express();
const PORT = 4000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// User data (for demonstration purposes, replace with your actual user data)
let users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

// Login Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'));
});

// Signup Page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '/signup.html'));
});

// Login Authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        res.send('Login Successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});

// Signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send('Username already exists');
    }

    users.push({ username, password });
    res.send('Signup Successful');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
