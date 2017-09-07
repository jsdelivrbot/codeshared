// A proxy lets you relay requests from one server/service to another.
//
// Create a server which listens on a port passed from the command line, takes any
// requests to the path /proxy and proxies them to http://localhost:65535/proxy.

"use strict";

var Hapi = require('hapi');
var server = new Hapi.Server();
var H2o2 = require('h2o2');
var Path = require('path');


server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

// register the plugin in the code in order to serve static files.
server.register(H2o2, (err) => {
    if (err) throw err;
});


// route definition
server.route([
    {
        path: '/proxy',
        method: 'GET',
        handler: {
            proxy: { // The proxy key can be used to generate a reverse proxy handler.
                host: '127.0.0.1',
                port: 65535
            }
        }
    }
]);


// start the server.
server.start(() => {
    console.log('Server running at: ', server.info.uri);
});
