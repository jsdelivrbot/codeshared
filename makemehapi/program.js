// Create a server which responds to requests to /?name=Helping&suffix=! using the template.

const Hapi = require('hapi');
const Vision = require('vision');
const H2o2 = require('h2o2');
const Path = require('path');
const fs = require('fs');
const inert = require('inert'); // serves static files and also required for tv
const Tv = require('tv'); // debug console
const Joi = require('joi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 8080)
});

const TvOptions = {
    endpoint: '/debug/console',
    queryKey: 'debug'
};

server.register(
    [
        Vision,
        inert,
        {
            register: Tv,
            options: TvOptions
        }
    ],
    (err) => {

        if (err) {
            throw err;
        }

        server.start(() => {
            console.log('------------------ Serer running at: ', server.info.uri + " ------------------");
        });
    }
);

server.route([{
    path: '/chickens/{breed}',
    method: 'GET',
    handler: handlerFnc,
    config: {
        validate: {
            params: {
                breed: Joi.string().required()
            }
        }
    }
},
{
    path: '/login',
    method: 'POST',
    handler: (request, reply) => {
        reply(null, 'login successful');
    },
    // config: {
    //     validate: {
    //         payload: Joi.object({
    //             username: Joi.string(),
    //             password: Joi.string().alphanum(),
    //             accessToken: Joi.string.alphanum(),
    //             birthyear: Joi.number().integer().min(1900).max(2013),
    //             email: Joi.string().email()
    //         })
    //         .options({})
    //     }
    // }
}
]);

function handlerFnc(request, reply) {
    reply(null, 'Hello');
}