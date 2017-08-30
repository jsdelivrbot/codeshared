var Hapi = require('hapi');
var server = new Hapi.Server();
var Inert = require('inert'); // serving static files and directories
var Path = require('path');
var Vision = require('vision');

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

// register the plugin in the code in order to serve static files.
server.register(Inert, (err) => {
    if (err) throw err;
});

server.register(Vision, (err) => {
    if (err) throw err;
});

// server.views() is the server method that we use to configure the templates
// used on our server. This method receives a configuration object in which we can
// set different engines based on file extension. This object can also set a
// directory path for your templates.
server.views({
    engines: {
        html: require('handlebars'),
    },
    path: Path.join(__dirname, 'templates')
});

// route definition
server.route([
    {
        path: '/foo/bar/baz/{filename}',
        method: 'GET',
        // You can declare handlers as objects instead of functions. The object must
        // contain one of the following: file (requires inert plugin), directory
        // (requires inert plugin), proxy (requires h2o2 plugin), or view (requires
        // vision plugin).
        handler: {
            directory: {
                listing: true,
                path: Path.join(__dirname, 'public')
            }
            //you'll need to provide an absolute path to an index.html file in your program's directory. To achieve this, //you'll probably need the path core module, its join() function, and the __dirname global variable.
        }
    },
    {
        path: '/',
        method: 'GET',
        handler: {
            view: 'index.html' // The view key can be used to define the template to be used to generate the response.
        }
    }
]);


// start the server.
server.start(() => {
    console.log('Server running at: ', server.info.uri);
});
