/*jslint node: true, varstmt: false */
'use strict';

var http = require('http'),
    nodeSimpleRouter = require('node-simple-router'),
    router = nodeSimpleRouter(),
    server = http.createServer(router),
    foursquareHandler = require('./foursquare-handler');

router.get('/foursquare-venues', foursquareHandler);

server.listen(9999, 'localhost', function () {
    console.log('Server start. Listening on ' + server.address().address + ':' +
        server.address().port
    );
});
