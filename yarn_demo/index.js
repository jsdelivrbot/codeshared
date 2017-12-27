let Rx = require('rxjs');

let source = Rx.Observable.create(
    function subscribe(observer) {
        observer.next(4);

        observer.complete();

        return function unsubscribe() {
            console.log("unsubcribe");
        }
    }
);

let ob = source.subscribe(
    (value) => {
        console.log(`this value is ${value}`);
    },
    (e) => {
        console.log(`error`);
    },
    () => {
        console.log(`complete`);
    }
);

setTimeout(function() {
    ob.unsubscribe();
}, 3000);
