let request = require('request');
let R = require('ramda');

function getJSON(url) {
    return new Promise(function(resolve, reject) {
        request(url, function(error, response, body) {
            var data = JSON.parse(body);
            if (error) {
                reject(new Error(error));
            }
            else {
                resolve(data);
            }
        })
    });
}


getJSON('http://universities.hipolabs.com/search?name=middle')
    .then(R.filter(university => university.country === "United States"))
    .then((country) => {console.log(country)})
