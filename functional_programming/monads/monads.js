const R = require('Ramda');
const Students = [{
        name: "Danny",
        ssn: "444-44-4444",
        address: "Wallstreet"
    },
    {
        name: "Ryan",
        ssn: "444-44-4498",
        address: "Bigben"
    }
]

class Wrapper {
    constructor(value) {
        this._value = value;
    }

    static of(a) {
        return new Wrapper(a);
    }

    map(f) {
        return Wrapper.of(f(this._value));
    }

    join() {

        if (! (this._value instanceof Wrapper) ) {
            return this;
        }

        return this._value.join();
    }

    toString() {
        return `Wrapper ${this._value}`;
    }
}

Wrapper.prototype.fMap = function(f) {
    return wrap(f(this._value));
}

let wrap = (value) => new Wrapper(value);

const findStudent = R.curry(function(db, ssn) {
    var student = R.filter((student) => {
        return student.ssn === ssn;
    }, db)[0];
    return Wrapper.of(student);
});

const getAddress = function(student) {
    return Wrapper.of(student.map(R.prop('address')));
};

const studentAddress = R.compose(
    getAddress,
    findStudent(Students)
);

console.log(studentAddress('444-44-4444'));
console.log(studentAddress('444-44-4444').join());
