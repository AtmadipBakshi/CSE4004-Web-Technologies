const express = require('express');
const app = express();

app.use(express.json());

// Dummy data
let users = [
    { id: 1, name: "Atmadip" },
    { id: 2, name: "User2" }
];

// GET
app.get('/users', (req, res) => {
    res.json(users);
});

// POST
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, name: req.body.name };
    users.push(newUser);
    res.json(newUser);
});

// PUT
app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (user) {
        user.name = req.body.name;
        res.json(user);
    } else {
        res.status(404).send("User not found");
    }
});

// DELETE
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.send("User deleted");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});