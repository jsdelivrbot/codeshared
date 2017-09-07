var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.route({
    path: '/{name}',
    method: 'GET',
    handler: handler
});

function handler(request, reply) {
    reply('Hello ' + encodeURIComponent(request.params.name));
    // for security encodeURIComponent escapes all characters except the following: alphabetic, decimal digits, - _ . ! ~ * // '( )
}

server.start(() => {
    console.log('Server is running at port ', server.info.uri);
});
