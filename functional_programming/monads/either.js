class Either {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value;
    }
    static left(a) {
        return new Left(a);
    }

    static right(a) {
        return new Right(a);
    }

    static fromNullable(val) {
        return val !== null ? right(val) : left(val);

    }
    static of(a) {
        return right(a);
    }
}

class Left extends Either {
    map(_) {
        return this; // noop
    }
    get value() {
        throw new TypeError('Can"t extract the value of a Left(a).');

    }

    getOrElse(other) {
        return other;
    }
    orElse(f) {
        return f(this.value);
    }
    chain(f) {
        return this;
    }
    getOrElseThrow(a) {
        throw new Error(a);
    }
    filter(f) {
        return this;
    }
    toString() {
        return `Either.Left(${this.value})`;
    }
}

class Right extends Either {
    map(f) {
        return Either.of(f(this.value));

    }

    getOrElse(other) {
        return this.value;
    }

    orElse() {
        return this;
    }
    chain(f) {
        return f(this.value);
    }

    getOrElseThrow(_) {
        return this.value;
    }

    filter(f) {
        return Either.fromNullable(f(this.value) ? this.value : null);
    }
    toString() {
        return `Either.Right(${this.value})`;
    }
}

const R = require('ramda');

const validLength = R.curry((len, str) => str.length === len)

const checkLengthSSN = function(ssn) {
    return Either.fromNullable(ssn).filter(validLength(9)).getOrElseThrow(`Input: ${ssn} is not a valid SSN number`);
}