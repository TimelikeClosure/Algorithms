
/*
  The traditional Stack data structure allows you to push and pop items from only one
   end of the storage -- the back.  This is sufficient for many problems that the stack
   can solve.  Sometimes we might need two stacks.  To avoid wasting space we can share
   two stacks with a single storage on the same data structure instance.  This data
   structure is called a double stack.  It is a rarer data structure and one that has
   relatively little written about it, most people would rather use two stacks.  But
   we're not most people.

  The values on each side of the storage grow towards the center and shrink away from it.

  Your objective is to implement a double stack without using any built-in features.  A
   double stack is a data structure that allows you to push and pop values from both
   the front and the back of the stack.

    [x] Complete the implementation of a DoubleStack class
    [x] .storage property to hold the items on the stack using a standard array
    [x] .push() function to push a value from the back
    [x] .pop() function to push a value from the back
    [x] .pushFront() function to push a value from the front
    [x] .popFront() function to push a value from the front
    [x] .length property to return the total size used

  NOTE: Do not use any built-in features
  NOTE: Do not focus on edge cases or error conditions

  BONUS:

    [x] Without changing any code for this, observe what happens when either of the front
          or the back meets in the middle, and continues to grow.  You'll need to write
          some code to trigger the conditions

*/

var DoubleStack = function(initialCapacity) {
  this.storage = new Array(initialCapacity || 16);
  this.length = 0;
  this.lengthFront = 0;
};

DoubleStack.prototype.push = function(value) {
  this.storage[this.storage.length - ++this.length + this.lengthFront] = value;
};

DoubleStack.prototype.pop = function() {
  return this.storage[this.storage.length - (this.length--) + this.lengthFront];
};

DoubleStack.prototype.pushFront = function (value) {
  this.length++;
  this.storage[this.lengthFront++] = value;
};

DoubleStack.prototype.popFront = function () {
  this.length--;
  return this.storage[--this.lengthFront];
};

//  TESTS

var ds = new DoubleStack(8);
function dsTest(array, length, lengthFront) {
  return array.reduce(function (last, value, index) {
    return (value === undefined)
      ? (last)
      : (last && value === ds.storage[index]);
  }, true)
    && length === ds.length
    && lengthFront === ds.lengthFront;
}

// .push() should grow the back stack toward the center

ds.push(1);
ds.push(2);
ds.push(3);

console.log('.push() test passed: ' + dsTest([, , , , , 3, 2, 1], 3, 0));

// .pop() should shrink the back stack front the center

console.log('.pop() test passed: ' + ((ds.pop() === 3) && dsTest([, , , , , , 2, 1], 2, 0)));

// .pushFront() should grow the front stack toward the center

ds.pushFront(4);
ds.pushFront(5);
ds.pushFront(6);

console.log('.pushFront() test passed: ' + dsTest([4, 5, 6, , , , 2, 1], 5, 3));

// .popFront() should shrink the front stack from the center

console.log('.popFront() test passed: ' + ((ds.popFront() === 6) && dsTest([4, 5, , , , , 2, 1], 4, 2)));

// test collision

ds.push(7);
ds.pushFront(8);
ds.push(9);
ds.pushFront(10);
ds.push(11);
ds.pushFront(12);
ds.push(13);
ds.pushFront(14);

console.log('push collision test passed: ' + dsTest([4, 5, 13, 11, 12, 14, 2, 1], 12, 6));
