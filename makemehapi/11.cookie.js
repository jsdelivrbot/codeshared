// Create a server that has a route configuration exposing an endpoint set-
// cookie and check-cookie which can be accessed using a 'GET' request.
// Specifically:

//     /set-cookie

// The set-cookie endpoint will set a cookie with the key 'session' and the value
// { key: 'makemehapi' }. The cookie should be base64json encoded, should
// expire in 10 ms, and have a domain scope of localhost.  The response is
// unimportant for this exercise, and may be anything you like.

//     /check-cookie

// The check-cookie endpoint will have cookies received from the /set-cookie
// endpoint. If the session key is present in cookies then simply return
// { user: 'hapi' }, otherwise return an unauthorized access error.


var Hapi = require('hapi');
var Boom = require('boom');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.state('session', {
    path: '/',
    encoding: 'base64json',
    ttl: 10,
    domain: 'localhost',
    isSameSite: false,
    isSecure: false,
    isHttpOnly: false
});

server.route({
    method: 'GET',
    path: '/set-cookie',
    handler: (request, reply) => {
        return reply({
            message : 'success'
        }).state('session', { key : 'makemehapi' });
    },
    config: {
        state: {
            parse: true,
            failAction: 'log'
        }
    }
});

server.route({
    method: 'GET',
    path: '/check-cookie',
    handler: (request, reply) => {
        var session = request.state.session;
        var result;

        if (session) {
            result = { user : 'hapi' };
        } else {
            result = Boom.unauthorized('Missing authentication');
        }

        reply(result);
    }
});

server.start((err) => {
    if (err) throw err;
});
