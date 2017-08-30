let request = require('request');
let R = require('ramda');

var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
        const options = {
            url: url,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Charset': 'utf-8'
            }
        };

        request(options, function(error, response, body) {
            // console.log('Status:', response.statusCode);
            // console.log('Headers:', JSON.stringify(response.headers));
            // console.log('Response:', JSON.parse(body).data);
            var data = JSON.parse(body).data;
            if (error) {
                console.log('============ error =========');
                reject(new Error(error));
            } else {

                resolve(data.children);
            }

        });
    });
};


// getJSON('https://private-d7231-funethervn.apiary-mock.com/apartments');
getJSON('https://www.reddit.com/r/funny.json')
    .then(R.filter((s) => {
        console.log('----- s ------', s);
        s.data.likes === null
    }))
    .then((data) => {
        console.log("---------data---------", data);
    })