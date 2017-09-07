"use strict";
var myObject = {
    myProperty: 'hello',
    sayHello: function () {
        return function () {
            console.log(this.myProperty);
        };
    }
};
myObject.sayHello();
//# sourceMappingURL=index.js.map