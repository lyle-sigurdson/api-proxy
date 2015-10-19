/*jshint node: true, varstmt: false */
'use strict';

var http = require('http'),
    url = require('url');

module.exports = function (callerReq, callerRes) {
    var options = {
        hostname: 'ipinfo.io',
        path: '/' + url.parse(callerReq.url).path.split('/')[2]
    };

    http.get(options, function (endpointRes) {
        callerRes.setHeader(
            'content-type', endpointRes.headers['content-type']
        );
        endpointRes.pipe(callerRes);
    }).on('error', function (err) {
        callerRes.end(JSON.stringify({ apiProxyError: err }));
    });
};
