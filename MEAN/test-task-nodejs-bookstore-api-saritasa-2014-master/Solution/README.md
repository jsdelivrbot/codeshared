Install
-------

`npm install`


Launch
------

First, make sure mongodb is running.
Then: `node server.js`.
Running `grunt` will first check sources to comply to the code style
and then will launch the server.


Environment
-----------
```javascript
NODE_ENV=
  'development' or undefined
    CORS is allowed.
  'production'
    CORS is prohibited.
```

By default the environment is 'development'.
```javascript
NODE_DB='mongodb://some_host/some_db'
SESSION_SECRET='secret to encrypt http sessions'
```

Testing
-------

You can use 'tests/api_test_page' for human testing
of common API requests. This page won't work in
production env for CORS is disabled.

You can also use Postman or other chrome extension
which works in production env 'cause chrome doesn't
restrict CORS for extensions with appropriate
permissions.


Directory Structure
-------------------
```shell
./  
+-- .jshintrc // Defines code style specification for the project as a set of rules for `jshint` lint-tool.  
+-- configs   // Application configurations  
¦   +-- database.js   // Config the url of your mongodb.  
¦   L-- httpServer.js // Config server, port and session secret.  
+-- Gruntfile.js // Configure tasks for 'Grunt: The JavaScript Task Runner'. Used in development for automatization the same way as makefiles.  
+-- package.json  
+-- README.txt  
+-- server.js // Launch an http server and the whole application.  
L-- src  
    +-- app  
    ¦   +-- commons // Commonly used variables and functions. (like 'util' module in some libraries)  
    ¦   ¦   +-- index.js  
    ¦   ¦   L-- validators.js // Validators are used in models and for serving api requests.  
    ¦   +-- controllers // Controllers are functioins that handle client requests ('GET url', f.e.). Express routes are used in implementation.  
    ¦   ¦   L-- api.js // REST-like API router for the bookstore.  
    ¦   +-- models  
    ¦   ¦   +-- book.js  
    ¦   ¦   L-- user.js  
    ¦   L-- views // Currently the folder has no views as all responses to the API are plain json objects.  
    L-- tests  
        +-- api_test_page // Used for human-driven testing of the API.  
        ¦   L-- ...  
        +-- data_fixture  
        ¦   L-- price.json // Fixture used to set the DB's state before testing the API.  
        L-- db_populate_from_data_fixture.js // Script to set the DB's state from 'price.json'.  
```
