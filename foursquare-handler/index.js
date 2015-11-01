/*jshint node: true, varstmt: false */
'use strict';

var url = require('url'),
    https = require('https');

var credentialsQuery = '&client_id=' + process.env.FS_CLIENT_ID +
    '&client_secret=' + process.env.FS_CLIENT_SECRET;

if (!(process.env.FS_CLIENT_ID && process.env.FS_CLIENT_SECRET)) {
    throw new Error('FS_CLIENT_ID and FS_CLIENT_SECRET must be set');
}

module.exports = function (callerReq, callerRes) {
    var options = {
        hostname: 'api.foursquare.com',
        path: '/v2/venues/search?' + url.parse(callerReq.url).query +
            credentialsQuery
    };

    https.get(options, function (endpointRes) {
        callerRes.setHeader(
            'content-type', endpointRes.headers['content-type']
        );
        endpointRes.pipe(callerRes);
    }).on('error', function (err) {
        callerRes.end(JSON.stringify({ apiProxyError: err }));
    });
};
