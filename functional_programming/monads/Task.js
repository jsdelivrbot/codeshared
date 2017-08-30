const LazyBox = g =>
    ({
        fold: f => f(g()),
        map: f => LazyBox(() => f(g()))
    });


module.exports = LazyBox;