var Hapi = require('hapi');
var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

// route definition
server.route({
    path: '/',
    method: 'GET',
    handler: handlerFnc
});

// router handle
function handlerFnc(request, reply) {
    reply('Hello hapi');
}

// start the server.
server.start(() => {
    console.log('Server running at: ', server.info.uri);
});
