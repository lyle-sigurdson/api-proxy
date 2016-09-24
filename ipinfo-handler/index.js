/*jshint node: true, varstmt: false */
'use strict';

var https = require ('https'),
    url = require('url'),
    ipinfoAccessToken = process.env.IPINFO_ACCESS_TOKEN;

module.exports = function (callerReq, callerRes) {
    var options = {
        hostname: 'ipinfo.io',
        path: '/' +
              (callerReq.headers['x-forwarded-for'] || '') +
              url.parse(callerReq.url).path.split('/')[2] +
              (ipinfoAccessToken ? '?token=' + ipinfoAccessToken : '')
    };

    https.get(options, function (endpointRes) {
        callerRes.setHeader(
            'content-type', endpointRes.headers['content-type']
        );
        endpointRes.pipe(callerRes);
    }).on('error', function (err) {
        callerRes.setHeader(
            'content-type', 'application/json; charset=utf-8'
        );

        callerRes.end(JSON.stringify({
            apiProxyError: true,
            name: 'ApiProxyError',
            message: 'api-proxy: ipinfo-handler: ' + err.message
        }));
    });
};
