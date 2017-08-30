const fs = require('fs');
const Either = require('./either');

const liftA2 = (f, fx, fy) => {
    return fx.map(f).app(fy);
}

const $ = selector => Either.of({ selector, height: 10 });

const getScreenSize = screen => head => foot => screen - (head.height + foot.height);

const res = liftA2(getScreenSize(800), $('header'), $('footer'));

console.log("res === ", res);