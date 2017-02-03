// Create a server which responds to requests to /?name=Helping&suffix=! using the template.

let Hapi   = require('hapi');
let Vision = require('vision');
let Path   = require('path');

let server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

server.register(Vision, (err) => {
    if(err) throw err;
});

server.route({
    path: '/',
    method: 'GET',
    handler: {
        view: 'index.html'
    }
});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'templates'),
    helpersPath: Path.join(__dirname, 'helpers') 
    // Helpers are functions used within templates to perform transformations and other
    // data manipulations using the template context or other inputs.
});

server.start(() => {
    console.log('Serer running at: ', server.info.uri);
});