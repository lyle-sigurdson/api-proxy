/*jshint node: true, varstmt: false */
'use strict';

var url = require('url'),
    https = require('https');

var credentialsQuery = '&client_id=' + process.env.FS_CLIENT_ID +
    '&client_secret=' + process.env.FS_CLIENT_SECRET;

module.exports = function (callerReq, callerRes) {
    var options = {
        hostname: 'api.foursquare.com',
        path: '/v2/venues/search?' + url.parse(callerReq.url).query +
            credentialsQuery
    };

    callerRes.setHeader('Content-Type', 'application/json');

    https.get(options, function (endpointRes) {
        endpointRes.pipe(callerRes);
    }).on('error', function (err) {
        callerRes.end(JSON.stringify({ apiProxyError: err }));
    });
};
