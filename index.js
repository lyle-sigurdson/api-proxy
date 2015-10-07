/*jslint node: true, varstmt: false */
'use strict';

var http = require('http'),
    nodeSimpleRouter = require('node-simple-router'),
    router = nodeSimpleRouter(),
    server = http.createServer(router),
    foursquareHandler = require('./foursquare-handler'),
    ipinfoHandler = require('./ipinfo-handler');

// Note FS_CLIENT_ID and FS_CLIENT_SECRET environment variables must be set for
// the Foursquare venues endpoint to work.
router.get('/foursquare-venues', foursquareHandler);

router.get(/^\/ipinfo/, ipinfoHandler);

server.listen(process.env.PORT, 'localhost', function () {
    console.log('Server start. Listening on ' + server.address().address + ':' +
        server.address().port
    );
});
