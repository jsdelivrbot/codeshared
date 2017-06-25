const R = require('ramda');

let printNameAndAge = R.curry(function(name, age) {
    console.log("hello");
    console.log(`My name is: ${name} and my age is ${age}`);
});

let getNameAndAge = R.curry(function(name, age) {
    console.log(`My name is: ${name} and my age is ${age}`);
    return name;
});

let printPeople = R.compose(
    printNameAndAge,
    getNameAndAge
);
printPeople('Ryan', 21)(22);