const R = require('Ramda');
const Either = require('./Either');
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
];

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

        if (!(this._value instanceof Wrapper)) {
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

// console.log(studentAddress('444-44-4444'));
// console.log(studentAddress('444-44-4444').join());

const openSite = (currentUser) => {
    if (currentUser)
        return renderPage(currentUser);
    else
        return showLogin();
}

const openSiteFunctional = (currentUser) => {
    Either
        .fromNullable(currentUser)
        .fold(showLogin, renderPage);
}

function showLogin() {
    console.log("show login");
}

function renderPage(user) {
    console.log(`render user ${user}`);
}


// openSite("hoang");
// openSiteFunctional("hoang functional");
// openSite(undefined);
// openSite("");

const user = {
    premium: false,
    preferences: "Admin"
};

function defaultPrefs() {
    console.log("default");
}

function loadPref(pref) {
    console.log(`the preferences is ${pref}`);
}



const getPrefs = (user) => {
    if (user.premium) {
        return loadPref(user.preferences);
    } else {
        return defaultPrefs;
    }
}

const getPrefsFnc = (user) => {
    Either
        .fromNullable(user)
        .chain(user => user.premium && user.preferences ? Either.of(user.preferences) : Either.left(user))
        .fold(defaultPrefs, loadPref);
}


// getPrefsFnc(user);

const streetName = user => {
    const address = user.address;
    if (address) {
        const street = address.street;
        if (street) {
            return street.name;
        }
    }
    return "no street";
}


const streetNameFnc = (user) => {
    return Either.fromNullable(user)
        .chain(user => Either.fromNullable(user.address))
        .chain(street => Either.fromNullable(street.name))
        .getOrElse("no street")
}

const user1 = {
    address: {
        namea: 'truong sa'
    }
};

// streetNameFnc(user1);

const wrapExamples = (example) => {
    if (example.previewPath) {
        try {
            example.preview = fs.readFileSync(example.previewPath);
        } catch (e) {

        }
    }
    return example;
}

const readFile = x => Either.tryCatch(() => fs.readFileSync(x));
const wrapExamplesFnc = (file) => {
    Either.fromNullable(file)
        .chain(file => Either.fromNullable(file.previewPath))
        .chain(readFile)
        .fold(() => file, ex => Object.assign({ preview: p }, ex));
}