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
        return val ? Either.right(val) : Either.left(val);

    }
    static of(a) {
        return Either.right(a);
    }
    fold(f, g) {}
    static tryCatch(f) {
        try {
            return right(f());
        } catch (error) {
            return left("");
        }
    }
}

class Left extends Either {
    map(f) {
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
    fold(f, g) {
        return f();
    }
    app(other) {
        return this;
    }
    toString() {
        return `Either.Left(${this.value})`;
    }
}

class Right extends Either {
    map(f) {
        console.log(f);
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
    fold(f, g) {
        return g(this.value);
    }
    app(other) {
        return other.map(this.value);
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


module.exports = Either;