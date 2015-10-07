/*jslint node: true, varstmt: false */
'use strict';
var http = require('http'),
    server = http.createServer(function (req, res) {
        res.writeHead(200, { 'Content-type': 'text/plain' });
        res.end('Hello World');
    });

server.listen(9999, 'localhost', function () {
    console.log('Server start. Listening on ' + server.address().address + ':' +
        server.address().port
    );
});

