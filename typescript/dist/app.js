"use strict";
var DocStates;
(function (DocStates) {
    DocStates[DocStates["edit"] = 0] = "edit";
    DocStates[DocStates["drafted"] = 1] = "drafted";
    DocStates[DocStates["approved"] = 2] = "approved";
    DocStates[DocStates["signed"] = 3] = "signed";
})(DocStates || (DocStates = {}));
;
var docCurrentState = DocStates[0];
console.log(docCurrentState); // edit
var docCurrentState1 = DocStates.edit;
console.log(docCurrentState1); // edit
