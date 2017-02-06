// Basic Authentication is a simple way to protect access to your application using
// only a username and password. There is no need for cookies or sessions, only a
// standard HTTP header.

// Create a hapi server that listens on a port passed from the command line and is
// protected with Basic Authentication. The authentication username should be
// "hapi" and the password "auth" and the server should respond with an HTTP 401
// status code when authentication fails.



const Hapi = require('hapi');
const Boom = require('boom');
const hapiAuthBasic = require('hapi-auth-basic');

var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

// a user lookup and password validation function with the signature function(request, username, password, callback)
const validate = (request, username, password, callback) => {
    let isValid;
    console.log("Authenticate beginn");
    if (username && username === 'hapi' && password && password === 'auth') {
        isValid = true;
    } else {
        isValid = false;
    }

    return callback(null, isValid, {
        name: 'hapi'
    });
}

server.register(
    [
        hapiAuthBasic
    ],
    (err) => {
        if (err) throw err;

        // configure a 'simple' authentication strategy for basic
        server.auth.strategy('simple', 'basic', {
            validateFunc: validate
        });

        server.route({
            method: 'GET',
            path: '/',
            config: {
                auth: 'simple',
                handler: (request, reply) => {
                    reply("hello ");
                }
            }
        });
    });



server.start((err) => {
    if (err) throw err;
    console.log("server running");
});