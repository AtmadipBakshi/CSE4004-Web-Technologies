const express = require('express');
const app = express();

// Global middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next();
});

// Route-level middleware
const checkAuth = (req, res, next) => {
    console.log("Auth middleware executed");
    next();
};

app.get('/', (req, res) => {
    res.send("Home Page");
});

app.get('/protected', checkAuth, (req, res) => {
    res.send("Protected Route");
});

app.listen(3001, () => {
    console.log("Middleware server running on port 3001");
});