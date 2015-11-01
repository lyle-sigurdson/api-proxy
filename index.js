/*jslint node: true, varstmt: false */
'use strict';

var http = require('http'),
    nodeSimpleRouter = require('node-simple-router'),
    router = nodeSimpleRouter(),
    server = http.createServer(router),
    foursquareHandler = require('./foursquare-handler'),
    ipinfoHandler = require('./ipinfo-handler');

if (!process.env.API_PROXY_PORT) {
    throw new Error('API_PROXY_PORT must be set');
}

router.get('/foursquare-venues', foursquareHandler);

router.get(/^\/ipinfo/, ipinfoHandler);

server.listen(process.env.API_PROXY_PORT, 'localhost', function () {
    console.log('Server start. Listening on ' + server.address().address + ':' +
        server.address().port
    );
});
