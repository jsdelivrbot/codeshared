// The endpoint will accept following payload variables:

// isGuest       (boolean)
// username      (string)
// accessToken   (alphanumeric)
// password      (alphanumeric)

// Validation should consist of following conditions:

// i)   if isGuest is false, a username is required.
// ii)  password cannot appear together with accessToken.
// iii) if any other parameters than specified above are sent, they should pass the validation.

// If the validation is successful, the handler must return a text of login successful

const Hapi = require('hapi');
const Vision = require('vision');
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
        config: {
            validate: {
                payload: Joi.object({
                        username: Joi.string().when('isGuest', {
                            is: false,
                            then: Joi.required()
                        }),
                        password: Joi.string().alphanum(),
                        accessToken: Joi.string().alphanum(),
                        isGuest: Joi.boolean().required()
                    })
                    .options({
                        allowUnknown: true
                    })
                    .without('password', 'accessToken')
            }
        }
    }
]);

function handlerFnc(request, reply) {
    reply(null, 'Hello');
}