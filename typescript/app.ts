enum DocStates { edit, drafted, approved, signed };

var docCurrentState: string = DocStates[0];
console.log(docCurrentState);  // edit

var docCurrentState1: number = DocStates.edit;
console.log(docCurrentState1);  // edit