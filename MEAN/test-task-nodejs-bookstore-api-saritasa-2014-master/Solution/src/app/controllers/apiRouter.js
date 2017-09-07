'use strict';
/*
  Routes for the shop API
*/
var appPath = '..';
var commons = require(appPath + '/commons');
var validators = require(appPath + '/commons/validators');
var http = require('http');
var Book = require(appPath + '/models/book');
var User = require(appPath + '/models/user');
var passport = commons.passport;
var assert = require('assert');

var apiRouter = commons.express.Router({
    caseSensitive: true,
    strict: true
});

if (commons.isDevelopment()) {
    // Turn on all ways of CORS. Use in development only,
    // for poroduction review all options to assure security.

    apiRouter.use('/', function(req, res, next) {
        var origin = req.headers.origin || '*';
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        next();
    });

    apiRouter.options('*', function(req, res, next) {
        var method = req.header('Access-Control-Request-Method');
        res.header('Access-Control-Allow-Methods', method); // For some browsers (chrome) wildstar is not enough.
        return res.end();
        // For every OPTIONS request answer: yes.
        // Don't check credentials or whatever, never response with 'Unauthorized' for protected resources.
    });
}

function jsonResponse(res, message) {
    if (arguments.length !== 2) {
        throw new Error('Wrong number of arguments.');
    }
    res.set('Content-Type', 'application/json; charset=utf-8'); // Express doesn't set charset by default.
    return res.json(message);
}

/*
  Use jsonError to report errors only: status must 4xx or 5xx.
  This is an uniform way to present client an error object or an error message.
*/
function jsonError(res, status, error) {
    assert(arguments.length >= 2, 'Wrong number of arguments.');
    assert(status >= 400, 'Not an erroneous status.');
    res.status(status);
    var msg = error || http.STATUS_CODES[res.statusCode];
    return jsonResponse(res, msg);
}

function jsonUnauthorized(res, error) {
    return jsonError(res, 401, error); // Unauthorized.
}

function jsonBadRequest(res, error) {
    return jsonError(res, 400, error); // Bad Request.
}

apiRouter.get('/', function(req, res, next) {
    return jsonResponse(res, 'Welcome to a bookstore -- we are closed! Yep.');
});

// Authentication routes

// Passport configuration BEGIN.

// `passportOptions` is used in two cases:
//    * As a storage for fields name.
//    * As authenticateOptions passed to `passport.authenticate`.
var passportOptions = {
    usernameField: 'email',
    passwordField: 'password',
    badRequestMessage: '', // Used by `LocalStrategy` when fields parsing fails.
};

var msg = 'Couldn\'t find ' + passportOptions.usernameField +
    ' and ' + passportOptions.passwordField + ' fields in your request.' +
    ' Check these fields are submitted and `Content-Type` header is `x-www-form-urlencoded`.';

passportOptions.badRequestMessage = msg;


var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(
    function(user, done) {
        done(null, user.id);
    }
);

passport.deserializeUser(
    function(id, done) {
        User.findById(
            id,
            function(err, user) {
                done(err, user);
            }
        );
    }
);

passport.use(
    'local-signup',
    new LocalStrategy({
            usernameField: passportOptions.usernameField,
            passwordField: passportOptions.passwordField,
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            // User.findOne wont fire unless data is sent back.
            process.nextTick(
                function() {
                    User.findOne({ 'local.email': email },
                        function(err, user) {
                            if (err) {
                                return done(err);
                            }
                            if (user) {
                                return done(null, false, { message: 'This email (\'' + email + '\') is already taken.' });
                            } else {
                                var newUser = new User();
                                newUser.local.email = email;
                                newUser.local.password = newUser.generateHash(password);
                                newUser.save(
                                    function(err) {
                                        if (err) {
                                            return done(err);
                                        }
                                        return done(null, newUser);
                                    }
                                );
                            }
                        }
                    );
                }
            );
        }
    )
);

passport.use(
    'local-login',
    new LocalStrategy({
            usernameField: passportOptions.usernameField,
            passwordField: passportOptions.passwordField,
            passReqToCallback: true
        },
        function(req, email, password, done) {
            User.findOne({ 'local.email': email },
                function(err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, { message: 'No user with email \'' + email + '\' found.' });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, { message: 'Wrong password.' });
                    }
                    return done(null, user);
                }
            );
        }
    )
);

// Passport configuration END.

/*

*/
function jsonAuthFailed(res, authInfo, authStatus) {
    if (authStatus) {
        return jsonError(res, authStatus, authInfo);
    }
    if (authInfo instanceof Error && authInfo.name === 'BadRequestError') {
        return jsonBadRequest(res, authInfo);
    }
    return jsonUnauthorized(res, authInfo);
}

apiRouter.route('/signup')

.get(
    function(req, res, next) {
        return jsonResponse(res, 'To sign up as a new user POST email and password.');
    }
)

.post(
    function(req, res, next) {
        passport.authenticate(
            'local-signup',
            passportOptions,
            function(err, user, authInfo, authStatus) {
                /*
                  If username and passowrd fields failed to be parsed --
                    f(null, false, badRequestError) [old local strategy] is called
                  where badRequestError is an object defined by `LocalStrategy` which can't be overidden in constructor
                  or
                    f(null, false, {message:...}, status) [new local strategy] is called
                  where status is 400 (BadRequest).            
                  In both cases (error) message could be altered via authenticateOptions.badRequestMessage.
                  
                  The reason to have this custom callback insted of the default one:
                    * All API responses, positive or errors, must be of type application/json in unicode.
                    * All errors, including auth errors, must be presented to a client in a uniform consistent way.

                  Speaking of actually this callback:
                    1. `authenticateOptions.failWithError` could be set to true.
                        AuthenticationError would be thrown on auth failure.
                    2. 'AuthenticationError' could be handled in errorHandleMw and displayed to a client.
                    3. `authenticateOptions.options.successRedirect` could be set to './login'.
                    The problem is:
                      Currently AuthenticationError has default non-informative status message,
                      informative message is put in 'WWW-Authenticate' header. So, you have to
                      fetch it and display to a client in a uniform way. It doesn't woth it.
                */
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return jsonAuthFailed(res, authInfo, authStatus);
                }
                // Serialize user to session via call to login.
                return req.login(
                    user,
                    function(err) {
                        if (err) {
                            return next(err);
                        }
                        return res.redirect('./login');
                    }
                );
            }
        )(req, res, next);
    }
)

;

function informLoggedInAlreadyMw(req, res, next) {
    if (req.isAuthenticated()) {
        return jsonResponse(res, 'You are logged in as ' + req.user.local.email);
    }
    next();
}

apiRouter.route('/login')
    .get(
        informLoggedInAlreadyMw,
        function(req, res) {
            return jsonResponse(res, 'You are not authtenticated. POST email and password to login.');
        }
    )
    .post(
        function(req, res, next) {
            passport.authenticate(
                'local-login',
                passportOptions,
                function(err, user, authInfo, authStatus) {
                    if (err) {
                        return next(err);
                    }
                    if (!user) {
                        return jsonAuthFailed(res, authInfo, authStatus);
                    }
                    // Serialize user to session via call to login.
                    return req.login(
                        user,
                        function(err) {
                            if (err) {
                                return next(err);
                            }
                            return jsonResponse(res, 'Login successful.');
                        }
                    );
                }
            )(req, res, next);
        }
    );

// Routes for protected resources

function loginRequiredMw(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    return jsonUnauthorized(res);
}

apiRouter.get('/logout',
    function(req, res, next) {
        req.logout();
        return jsonResponse(res, 'Logged out.');
    }
);

// Item managing routes

/*
  `safeErrors` are those that can be represented to a client
  without any risk to reveal any secret information.
  There should be a protocol on how to present an error on
  which client software could rely.
  Current protocol is not reliable:
    * `message` is the same for any dismissed request.
    * `errorObject` depends on the underlying layers not controled by
      this api.
    * `errorObjectMessage` is used to fetch non-iterable `message`
      property (which is mostly private and again not controled).
  But it may still be informative for human clients.
*/
function ifResponsedWithSafeError(res, err) {
    var safeErrors = ['CastError', 'ValidationError', 'ClientError'];

    function isSafe(err) {
        return safeErrors.indexOf(err.name) + 1; }
    if (err instanceof Error && isSafe(err)) {
        jsonBadRequest(res, {
            message: 'Your query is malformed. Check required request arguments are present and their values are correct.',
            errorObject: err,
            errorObjectMessage: err.message,
        });
        return true;
    }
    return false;
}

apiRouter.route('/books')

.all(loginRequiredMw)

/*
.post(
  // TODO: This feature is not neccessary and should be removed. It is still here 'cause I feel there should be a method for creating new books.
  function(req, res, next) {
    
    var book = new Book();
    book.desc = req.body.bookDesc;
    book.id = req.body.bookId;
    book.name = req.body.bookName;
    book.picture = req.body.bookPicture;
    book.price = req.body.bookPrice;

    book.save(
      function(err) {
        if (err) {
          return next(err);
        }
        return jsonResponse(res, 'Book created. Enjoy!');
      }
    );
    
  }
)
*/

.get(
    function allowPaginationMw(req, res, next) {
        var page = req.query.page || 0;
        var limit = req.query.limit || 10;
        var pl = [
            Number(page),
            Number(limit)
        ];
        var ifNotValid = pl.some(
            function(element) {
                return !(
                    validators.validateInteger(element) && element >= 0
                );
            }
        );
        if (!ifNotValid) {
            page = pl[0];
            limit = pl[1];
        } else {
            var err = new Error('page (' + page + ') and limit (' + limit + ') parameters must be non-negative integers.');
            err.name = 'ClientError';
            return next(err);
        }

        res.locals.pagination = {
            page: page,
            limit: limit
        };
        return next();
    },
    function(req, res, next) {

        var p = res.locals.pagination;
        var page = p.page;
        var limit = p.limit;
        var skip = page * limit;

        Book.find({}, // conditions
            null, // fields
            {
                skip: skip,
                limit: limit,
                sort: { id: 'asc' },
            },
            function(err, books) {
                if (err) {
                    return next(err);
                }
                return jsonResponse(res, books);
            }
        );
    }
)

;

apiRouter.route('/books/:bookId')

.all(loginRequiredMw)

.get(
    function(req, res, next) {
        Book.findOne({ 'id': req.params.bookId },
            function(err, book) {
                if (err) {
                    return next(err);
                }
                return jsonResponse(res, book);
            }
        );
    }
)

.put(function(req, res, next) {
    Book.findOne({ id: req.params.bookId },
        function(err, book) {

            if (err) {
                return next(err);
            }

            if (!book) {
                return jsonResponse(res, 'Book with id "' + req.params.bookId + '" wasn\'t found.');
            }

            book.desc = req.body.bookDesc;
            book.name = req.body.bookName;
            book.picture = req.body.bookPicture;
            book.price = req.body.bookPrice;

            book.save(
                function(err) {
                    if (err) {
                        return next(err);
                    }
                    return jsonResponse(res, 'Book updated.');
                }
            );

        }
    );
})

.delete(function(req, res, next) {
    Book.remove({ id: req.params.bookId },
        function(err, book) {
            if (err) {
                return next(err);
            }
            return jsonResponse(res, 'Book deleted'); // Feature: Removing unexisting books works the same.
        }
    );
});

if (commons.isDevelopment()) {
    apiRouter.route('/error').get(
        function(req, res, next) {
            var err = new Error('This is a custom Error generated for testing purposes.');
            next(err);
        }
    );
}

function NotFoundError() {
    var tmp = Error.apply(this, arguments);
    this.message = tmp.message;
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
}
require('util').inherits(NotFoundError, Error);

apiRouter.use(
    function(req, res, next) {
        if (!res.finished) {
            // Nobody responed. Instead of leaving a client waiting for a response - set it firm 404.
            var r = req.method + ' ' + req.originalUrl;
            var err = new NotFoundError('Your request [ ' + r + ' ] doesn\'t meet any API handler provided.' +
                ' Please, look up docs/sources of this API and make sure method, url and' +
                ' required parameters are present.');
            return next(err);
        }
        return next();
    }
);

apiRouter.use(
    function errorHandlerMw(err, req, res, next) {
        if (err instanceof NotFoundError) {
            return jsonError(res, 404, err.message);
        }
        if (ifResponsedWithSafeError(res, err)) {
            return; }
        // Could be done: Send email to a responsible developer.
        jsonError(res, 500, 'Internal Server Error. You may contanct an administrator if you have issues with this error.');
        console.error(err.stack);
    }
);

module.exports = apiRouter;
