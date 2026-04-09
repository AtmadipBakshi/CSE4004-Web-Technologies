const fs = require('fs');
fs.writeFile('example.txt', 'Hello, this is Node.js file handling!', (err) => {
    if (err) throw err;
    console.log('File created successfully.');
    fs.readFile('example.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log('File content:', data);
        fs.appendFile('example.txt', '\nAppended content!', (err) => {
            if (err) throw err;
            console.log('Data appended.');
            fs.unlink('example.txt', (err) => {
                if (err) throw err;
                console.log('File deleted successfully.');
            });
        });
    });
});