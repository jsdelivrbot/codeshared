let _ = require('lodash');

const Scheduler = (function() {
    const delayedFn = _.bind(setTimeout, undefined, _, _);
    return {
        delay5: _.partial(delayedFn, _, 5000),
        delay10: _.partial(delayedFn, _, 10000),
        delay: _.partial(delayedFn, _, _)
    };
})();

Scheduler.delay5(function() {
    console.log('Executing After 5 seconds!')
});
