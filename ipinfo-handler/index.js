/*jshint node: true, varstmt: false */
'use strict';

var https = require('https'),
    url = require('url'),
    ipinfoAccessToken = process.env.IPINFO_ACCESS_TOKEN;

if (!ipinfoAccessToken) {
    throw new Error('IPINFO_ACCESS_TOKEN must be set');
}

module.exports = function (callerReq, callerRes) {
    var options = {
        hostname: 'ipinfo.io',
        path: '/' + url.parse(callerReq.url).path.split('/')[2] +
              '?token=' + ipinfoAccessToken
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
