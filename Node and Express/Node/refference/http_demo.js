const http = require('http');

//Creating server object.
http
    .createServer((req, res) => {
        // Server response
        res.write('Hellow world');
        res.end();
    })
    .listen(5000, () => console.log('Server running...'));