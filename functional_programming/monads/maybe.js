const R = require('ramda');

class Maybe {

    static just(a) {
        return new Just(a);
    }

    static nothing() {
        return new Nothing();
    }

    static fromNullable(a) {
        if (a === null || a === undefined) {
            return Maybe.nothing();
        } else {
            return Maybe.just(a);
        }
    }

    static of(a) {
        return Maybe.just(a);
    }

    static isNothing() {
        return false;
    }

    get isJust() {
        return false;
    }
}

class Just extends Maybe {

    constructor(value) {
        super();
        this._value = value;
    }

    get value() {
        return this._value;
    }

    map(f) {
        return Maybe.of(f(this._value));
    }

    getOrElse() {
        return this._value;
    }

    filter(f) {
        Maybe.fromNullable(f(this._value) ? this._value : null);
    }

    get isJust() {
        return true;
    }

    toString() {
        return `Maybe.Just ${this._value}`;
    }
}

class Nothing extends Maybe {
    map(f) {
        return this;
    }

    get value() {
        throw new TypeError('Cant extrect the value of a Nothing');
    }

    getOrElse(other) {
        return other;
    }

    filter() {
        return this.value;
    }

    get isNothing() {
        return true;
    }

    toString() {
        return 'Maybe.Nothing';
    }
}

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

const findStudent = R.curry(function(db, ssn) {
    var student = R.filter((student) => {
        return student.ssn === ssn;
    }, db)[0];

    return Maybe.fromNullable(student);
});

const getAddress = function(student) {
    return student.map(R.prop('address'));
};

const studentAddress = R.compose(
    getAddress,
    findStudent(Students)
);

console.log(studentAddress('444-44-4444'));
console.log(studentAddress('444-44-4443'));