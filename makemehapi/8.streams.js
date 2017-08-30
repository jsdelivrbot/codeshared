// Create a server which responds to requests to /?name=Helping&suffix=! using the template.

let Hapi   = require('hapi');
let Vision = require('vision');
let H2o2 = require('h2o2');
let Path   = require('path');
let fs = require('fs');
let rot13 = require("rot13-transform");

let server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Vision, (err) => {
    if(err) throw err;
});

server.register(H2o2, (err) => {
    if (err) throw err;
})

server.route({
    path: '/',
    method: 'GET',
    handler: handlerFnc
});

function handlerFnc(request, reply) {
    let fileStream = fs.createReadStream(Path.join(__dirname, './resources/text.txt'));

    reply(null, fileStream.pipe(rot13()));
}

server.start(() => {
    console.log('Serer running at: ', server.info.uri);
});

