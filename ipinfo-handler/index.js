/*jshint node: true, varstmt: false */
'use strict';

var argv = require('minimist')(process.argv.slice(2)),
    secure = !argv.insecure,
    protocol = secure ? require ('https') : require('http'),
    url = require('url'),
    ipinfoAccessToken = process.env.IPINFO_ACCESS_TOKEN;

if (secure && !ipinfoAccessToken) {
    throw new Error('IPINFO_ACCESS_TOKEN must be set');
}

module.exports = function (callerReq, callerRes) {
    var options = {
        hostname: 'ipinfo.io',
        path: '/' +
              (callerReq.headers['x-forwarded-for'] || '') +
              url.parse(callerReq.url).path.split('/')[2] +
              (secure ? '?token=' + ipinfoAccessToken : '')
    };

    protocol.get(options, function (endpointRes) {
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
