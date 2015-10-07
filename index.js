/*jslint node: true, varstmt: false */
'use strict';

var url = require('url'),
    http = require('http'),
    https = require('https'),
    nodeSimpleRouter = require('node-simple-router'),
    router = nodeSimpleRouter(),
    server = http.createServer(router);

var credentialsQuery = '&client_id=' + process.env.FS_CLIENT_ID +
    '&client_secret=' + process.env.FS_CLIENT_SECRET;

router.get('/foursquare-venues', function (callerReq, callerRes) {
    var options = {
        hostname: 'api.fsdfsoursquare.com',
        path: '/v2/venues/search?' + url.parse(callerReq.url).query +
            credentialsQuery
    };

    callerRes.setHeader('Content-Type', 'application/json');

    https.get(options, function (endpointRes) {
        endpointRes.on('data', function (data) {
            callerRes.end(data);
        });
    }).on('error', function (err) {
        callerRes.end(JSON.stringify(err));
    });
});

server.listen(9999, 'localhost', function () {
    console.log('Server start. Listening on ' + server.address().address + ':' +
        server.address().port
    );
});
