
/*

  Your objective is to implement a stack without using any built-in features.

    [x] Complete the implementation of a Stack class
    [x] .storage property to hold the items on the stack
    [x] .push() function to push a value onto the stack
    [x] .pop() function to pop a value off the stack
    [x] .length property to return the current length

  NOTE: Do not use any built-in features
  NOTE: Do not focus on edge cases or error conditions

*/

var Stack = function() {
  this.storage = [];
  this.length = 0;
};

Stack.prototype.push = function(value) {
  this.storage[this.length++] = value;
  return this.length;
};

Stack.prototype.pop = function() {
  return this.storage[--this.length];
};

//  Tests

var stack = new Stack();

for (let i = 0; i < 10; i++){
  stack.push(i);
}

for (let i = 9; i > 4; i--){
  console.log('stack.pop() Expected: ' + i + ' Actual: ' + stack.pop());
}

for (let i = 10; i < 20; i++){
  stack.push(i);
}

for (let i = 19; i > 9; i--){
  console.log('stack.pop() Expected: ' + i + ' Actual: ' + stack.pop());
}

for (let i = 4; i >= 0; i--){
  console.log('stack.pop() Expected: ' + i + ' Actual: ' + stack.pop());
}
