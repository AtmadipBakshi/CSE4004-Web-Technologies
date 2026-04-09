const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    if (req.url === '/') {
        res.write('Welcome to the Home Page!');
    } else if (req.url === '/about') {
        res.write('This is the About Page');
    } else {
        res.write('Page Not Found');
    }
    res.end();
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});